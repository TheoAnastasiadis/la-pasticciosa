import { AppDataSource } from "../../../../src/server/database/dataSource";
import { User, UserStatus } from "../../../../src/server/entities/user.entity";
import { acceptUser } from "../../../../src/server/useCases/users/acceptUser";

describe("Accept User", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("sets user status to 'accepted'", async () => {
    const requestedUser = await User.findOneByOrFail({
      userName: "Requested User",
    });
    const acceptedUser = await acceptUser(requestedUser);
    expect(acceptedUser).toHaveProperty("status", UserStatus.ACCEPTED);
  });
});
