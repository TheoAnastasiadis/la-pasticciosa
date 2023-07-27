import { AppDataSource } from "../../../../src/server/database/dataSource";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { requestUser } from "../../../../src/server/useCases/users/requestUser";

describe("Request User", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("requests the creation of a new user", async () => {
    const user = userRepo.create({
      userName: "New User",
      email: "john@doe.com",
      password: "**********",
      companyName: "Doe Ltd.",
      companyAddress: "69 Rndm Dr., Athens, Greece",
      vat: "999999999",
      catalogue: [],
    });
    await requestUser(user);
    const users = await userRepo.findBy({ userName: "New User" });
    expect(users).toHaveLength(1);
  });
});
