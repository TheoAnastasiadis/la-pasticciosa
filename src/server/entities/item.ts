import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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
}
