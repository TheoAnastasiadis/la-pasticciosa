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
import { User } from "./user";
import { Delivery } from "./delivery";
import { Quantity } from "./quantity";

export enum OrderStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  PREPARATION = "in_preparation",
  COMPLETE = "complete",
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Delivery, { onDelete: "SET NULL" })
  @JoinColumn()
  delivery!: Delivery | undefined;

  @OneToMany(() => Quantity, (quantity) => quantity.order, {
    eager: true,
    nullable: true,
    onDelete: "CASCADE",
  })
  quantities!: Quantity[] | undefined;

  @Column()
  total!: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ nullable: true, type: "date" })
  estimatedDelivery: Date | undefined;

  @CreateDateColumn()
  createdAt!: Date;
}
