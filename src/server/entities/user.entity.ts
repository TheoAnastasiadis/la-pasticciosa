import {
  AfterInsert,
  AfterLoad,
  AfterRecover,
  AfterUpdate,
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Item } from "./item.entity";

export enum userType {
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

  @Column({ type: "enum", enum: userType, default: userType.USER })
  type!: userType;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.REQUESTED })
  status!: UserStatus;

  @Column()
  companyName!: string;

  @Column()
  companyAddress!: string;

  @Column({ length: 9 })
  vat!: string;

  @ManyToMany(() => Item, { cascade: true })
  @JoinTable()
  catalogue!: Item[];

  @AfterLoad()
  @AfterRecover()
  @AfterInsert()
  @AfterUpdate()
  preventUndefined() {
    if (!this.catalogue) this.catalogue = [];
  }
}
