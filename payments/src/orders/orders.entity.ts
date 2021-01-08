import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  customerId: number;

  @Column()
  @Index()
  item: number;

  @Column()
  qty: number;

  @Column()
  @Index()
  state: string;

  @Column()
  created: Date;

  @Column({ nullable: true })
  updated: Date;

  @BeforeUpdate()
  setUpdated() {
    this.updated = new Date();
  }

  @BeforeInsert()
  setCreated() {
    this.created = new Date();
  }
}
