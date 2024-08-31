import { Injectable, Inject, StreamableFile } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { RepStat } from './repstat.entity';
import { utils, write } from 'xlsx';

@Injectable()
export class AppService {
  constructor(
    @Inject('REPORT_REPOSITORY')
    private reportRepository: Repository<Report>,
    @Inject('REPSTAT_REPOSITORY')
    private repstatRepository: Repository<RepStat>,
  ) {}

  findId(docId: number): JSON {
    //check document status
    let status = 'active';
    let report = {
      id: docId,
      name: 'NAME' + docId,
      status: status,
    };
    return JSON.parse(JSON.stringify(report));
  }

  async createRep(data: string) {
    let jdata = JSON.parse(JSON.stringify(data));
    let tnar = new Array<string>();
    jdata.tableheads.forEach((element) => {
      tnar.push(`${jdata.tablename}.` + element);
    });

    const rr = await this.reportRepository
      .createQueryBuilder(jdata.tablename)
      .select(tnar)
      .getMany();


    const rsrep = await this.repstatRepository
      .createQueryBuilder()
      .insert()
      .into(RepStat)
      .values({ status: 2 })
      .returning('rep_stat.id')
      .execute();
    let newid = JSON.parse(JSON.stringify(rsrep)).raw[0].id;
    console.log(newid);
    this.genRep(JSON.parse(JSON.stringify(rr)), newid);
    return newid;
    /*return new StreamableFile(
      await this.genRep(JSON.parse(JSON.stringify(rr))),
    );*/
  }

  async genRep(data, newid) {
    var worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Report');
    var buf = write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const rsr = this.repstatRepository
      .createQueryBuilder()
      .update(RepStat)
      .set({ status: 1, data: buf })
      .where('id = :id', { id: newid })
      .execute();
    //status '1' = done; status '2' = wip
    return buf;
  }

  async getRep(id: number) {
    const rr = await this.repstatRepository
      .createQueryBuilder('rep_stat')
      .select(['data', 'status'])
      .where('rep_stat.id = :id', { id: id })
      .getRawOne();
    if (JSON.parse(JSON.stringify(rr)).status == 1) {
      let ret = {
        status: JSON.parse(JSON.stringify(rr)).status,
        data: new StreamableFile(Uint8Array.from(JSON.parse(JSON.stringify(rr)).data.data))
      }
      return JSON.parse(JSON.stringify(ret));
    } else {
      let ret = {
        status: JSON.parse(JSON.stringify(rr)).status,
        data: null,
      }
      return JSON.parse(JSON.stringify(ret));
    }
  }
}
