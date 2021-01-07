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
  created: number;

  @Column({ nullable: true })
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
