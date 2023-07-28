import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.uuid, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
