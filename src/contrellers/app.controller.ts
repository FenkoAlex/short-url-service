import { Controller, Get, Param, Res } from '@nestjs/common';

import type { Response } from 'express';

@Controller()
export class AppController {
  @Get('/:alias')
  any(@Res() res: Response, @Param('alias') alias: string) {
    return res.redirect(`/api/v1/${alias}`);
  }
}
