import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./item.entity";
import bcrypt from "bcrypt";
import appConfig from "../config/app.config";

export enum UserType {
  USER = "user",
  ADMIN = "admin",
}

export enum UserStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid!: string;

  @Column()
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: UserType, default: UserType.USER })
  type!: UserType;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.REQUESTED })
  status!: UserStatus;

  @Column()
  companyName!: string;

  @Column()
  companyAddress!: string;

  @Column({ length: 9 })
  vat!: string;

  @ManyToMany(() => Item, {
    eager: true,
  })
  @JoinTable()
  catalogue!: Item[];

  isAdmin(): boolean {
    return this.type === UserType.ADMIN;
  }

  @BeforeInsert()
  hashPassword: () => void = () => {
    this.password = bcrypt.hashSync(this.password, appConfig.getSaltRounds());
  };

  validatePassword: (input: string) => boolean = (input) => {
    console.log(`Comparing input: ${input} with password ${this.password}`);
    return bcrypt.compareSync(input, this.password);
  };
}
