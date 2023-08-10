import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  TypeORMError,
} from "typeorm";
import { Item } from "./item.entity";
import bcrypt from "bcrypt";
import appConfig from "../config/app.config";
import type { z } from "zod";
import { user } from "./decoders/user.decoder";
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

const userProps = user.omit({ uuid: true, catalogue: true });

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
    onDelete: "NO ACTION",
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

  static createAndSave: (props: z.infer<typeof userProps>) => Promise<User> =
    async (props) => {
      const entity = User.create(props as User);
      return await entity.save({ reload: true });
    };

  static findById: (uuid: string) => Promise<User> = async (uuid) => {
    const results = await User.find({
      where: { uuid },
      relations: { catalogue: true },
    });
    assert(results.length > 0);
    return results[0];
  };

  toSafeOutput: () => z.infer<typeof user> = () => {
    const safe: z.infer<typeof user> = this as any;
    safe.catalogue =
      typeof this.catalogue !== "undefined"
        ? this.catalogue.map((item) => item.id)
        : [];
    safe.password = "**********";
    return safe;
  };

  assignItem: (item: Item) => Promise<void> = async (item) => {
    const items = new Set(this.catalogue.map((i) => i.id));
    if (items.has(item.id))
      throw new TypeORMError(`Item '${item.id}' is already assigned`);
    this.catalogue.push(item);
    await this.save();
  };

  unassignItem: (item: Item) => Promise<void> = async (item) => {
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
