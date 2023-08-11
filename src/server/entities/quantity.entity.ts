import {
  BaseEntity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./item.entity";
import { Order } from "./order.entity";
import type { quantity } from "./decoders/quantity.decoder";
import type { z } from "zod";

export class Quantity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToMany(() => Item, { onDelete: "SET NULL", nullable: true })
  @JoinTable()
  item!: Item;

  @Column({ type: "number" })
  value!: number;

  @ManyToOne(() => Order, (order) => order.quantities)
  order!: Order;

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
