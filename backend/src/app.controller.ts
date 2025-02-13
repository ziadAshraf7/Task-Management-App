import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as puppeteer from 'puppeteer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello()  {
    return "hello world"
  }
}
