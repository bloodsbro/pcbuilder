import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import { ComponentSpecification } from "./component_specification.entity";
import {Unit} from "~~/server/entities/unit.entity";
import {ComponentCategories} from "~~/server/dto/component/addComponentDto";

@Entity('specification')
export class Specification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string; // Название характеристики, например, "Частота", "Объем памяти", "Тип памяти"

  @Column('simple-array') // Хранит массив типов, например, "Processor,Graphics Card"
  applicableTypes: ComponentCategories[];

  @ManyToOne(() => Unit, (unit) => unit.unit, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'unitId' })
  unit: string;

  @OneToMany(() => ComponentSpecification, (spec) => spec.specification, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  componentSpecifications: ComponentSpecification[];
}
