import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { item } from "./decoders/item.decoder";
import type { z } from "zod";

const itemProps = item.omit({ id: true });

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: string;

  @Column({ default: "Kg" })
  unit!: string;

  @Column()
  image!: string;

  @Column()
  thumbnail!: string;

  @DeleteDateColumn()
  deletedAt!: string;

  static findById: (id: string) => Promise<Item> = async (id) => {
    return await Item.findOneByOrFail({ id });
  };

  static createAndSave: (props: z.infer<typeof itemProps>) => Promise<Item> =
    async (props) => {
      return await Item.create(props as Item).save();
    };

  toSafeOutput: () => z.infer<typeof item> = () => {
    return this;
  };
}
