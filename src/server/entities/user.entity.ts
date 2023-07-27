import {
  AfterInsert,
  AfterLoad,
  AfterRecover,
  AfterUpdate,
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
    cascade: true,
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
    return bcrypt.compareSync(input, this.password);
  };

  @AfterLoad()
  @AfterRecover()
  @AfterInsert()
  @AfterUpdate()
  preventUndefined: () => void = () => {
    if (typeof this.catalogue === "undefined" || this.catalogue.length === 0)
      this.catalogue = [];
  };

  @AfterLoad()
  @AfterRecover()
  @AfterInsert()
  @AfterUpdate()
  passwordRedaction: () => void = () => {
    this.password = "********";
  };

  @BeforeUpdate()
  prevertPasswordOverwriting: () => void = () => {
    if (this.password === "********")
      throw new TypeORMError(
        "You attempted to save a user with an obfuscated password",
      );
  };
}
