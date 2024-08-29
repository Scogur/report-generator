import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    occupation: string;

    @Column()
    phonenumber: number;

}