import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { LinksService } from './links/links.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly linksService: LinksService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('l/:shortUrl')
  async followLink(
    @Param('shortUrl') shortUrl: string,
    @Res() response: Response,
  ): Promise<void> {
    const url = await this.linksService.followLink(shortUrl);
    return response.redirect(url);
  }
}