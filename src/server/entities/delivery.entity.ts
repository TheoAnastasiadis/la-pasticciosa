import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { delivery } from "./decoders/delivery.decoder";
import type { z } from "zod";
import assert from "assert";

export enum DeliveryStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
}

const deliveryProps = delivery.omit({ id: true, user: true });

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
  user!: User;

  @Column({
    type: "enum",
    enum: DeliveryStatus,
    default: DeliveryStatus.REQUESTED,
  })
  state!: DeliveryStatus;

  static createAndSave: (
    props: z.infer<typeof deliveryProps>,
    user: User,
  ) => Promise<Delivery> = async (props, user) => {
    const delivery = Delivery.create(props as Delivery);
    await delivery.save();
    delivery.user = user;
    return await delivery.save();
  };

  static findById: (id: string) => Promise<Delivery> = async (id) => {
    const deliveries = await Delivery.find({
      where: { id },
      relations: { user: true },
    });
    assert(deliveries.length > 0);
    return deliveries[0];
  };

  toSafeOutput: () => z.infer<typeof delivery> = () => {
    const safe: z.infer<typeof delivery> = this as any;
    safe.user = this.user.uuid;
    return safe;
  };
}
