import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Delivery } from "./delivery.entity";
import { order } from "./decoders/order.decoder";
import type { z } from "zod";
import assert from "assert";
import { Quantity } from "./quantity.entity";
import type { Item } from "./item.entity";

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
  quantities: true,
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

  @OneToMany(() => Quantity, (quantity) => quantity.order, {
    eager: true,
    nullable: true,
  })
  quantities!: Quantity[];

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
    quantities: Array<{ item: Item; value: number }>,
  ) => Promise<Order> = async (props, user, delivery, quantities) => {
    const order = Order.create(props as unknown as Order);
    order.user = user;
    order.delivery = delivery;
    await order.save();
    order.quantities = await Promise.all(
      quantities.map(
        async ({ item, value }) =>
          await Quantity.createAndSave(item, value, order),
      ),
    );
    return await order.save();
  };

  static findById: (id: string) => Promise<Order> = async (id) => {
    const orders = await Order.find({
      where: { id },
      relations: { user: true, quantities: true, delivery: true },
    });
    assert(orders.length > 0);
    return orders[0];
  };

  toSafeOutput: () => z.infer<typeof order> = () => {
    const safe: z.infer<typeof order> = this as any;
    safe.user = this.user.uuid;
    safe.delivery = this.delivery.id;
    safe.quantities = this.quantities.map((quantity) => ({
      item: quantity.item.id,
      value: quantity.value,
    }));
    return safe;
  };
}
