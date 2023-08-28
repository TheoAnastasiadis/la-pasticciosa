import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

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

  @Column()
  zip!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  details?: string;

  @ManyToOne(() => User, (user) => user.uuid, { onDelete: "SET NULL" })
  @JoinColumn()
  user!: User | undefined;

  @Column({
    type: "enum",
    enum: DeliveryStatus,
    default: DeliveryStatus.REQUESTED,
  })
  state!: DeliveryStatus;
}
