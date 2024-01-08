import { In } from "typeorm";
import { AppDataSource } from "../../../src/server/database";
import { Session } from "../../../src/server/entities/session";
import { User, UserStatus, UserType } from "../../../src/server/entities/user";
import { appRouter } from "../../../src/server/data/router";
import { Quantity } from "../../../src/server/entities/quantity";
import { Order } from "../../../src/server/entities/order";
import { Item } from "../../../src/server/entities/item";
import { Delivery } from "../../../src/server/entities/delivery";

describe("User Entity Use Cases", () => {
  let adminSessionId: string;
  let admin: User;
  let userSessionId: string;
  let user: User;
  beforeAll(async () => {
    await AppDataSource.initialize();

    //empty db
    await Quantity.delete({});
    await Delivery.delete({});
    await Order.delete({});
    await Item.delete({});
    await User.delete({});

    // create two example users, one of each kind.
    admin = await User.create({
      email: "admin@email.com",
      type: UserType.ADMIN,
      password: "veryStrongPassword",
      userName: "admin" + Math.random(),
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
      mobileNumber: "6955555555",
    }).save();

    user = await User.create({
      email: "user@email.com",
      type: UserType.USER,
      password: "veryStrongPassword",
      userName: "user" + Math.random(),
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
      mobileNumber: "6977777777",
    }).save();

    // create sessionIds for each
    adminSessionId = (await Session.create({ user: admin }).save()).id;
    userSessionId = (await Session.create({ user: user }).save()).id;
  }, 20000);

  test("sign up -> accept -> reject", async () => {
    // 1. Sign Up
    const user = await appRouter
      .createCaller({
        sessionId: null,
        setCookie: {} as any,
      })
      .signUp({
        userName: "Example User 1",
        email: "example@example.com",
        password: "verySrongPassword",
        companyName: "Company",
        companyAddress: "Address",
        vat: "123456789",
        mobileNumber: "6911111111",
      });

    expect(user).toHaveProperty("status", UserStatus.REQUESTED);
    expect(user).toHaveProperty("type", UserType.USER);

    // 2. Accept
    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .updateUserStatus({ status: "accepted", userId: user.uuid });

    const userEntry = await User.findOneByOrFail({ uuid: user.uuid });
    expect(userEntry).toHaveProperty("status", UserStatus.ACCEPTED);

    // 3. Reject
    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .updateUserStatus({ status: "rejected", userId: user.uuid });
    await userEntry.reload();
    expect(userEntry).toHaveProperty("status", UserStatus.REJECTED);
  }, 50000);

  test("login -> change password -> logout", async () => {
    await appRouter
      .createCaller({
        sessionId: userSessionId,
        setCookie: {} as any,
      })
      .changePassword({
        oldPassword: "veryStrongPassword",
        newPassword: "evenStrongerPassword",
      });

    const userEntry = await User.findOneByOrFail({ uuid: user.uuid });
    expect(userEntry.validatePassword("evenStrongerPassword")).toBeTruthy();
  }, 20000);

  test("View users (as admin)", async () => {
    const users = await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .viewUsers({ page: 0 });

    expect(users.length).toBeGreaterThanOrEqual(2);
  });

  test("View users (as user)", async () => {
    const users = await appRouter
      .createCaller({
        sessionId: userSessionId,
        setCookie: {} as any,
      })
      .viewUsers({ page: 0 });

    expect(users).toHaveLength(1); // simple users can only access their personal data
  });

  afterAll(async () => {
    await Session.delete({ id: In([userSessionId, adminSessionId]) });
    //empty db
    await Quantity.delete({});
    await Delivery.delete({});
    await Order.delete({});
    await Item.delete({});
    await User.delete({});

    await AppDataSource.destroy();
  });
});
