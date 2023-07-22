import { AppDataSource } from "../../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../../src/server/database/repos/delivery.repo";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { Delivery } from "../../../../src/server/entities/delivery.entity";
import { requestUser } from "../../../../src/server/useCases/users/requestUser";
import { viewUserProfile } from "../../../../src/server/useCases/users/viewUserProfile";

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
    await AppDataSource.manager.insert(Delivery, {
      name: "Fancy Restaurant",
      street: "Rndm Dr.",
      number: "69",
      zip: 99999,
      user,
    });
  });
  test("fetches user profile", async () => {
    const user = await userRepo.findOneBy({ userName: "John_Doe" });
    if (user == null) throw new Error("Test case error");
    const profile = await viewUserProfile(user);
    expect(profile).toHaveProperty("user");
    expect(profile).toHaveProperty("deliveries");
    expect(profile.deliveries).toHaveLength(1);
    expect(profile.user.password).toBeFalsy();
  });
  afterAll(async () => {
    await deliveryRepo.delete({ name: "Fancy Restaurant" });
    await userRepo.delete({ userName: "John_Doe" });
  });
});
