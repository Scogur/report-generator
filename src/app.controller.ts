import { Controller, Get, Query, Body, Post, Param, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { read, utils, write } from 'xlsx';

@Controller('rep')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get()
  getHello(): JSON {
    return this.appService.getHello();
  }*/
/*
  @Get(':name, :description')
  getReport(@Query('docId') docId: number): JSON {
    return this.appService.findId(docId);
  }
*/
  /*@Get(':name, :description')
  getRep(@Param() params: any): JSON {
    return this.appService.getReport(params.name, params.description);
  }*/

  @Get()
  findId(@Query('docId') docId: number): JSON {
      return this.appService.findId(docId);
  }

  @Post()
  async createRep(@Body() data: string): Promise<number> {
    console.log(data);
    return await this.appService.createRep(data);
  }

  @Get(':id')
  async repById(@Param('id') id: number): Promise<string | StreamableFile> {
    console.log('requested id: ' + id);
    return await this.appService.getRep(id);
  }

}
