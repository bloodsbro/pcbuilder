import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('unit')
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '16', nullable: false})
  unit: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
