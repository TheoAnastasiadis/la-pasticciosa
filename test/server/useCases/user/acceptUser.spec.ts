import { AppDataSource } from "../../../../src/server/database/dataSource";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { UserStatus } from "../../../../src/server/entities/user.entity";
import { acceptUser } from "../../../../src/server/useCases/users/acceptUser";
import { requestUser } from "../../../../src/server/useCases/users/requestUser";

describe("Accept User", () => {
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
  test("sets user status to 'accepted'", async () => {
    const user = await userRepo.findOneBy({ userName: "John_Doe" });
    if (user == null) throw new Error("Test case error");
    await acceptUser(user);
    await user.reload();
    expect(user).toHaveProperty("status", UserStatus.ACCEPTED);
  });
  afterAll(async () => {
    await userRepo.delete({ userName: "John_Doe" });
  });
});
