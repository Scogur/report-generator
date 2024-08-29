import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RepStat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: number;

}