import { AppDataSource } from "../../../../src/server/database/dataSource";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { viewUserProfile } from "../../../../src/server/useCases/users/viewUserProfile";

describe("View User", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("fetches user profile", async () => {
    const user = await userRepo.findOneByOrFail({ userName: "Assigned User" });
    const profile = await viewUserProfile(user);
    expect(profile).toHaveProperty("user");
    expect(profile.user.password).toMatch(/\*+/);
    expect(profile).toHaveProperty("deliveries");
    expect(profile.deliveries).toHaveLength(1);
  });
});
