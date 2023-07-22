import { AppDataSource } from "../../../../src/server/database/dataSource";
import { itemRepo } from "../../../../src/server/database/repos/item.repo";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { userType } from "../../../../src/server/entities/user.entity";
import { viewAssignedItems } from "../../../../src/server/useCases/items/viewAssignedItems";

describe("View Assigned Items", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    const item = itemRepo.create({
      name: "Product",
      price: 10,
      description: "Lorem ipsum...",
      image: "https://example.com/images/product/original.jpg",
      thumbnail: "https://example.com/images/product/small.jpg",
    });
    await itemRepo.insert(item);

    const user = userRepo.create({
      userName: "John_Doe",
      email: "john@doe.com",
      password: "**********",
      companyName: "Doe Ltd.",
      companyAddress: "69 Rndm Dr., Athens, Greece",
      vat: "999999999",
      type: userType.USER,
      catalogue: [item],
    });
    await userRepo.save(user);
  }, 10000);

  test("assigns item to user", async () => {
    const user = await userRepo.findOneBy({ userName: "John_Doe" });

    if (user == null)
      throw new Error("Database connection could no be established");

    const items = await viewAssignedItems(user);

    expect(items).toBeTruthy();
    expect(items).toHaveLength(1);
  });

  afterAll(async () => {
    await userRepo.delete({ email: "john@doe.com" });
    await itemRepo.delete({ name: "Product" });
  });
});
