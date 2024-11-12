import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ComponentSpecification } from "./component_specification.entity";

@Entity('specification')
export class Specification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string; // Название характеристики, например, "Частота", "Объем памяти", "Тип памяти"

  @Column('simple-array') // Хранит массив типов, например, "Processor,Graphics Card"
  applicableTypes: (typeof Component.category)[];

  @Column({type: 'varchar'})
  unit: string;

  @OneToMany(() => ComponentSpecification, (spec) => spec.specification, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  componentSpecifications: ComponentSpecification[];
}
