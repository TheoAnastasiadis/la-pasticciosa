import { appRouter } from "../../../src/server/router";
import { AppDataSource } from "../../../src/server/database/dataSource";
import { userRepo } from "../../../src/server/database/repos/user.repo";
import { User, UserType } from "../../../src/server/entities/user.entity";

const setCookie: (name: any, val: any, options?: any) => any = (
  name,
  val,
  options,
) => {
  expect(name).toBe("sessionId");
  expect(typeof val === "string").toBeTruthy();
};

describe("Login", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    await userRepo.insert(
      User.create({
        email: "existing@user.com",
        password: "1234abcd",
        companyName: "company",
        companyAddress: "address",
        type: UserType.USER,
        userName: "username",
        vat: "123456789",
      }),
    );
  });
  test("logs an existing user in", async () => {
    await appRouter
      .createCaller({
        sessionId: null,
        setCookie, // expect happens inside setCookie
      })
      .logIn({ email: "existing@user.com", password: "1234abcd" });
  });
  test("does not allow non existing users", async () => {
    await appRouter
      .createCaller({
        sessionId: null,
        setCookie,
      })
      .logIn({ email: "nonexistent@user.com", password: "5678efgh" })
      .catch((error) => {
        expect(error).toHaveProperty("code", "UNAUTHORIZED");
      });
  });
});
