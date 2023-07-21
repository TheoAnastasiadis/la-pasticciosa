import { AppDataSource } from "../../../../src/server/database/dataSource";
import { itemRepo } from "../../../../src/server/database/repos/item.repo";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { userType } from "../../../../src/server/entities/user.entity";
import { assignItem } from "../../../../src/server/useCases/items/assignItem";

describe("Assign Items", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    const user = userRepo.create({
      userName: "John_Doe",
      email: "john@doe.com",
      password: "**********",
      companyName: "Doe Ltd.",
      companyAddress: "69 Rndm Dr., Athens, Greece",
      vat: "999999999",
      type: userType.USER,
      catalogue: [],
    });
    await userRepo.insert(user);

    const item = itemRepo.create({
      name: "Product",
      price: 10,
      description: "Lorem ipsum...",
      image: "https://example.com/images/product/original.jpg",
      thumbnail: "https://example.com/images/product/small.jpg",
    });
    await itemRepo.insert(item);
  }, 10000);

  test("assigns item to user", async () => {
    const item = await itemRepo.findOneBy({ name: "Product" });
    const user = await userRepo.findOneBy({ userName: "John_Doe" });

    if (!user || !item)
      throw new Error("Database connection could no be established");

    await assignItem(item, user);

    user.reload();
    expect(user.catalogue).toHaveLength(1);
    expect(user.catalogue?.at(0)).toEqual(item);
  });

  afterAll(async () => {
    await userRepo.delete({ email: "john@doe.com" });
    await itemRepo.delete({ name: "Product" });
  });
});
