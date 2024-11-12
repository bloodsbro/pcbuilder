import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Component } from "./component.entity";
import { Specification } from "./specification.entity";

@Entity('component_specification')
export class ComponentSpecification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Component, (component) => component.specifications, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  component: Component;

  @ManyToOne(() => Specification, (specification) => specification.componentSpecifications, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  specification: Specification;

  @Column({ type: 'varchar' })
  value: string; // Значение характеристики, например, "3200 MHz", "8 GB", "GDDR6"
}
