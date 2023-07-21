import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Delivery } from "./delivery.entity";
import { Item } from "./item.entity";

enum orderStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  PREPARATION = "in_preparation",
  COMPLETE = "complete",
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @OneToOne(() => Delivery)
  @JoinColumn()
  delivery!: Delivery;

  @OneToMany(() => Item, (item) => item.id)
  items!: Item[];

  @Column({ type: "numeric" })
  total!: number;

  @Column({ type: "enum", enum: orderStatus, default: orderStatus.PENDING })
  status!: orderStatus;

  @Column({ nullable: true, type: "timestamp" })
  estimatedDelivery?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
