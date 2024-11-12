import {Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ComponentSpecification} from "~~/server/entities/component_specification.entity";

@Entity('component')
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: "enum", enum: ['processor', 'ram', 'gpu', 'hdd', 'ssd'] })
  category: 'processor' | 'gpu' | 'ram' | 'hdd' | 'ssd';

  @Column({type: 'varchar', default: null, nullable: true})
  brand: string;

  @Column({type: 'varchar', default: null, nullable: true})
  model: string;

  @OneToMany(() => ComponentSpecification, (spec) => spec.component, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  specifications: ComponentSpecification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
