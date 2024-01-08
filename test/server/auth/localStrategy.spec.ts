import { AppDataSource } from "../../../src/server/database";
import { Delivery } from "../../../src/server/entities/delivery";
import { Item } from "../../../src/server/entities/item";
import { Order } from "../../../src/server/entities/order";
import { Quantity } from "../../../src/server/entities/quantity";
import { User, UserType } from "../../../src/server/entities/user";
import { verify } from "../../../src/server/auth/middleware/auth/strategies/local";
import type e from "express";

describe("local strategy", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    //empty db
    await Quantity.delete({});
    await Delivery.delete({});
    await Order.delete({});
    await Item.delete({});
    await User.delete({});

    await User.create({
      email: "user@email.com",
      type: UserType.USER,
      password: "veryStrongPassword",
      userName: "user_del",
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
      mobileNumber: "6977777777",
    }).save();
  });

  test("logs in with valid credentials", (done) => {
    const doneVerifying = (error: any, user: any) => {
      expect(error).toBeNull();
      expect(user).toHaveProperty("userName", "user_del");
      done();
    };
    verify("user@email.com", "veryStrongPassword", doneVerifying);
  });

  test("does not log in with invalid credentials", (done) => {
    const doneVerifying = (error: any, user: any) => {
      expect(error).not.toBeNull();
      expect(user).toBeFalsy();
      done();
    };
    verify("user@email.com", "incorectPassword", doneVerifying);
  });

  afterAll(async () => {
    //empty db
    await Quantity.delete({});
    await Delivery.delete({});
    await Order.delete({});
    await Item.delete({});
    await User.delete({});

    await AppDataSource.destroy();
  });
});
