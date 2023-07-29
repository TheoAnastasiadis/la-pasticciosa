import { AppDataSource } from "../../../../src/server/database/dataSource";
import { User } from "../../../../src/server/entities/user.entity";
import { requestUser } from "../../../../src/server/useCases/users/requestUser";

describe("Request User", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("requests the creation of a new user", async () => {
    await requestUser({
      userName: "New User",
      email: "john@doe.com",
      password: "**********",
      companyName: "Doe Ltd.",
      companyAddress: "69 Rndm Dr., Athens, Greece",
      vat: "999999999",
    });
    const users = await User.findBy({ userName: "New User" });
    expect(users).toHaveLength(1);
  });
});
