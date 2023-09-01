import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  TypeORMError,
} from "typeorm";
import { Item } from "./item";
import bcrypt from "bcrypt";
import appConfig from "../config/app.config";
import assert from "assert";

export enum UserType {
  USER = "user",
  ADMIN = "admin",
}

export enum UserStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid!: string;

  @Column()
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, default: "699999999" })
  mobileNumber!: string;

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
    onDelete: "NO ACTION",
  })
  @JoinTable()
  catalogue!: Item[] | undefined;

  isAdmin(): boolean {
    return this.type === UserType.ADMIN;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword: () => void = () => {
    if (!this.password.startsWith(`$2b$${appConfig.getSaltRounds()}`))
      // hashed passwords follow this format
      this.password = bcrypt.hashSync(this.password, appConfig.getSaltRounds());
  };

  validatePassword: (input: string) => boolean = (input) =>
    bcrypt.compareSync(input, this.password);

  assignItem: (item: Item) => Promise<void> = async (item) => {
    assert(this.catalogue);
    const items = new Set(this.catalogue.map((i) => i.id));
    if (items.has(item.id))
      throw new TypeORMError(`Item '${item.id}' is already assigned`);
    this.catalogue.push(item);
    await this.save();
  };

  unassignItem: (item: Item) => Promise<void> = async (item) => {
    assert(this.catalogue);
    const items = new Set(this.catalogue.map((i) => i.id));
    if (!items.has(item.id))
      throw new TypeORMError(
        `Cannot remove item before it has been assigned to the user`,
      );
    items.delete(item.id);
    this.catalogue = this.catalogue.filter((i) => items.has(i.id));
    await this.save();
  };
}
