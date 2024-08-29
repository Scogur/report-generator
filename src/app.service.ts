import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from "./report.entity";
import { RepStat } from './repstat.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('REPORT_REPOSITORY')
    private reportRepository: Repository<Report>,
    @Inject('REPSTAT_REPOSITORY')
    private repstatRepository: Repository<RepStat>
  ) {}

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
    //console.log(this.reportRepository.(tableheads[0]));

    //generate report
    const rr = this.reportRepository
      .createQueryBuilder()
      .select(`${jdata.tablename}.${jdata.tableheads[1]}`)
      .from(Report, jdata.tablename)
      .getMany()
      .then(res => JSON.parse(JSON.stringify(res))).then(data => console.log(data));
      console.log(rr);
    //console.log(jdata.name, jdata.tableheads[1], jdata.tablename);
    
    //set rep status

    //generate book

    //set rep status

    return JSON.parse(JSON.stringify(rr));

    //return JSON.parse(JSON.stringify(report));
  }

  /*genRep(){

    let sb = this.repstatRepository
    .save(
  }*/
}
