import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Delivery } from "./delivery.entity";
import { Item } from "./item.entity";
import { order } from "./decoders/order.decoder";
import type { z } from "zod";
import assert from "assert";

export enum OrderStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  PREPARATION = "in_preparation",
  COMPLETE = "complete",
}

const orderProps = order.omit({
  id: true,
  delivery: true,
  user: true,
  items: true,
  createdAt: true,
});

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Delivery, { onDelete: "SET NULL" })
  @JoinColumn()
  delivery!: Delivery;

  @ManyToMany(() => Item, (item) => item.id, { eager: true })
  @JoinTable()
  items!: Item[];

  @Column()
  total!: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ nullable: true, type: "date" })
  estimatedDelivery?: string;

  @CreateDateColumn()
  createdAt!: Date;

  static createAndSave: (
    props: z.infer<typeof orderProps>,
    user: User,
    delivery: Delivery,
    items: Item[],
  ) => Promise<Order> = async (props, user, delivery, items) => {
    const order = Order.create(props as unknown as Order);
    await delivery.save();
    order.user = user;
    order.delivery = delivery;
    order.items = items;
    return await order.save();
  };

  static findById: (id: string) => Promise<Order> = async (id) => {
    const orders = await Order.find({
      where: { id },
      relations: { user: true, items: true, delivery: true },
    });
    assert(orders.length > 0);
    return orders[0];
  };

  toSafeOutput: () => z.infer<typeof order> = () => {
    const safe: z.infer<typeof order> = this as any;
    safe.user = this.user.uuid;
    safe.delivery = this.delivery.id;
    safe.items = this.items.map((item) => item.id);
    return safe;
  };
}
