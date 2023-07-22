import { AppDataSource } from "../../../../src/server/database/dataSource";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { requestUser } from "../../../../src/server/useCases/users/requestUser";

describe("Request User", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });
  test("requests the creation of a new user", async () => {
    const user = userRepo.create({
      userName: "John_Doe",
      email: "john@doe.com",
      password: "**********",
      companyName: "Doe Ltd.",
      companyAddress: "69 Rndm Dr., Athens, Greece",
      vat: "999999999",
      catalogue: [],
    });
    await requestUser(user);
    const users = await userRepo.find();
    expect(users).toHaveLength(1);
    expect(users.at(0)).toHaveProperty("userName", "John_Doe");
  });
  afterAll(async () => {
    await userRepo.delete({ userName: "John_Doe" });
  });
});
