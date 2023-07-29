import { AppDataSource } from "../../../../src/server/database/dataSource";
import { User } from "../../../../src/server/entities/user.entity";
import { viewUserProfile } from "../../../../src/server/useCases/users/viewUserProfile";

describe("View User", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("fetches user profile", async () => {
    const user = await User.findOneByOrFail({ userName: "Assigned User" });
    const profile = await viewUserProfile(user);
    expect(profile).toHaveProperty("user");
    expect(profile).toHaveProperty("deliveries");
    expect(profile.deliveries).toHaveLength(1);
  });
});
