import { BeforeInsert, BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  item: number;

  @Column()
  qty: number;

  @Column()
  @Index()
  state: string;

  @Column()
  created: number;

  @Column()
  updated: number;

  @BeforeUpdate()
  setUpdated() {
    this.updated = Date.now() / 1000;
  }

  @BeforeInsert()
  setCreated() {
    this.created = Date.now() / 1000;
  }
}
