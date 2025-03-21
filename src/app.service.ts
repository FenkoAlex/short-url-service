import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, gt, sql } from 'drizzle-orm';

import { ShortUrlDTO } from './interfaces';
import { urlsSchema, analyticsSchema } from './db/schema';
import { DrizzleAsyncProvider } from './drizzle.provider';

import type { Response } from 'express';

enum ERRORS_CODE {
  ALREADY_EXIST = 'ALREADY_EXIST',
}

enum PG_ERROR_CODE {
  ALREADY_EXIST = '23505',
  TOO_LARGE_DATA = '22001',
}

@Injectable()
export class AppService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase,
  ) {}

  async createShortUrl(params: ShortUrlDTO) {
    try {
      const [result] = await this.db
        .insert(urlsSchema)
        .values(params)
        .returning();

      return `${process.env.SERVICE_URL}/${result.alias}`;
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        const pgError = error as Error & { code?: string };

        switch (pgError.code) {
          case PG_ERROR_CODE.ALREADY_EXIST:
            throw new ConflictException(
              'Alias already exists',
              ERRORS_CODE.ALREADY_EXIST,
            );
          case PG_ERROR_CODE.TOO_LARGE_DATA:
            throw new ConflictException(
              'Alias too long',
              ERRORS_CODE.ALREADY_EXIST,
            );
        }
      }

      throw new InternalServerErrorException('Database error');
    }
  }

  async redirect(res: Response, alias: string, ip: string) {
    let result: {
      id: number;
      originalUrl: string;
    };
    try {
      const query = await this.db
        .select({
          id: urlsSchema.id,
          originalUrl: urlsSchema.originalUrl,
        })
        .from(urlsSchema)
        .where(
          and(
            eq(urlsSchema.alias, alias),
            gt(urlsSchema.expiresAt, new Date()),
          ),
        );
      result = query[0];
    } catch (error) {
      throw new InternalServerErrorException(error, 'Database error');
    }

    if (result) {
      try {
        await this.db.insert(analyticsSchema).values({
          urlId: result.id,
          ipAddress: ip,
        });
      } catch (error) {
        throw new InternalServerErrorException(error, 'Database error');
      }
      res.redirect(result.originalUrl);
    } else {
      throw new NotFoundException();
    }

    return result;
  }

  async getInfo(alias: string) {
    let query: {
      originalUrl: string;
      createdAt: Date | null;
      clickCount: number;
    }[];
    try {
      query = await this.db
        .select({
          originalUrl: urlsSchema.originalUrl,
          createdAt: urlsSchema.createdAt,
          clickCount: sql<number>`coalesce(count(${analyticsSchema}), 0)`,
        })
        .from(urlsSchema)
        .innerJoin(analyticsSchema, eq(analyticsSchema.urlId, urlsSchema.id))
        .groupBy(urlsSchema.originalUrl, urlsSchema.createdAt)
        .where(eq(urlsSchema.alias, alias));
    } catch (error) {
      throw new InternalServerErrorException(error, 'Database error');
    }
    if (!query.length) {
      throw new NotFoundException();
    }

    return query[0];
  }

  async deleteShortUrl(alias: string) {
    try {
      await this.db
        .delete(urlsSchema)
        .where(eq(urlsSchema.alias, alias))
        .returning();
      return 'success';
    } catch (error) {
      throw new InternalServerErrorException(error, 'Database error');
    }
  }

  async getAnalitics(alias: string, limit: number) {
    let query: {
      clickCount: number;
      ips: string[];
    }[];
    try {
      query = await this.db
        .select({
          clickCount: sql<number>`coalesce(count(${analyticsSchema}), 0)`,
          ips: sql<string[]>`ARRAY(
            SELECT ${analyticsSchema.ipAddress}
            FROM ${analyticsSchema}
            WHERE ${analyticsSchema.urlId} = ${urlsSchema.id}
            ORDER BY ${analyticsSchema.createdAt} DESC
            LIMIT ${limit}
          )`,
        })
        .from(urlsSchema)
        .innerJoin(analyticsSchema, eq(analyticsSchema.urlId, urlsSchema.id))
        .groupBy(
          urlsSchema.id,
          urlsSchema.originalUrl,
          urlsSchema.alias,
          urlsSchema.createdAt,
        )
        .where(eq(urlsSchema.alias, alias))
        .limit(limit);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Database error');
    }
  }
}
