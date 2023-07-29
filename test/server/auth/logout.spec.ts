import { appRouter } from "../../../src/server/router";
import { AppDataSource } from "../../../src/server/database/dataSource";
import { User, UserType } from "../../../src/server/entities/user.entity";
import { Session } from "../../../src/server/entities/session.entity";

const setCookie: (name: any, val: any, options?: any) => any = (
  name,
  val,
  options,
) => {
  expect(name).toBe("sessionId");
  expect(val).toBe(null);
};

let sessionId: string;

describe("Login", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const user = User.create({
      email: "existing@user.com",
      password: "1234abcd",
      companyName: "company",
      companyAddress: "address",
      type: UserType.USER,
      userName: "username",
      vat: "123456789",
    });
    await user.save();
    const session = Session.create({ user });
    await session.save();
    sessionId = session.id;
  });
  test("logs an existing user out", async () => {
    await appRouter
      .createCaller({
        sessionId,
        setCookie, // expect happens inside setCookie
      })
      .logOut();
  });
});
