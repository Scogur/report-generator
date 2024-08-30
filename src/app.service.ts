import { Injectable, Inject, StreamableFile } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Report } from "./report.entity";
import { RepStat } from './repstat.entity';
import { utils, write } from 'xlsx';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'repdoc',
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

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

  async createRep(data:string) {
    let jdata = JSON.parse(JSON.stringify(data));
    let tnar = new Array<string>();
    jdata.tableheads.forEach(element => {
      tnar.push(`${jdata.tablename}.` + element);
    });

      const rr = await this.reportRepository
      .createQueryBuilder(jdata.tablename)
      .select(tnar)
      .getMany();

      let wb = this.genRep(JSON.parse(JSON.stringify(rr)));

      var buf = write(wb, {type: "buffer", bookType: "xlsx"});
      console.log(new StreamableFile(buf));
      return new StreamableFile(buf);

    //console.log(rr);
    //return JSON.parse(JSON.stringify(rr));

    //return JSON.parse(JSON.stringify({link: 'https://google.com'}));
  }

  genRep(data){

    //let sb = this.repstatRepository;
    var worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Report');
    return workbook;
  }
}
