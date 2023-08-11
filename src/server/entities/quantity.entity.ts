import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Item } from "./item.entity";
import { Order } from "./order.entity";
import type { quantity } from "./decoders/quantity.decoder";
import type { z } from "zod";

@Entity()
export class Quantity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToMany(() => Item, { onDelete: "NO ACTION", nullable: true })
  @JoinTable()
  item!: Item;

  @Column({ type: "int" })
  value!: number;

  @ManyToOne(() => Order, (order) => order.quantities)
  order!: Relation<Order>;

  static createAndSave: (
    item: Item,
    value: number,
    order: Order,
  ) => Promise<Quantity> = async (item, value, order) => {
    const quantity = Quantity.create();
    quantity.item = item;
    quantity.value = value;
    quantity.order = order;
    return await quantity.save();
  };

  toSafeOutput: () => z.infer<typeof quantity> = () => {
    return {
      id: this.id,
      item: this.item.id,
      order: this.order.id,
      value: this.value,
    };
  };
}
