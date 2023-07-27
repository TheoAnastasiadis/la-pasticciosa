import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

export enum DeliveryStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
}

@Entity()
export class Delivery extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  street!: string;

  @Column()
  number!: string;

  @Column({ type: "numeric" })
  zip!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  details?: string;

  @OneToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn()
  user!: User;

  @Column({
    type: "enum",
    enum: DeliveryStatus,
    default: DeliveryStatus.REQUESTED,
  })
  state!: DeliveryStatus;
}
