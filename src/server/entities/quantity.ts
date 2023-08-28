import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Item } from "./item";
import { Order } from "./order";

@Entity()
export class Quantity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Item, { onDelete: "NO ACTION", nullable: true })
  item!: Item | undefined;

  @Column({ type: "int" })
  value!: number;

  @ManyToOne(() => Order, (order) => order.quantities)
  order!: Relation<Order>;
}
