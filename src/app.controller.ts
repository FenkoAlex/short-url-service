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

import { AppService } from './app.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { ShortUrlDTO } from './interfaces';

import type { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    const result = await this.appService.createShortUrl(tmpParams);

    return result;
  }

  @Get('info/:alias')
  async getInfo(@Param('alias') alias: string) {
    return await this.appService.getInfo(alias);
  }

  @Delete('delete/:alias')
  async deleteUrl(@Param('alias') alias: string) {
    return await this.appService.deleteShortUrl(alias);
  }

  @Get('analytics/:alias')
  async getAnalytics(@Param('alias') alias: string) {
    return await this.appService.getAnalitics(alias, 5);
  }

  @Get('/:alias')
  async redirect(
    @Req() req: Request,
    @Res() res: Response,
    @Param('alias') alias: string,
  ) {
    await this.appService.redirect(res, encodeURI(alias), req.ip || '');
  }
}
