import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): JSON {
    let report = {
      name: "NAME1"
    };
    return JSON.parse(JSON.stringify(report));
  }

  getReport(docId: number, endpoint: number): JSON {
    let report = {
      id: docId,
      name: "NAME1"
    };
    return JSON.parse(JSON.stringify(report));
  }

  findId(docId:number): JSON {
    
    //check document status
    let status = "active";
    let report = {
      id: docId,
      name: "NAME"+docId,
      status: status,
    };
    return JSON.parse(JSON.stringify(report));
  }

  createRep(data:string): JSON {
    let jdata = JSON.parse(JSON.stringify(data));
    let tablename = jdata.tablename;
    let tableheads = jdata.tableheads;

    

    //generate report
    let report = {
      name: jdata.name,
      ep: jdata.ep
    };
    console.log(jdata.name, jdata.tableheads[1], jdata.tablename);

    //set rep status

    //generate book

    //set rep status

    return JSON.parse(JSON.stringify(report));
  }
}
