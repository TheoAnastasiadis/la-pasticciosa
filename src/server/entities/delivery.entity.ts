import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

enum deliveryStatus {
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

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column({
    type: "enum",
    enum: deliveryStatus,
    default: deliveryStatus.REQUESTED,
  })
  sate!: deliveryStatus;
}
