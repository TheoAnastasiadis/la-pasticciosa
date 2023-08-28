import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.uuid, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user!: User | undefined;

  @CreateDateColumn()
  createAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
