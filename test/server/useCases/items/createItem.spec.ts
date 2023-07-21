import { AppDataSource } from "../../../../src/server/database/dataSource";
import { itemRepo } from "../../../../src/server/database/repos/item.repo";
import { createItem } from "../../../../src/server/useCases/items/createItem";

describe("Create Items", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  test("creates new item", async () => {
    const item = itemRepo.create({
      name: "Product",
      price: 10,
      description: "Lorem ipsum...",
      image: "https://example.com/images/product/original.jpg",
      thumbnail: "https://example.com/images/product/small.jpg",
    });

    await createItem(item);

    const items = await itemRepo.find();

    expect(items).toHaveLength(1);
  });

  afterAll(async () => {
    await itemRepo.delete({ name: "Product" });
  });
});
