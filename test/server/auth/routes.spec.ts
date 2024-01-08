import { AppDataSource } from "../../../src/server/database";
import { Delivery } from "../../../src/server/entities/delivery";
import { Item } from "../../../src/server/entities/item";
import { Order } from "../../../src/server/entities/order";
import { Quantity } from "../../../src/server/entities/quantity";
import { User, UserType } from "../../../src/server/entities/user";
import login from "../../../src/server/auth/router/routes/login";
import logout from "../../../src/server/auth/router/routes/logout";
import type e from "express";

describe("routes", () => {
  let user: User | undefined;
  beforeAll(async () => {
    await AppDataSource.initialize();

    //empty db
    await Quantity.delete({});
    await Delivery.delete({});
    await Order.delete({});
    await Item.delete({});
    await User.delete({});

    user = await User.create({
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

  test("/login (if user is found)", () => {
    const req = { user } as e.Request;
    const res = {
      cookie: (cookie: string, value: string, params: any) => {
        expect(cookie).toEqual("__session");
        expect(params).toHaveProperty("httpOnly", true);
        expect(params.expires instanceof Date).toBeTruthy();
      },
    } as e.Response;
    const next = () => {};
    login(req, res, next);
  });

  test("/logout", () => {
    const res = {
      clearCookie(name: string) {
        expect(name).toEqual("__session");
      },
      redirect(url: string) {
        expect(url).toEqual("/");
      },
    } as e.Response;
    logout({} as e.Request, res);
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
