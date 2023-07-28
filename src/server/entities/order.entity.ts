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
  delivery!: Delivery;

  @ManyToMany(() => Item, (item) => item.id, { eager: true })
  @JoinTable()
  items!: Item[];

  @Column()
  total!: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ nullable: true, type: "timestamp" })
  estimatedDelivery?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
