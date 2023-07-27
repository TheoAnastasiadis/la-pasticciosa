import { AppDataSource } from "../../../../src/server/database/dataSource";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { UserStatus } from "../../../../src/server/entities/user.entity";
import { acceptUser } from "../../../../src/server/useCases/users/acceptUser";

describe("Accept User", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("sets user status to 'accepted'", async () => {
    const requestedUser = await userRepo.findOneByOrFail({
      userName: "Requested User",
    });
    const acceptedUser = await acceptUser(requestedUser);
    expect(acceptedUser).toHaveProperty("status", UserStatus.ACCEPTED);
  });
});
