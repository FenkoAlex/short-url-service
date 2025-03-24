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
    return this.apiService.createShortUrl(tmpParams);
  }

  @Get('info/:alias')
  getInfo(@Param('alias') alias: string) {
    return this.apiService.getInfo(alias);
  }

  @Delete('delete/:alias')
  deleteUrl(@Param('alias') alias: string) {
    return this.apiService.deleteShortUrl(alias);
  }

  @Get('analytics/:alias')
  getAnalytics(@Param('alias') alias: string) {
    return this.apiService.getAnalitics(alias, 5);
  }

  @Get('/:alias')
  redirect(
    @Req() req: Request,
    @Res() res: Response,
    @Param('alias') alias: string,
  ) {
    this.apiService.redirect(res, encodeURI(alias), req.ip || '');
  }
}
