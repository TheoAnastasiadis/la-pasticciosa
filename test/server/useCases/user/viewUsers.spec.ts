import { AppDataSource } from "../../../../src/server/database/dataSource";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { requestUser } from "../../../../src/server/useCases/users/requestUser";
import { viewUsers } from "../../../../src/server/useCases/users/viewUsers";

describe("View Users", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
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
  });
  test("fetches all users", async () => {
    const users = await viewUsers();
    expect(users).toHaveLength(1);
  });
  afterAll(async () => {
    await userRepo.delete({ userName: "John_Doe" });
  });
});
