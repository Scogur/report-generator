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

  @Get('download')
  async download(@Param('docId') docId: number): Promise<StreamableFile> {
    let fileName = JSON.parse(JSON.stringify(this.appService.findId(docId))).name;
    var ws = utils.json_to_sheet(fileName);
    var wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Report');

    var buf = write(wb, {type: "buffer", bookType: "xlsx"});

    return new StreamableFile(buf);
  }

  @Post()
  async createRep(@Body() data: string): Promise<JSON> {
    console.log(data);
    return this.appService.createRep(data);
  }

}
