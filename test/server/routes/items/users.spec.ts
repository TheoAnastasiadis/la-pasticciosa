import { instance } from "ts-mockito";
import { appRouter } from "../../../../src/server/router";
import { createCaller, setCookie } from "../testObjects";
import {
  type User,
  UserType,
  UserStatus,
} from "../../../../src/server/entities/user.entity";
import { AppDataSource } from "../../../../src/server/database/dataSource";

let callAsAcceptedUser: Awaited<
  ReturnType<typeof createCaller>
>["callAsAcceptedUser"];
let callAsAdmin: Awaited<ReturnType<typeof createCaller>>["callAsAdmin"];
let user: User;
let requested: User;

describe("User Routes", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const callers = await createCaller();
    callAsAcceptedUser = callers.callAsAcceptedUser;
    callAsAdmin = callers.callAsAdmin;
    user = callers.user;
    requested = callers.requested;
  });
  test("request user [unauthenticated]", async () => {
    const user = await appRouter
      .createCaller({ sessionId: null, setCookie: instance(setCookie) })
      .requestUser({
        userName: "User Candidate",
        password: "43m8udm98z2u3",
        email: "user@wellknown.com",
        companyName: "Well Know Co.",
        companyAddress: "13 Random Dr. Athens, Greece",
        vat: "019283746",
      });
    expect(user).toHaveProperty("type", UserType.USER);
  });
  test("accept user [as admin]", async () => {
    const result = await callAsAdmin.acceptUser(requested.uuid);
    expect(result).toHaveProperty("status", UserStatus.ACCEPTED);
  });
  test("view user profile [as user]", async () => {
    const result = await callAsAcceptedUser.viewUserProfile();
    expect(result).toHaveProperty("user.uuid", user.uuid);
    expect(result).toHaveProperty("deliveries", []);
  });
  test("view user profile [as admin]", async () => {
    const result = await callAsAdmin.viewUserProfile(user.uuid);
    expect(result).toHaveProperty("user.uuid", user.uuid);
    expect(result).toHaveProperty("deliveries", []);
  });
  test("view users [as admin]", async () => {
    const users = await callAsAdmin.viewUsers();
    expect(users.length).toBeGreaterThanOrEqual(4);
  });
});
