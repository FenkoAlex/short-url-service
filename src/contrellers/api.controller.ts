import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { ApiService } from '../services/api.service';
import { CreateUrlDto } from '../dto/create-url.dto';
import { ShortUrlDTO } from '../interfaces';

import type { Request, Response } from 'express';

@Controller('/v1')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('shorten')
  async shorten(@Body() createUrlDto: CreateUrlDto) {
    const tmpParams: ShortUrlDTO = {
      ...createUrlDto,
      alias: createUrlDto.alias
        ? encodeURI(createUrlDto.alias)
        : uuid().slice(0, 8),
      expiresAt: undefined,
    };
    if (createUrlDto.expiresAt) {
      tmpParams.expiresAt = new Date(createUrlDto.expiresAt || '');
    }
    const result = await this.apiService.createShortUrl(tmpParams);

    return result;
  }

  @Get('info/:alias')
  async getInfo(@Param('alias') alias: string) {
    return await this.apiService.getInfo(alias);
  }

  @Delete('delete/:alias')
  async deleteUrl(@Param('alias') alias: string) {
    return await this.apiService.deleteShortUrl(alias);
  }

  @Get('analytics/:alias')
  async getAnalytics(@Param('alias') alias: string) {
    return await this.apiService.getAnalitics(alias, 5);
  }

  @Get('/:alias')
  async redirect(
    @Req() req: Request,
    @Res() res: Response,
    @Param('alias') alias: string,
  ) {
    await this.apiService.redirect(res, encodeURI(alias), req.ip || '');
  }
}
