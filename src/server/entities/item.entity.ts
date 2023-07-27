import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: "numeric" })
  price!: number;

  @Column()
  image!: string;

  @Column()
  thumbnail!: string;
}
