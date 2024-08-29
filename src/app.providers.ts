import { DataSource } from "typeorm";
import { Report } from "./report.entity";
import { RepStat } from "./repstat.entity";

export const reportProviders = [
    {
        provide: 'REPORT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Report),
        inject: ['DATA_SOURCE'],
    },
    ];

export const repStatProviders = [
    {
        provide: 'REPSTAT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RepStat),
        inject: ['DATA_SOURCE'],
    }
];