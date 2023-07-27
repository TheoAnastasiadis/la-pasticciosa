import { AppDataSource } from "../../../../src/server/database/dataSource";
import { itemRepo } from "../../../../src/server/database/repos/item.repo";
import { createItem } from "../../../../src/server/useCases/items/createItem";

describe("Create Items", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });

  test("creates new item", async () => {
    const item = itemRepo.create({
      name: "New Item",
      price: 10,
      description: "Lorem ipsum...",
      image: "https://example.com/images/product/original.jpg",
      thumbnail: "https://example.com/images/product/small.jpg",
    });

    await createItem(item);

    const items = await itemRepo.findBy({ name: "New Item" });
    expect(items).toHaveLength(1);
  });
});
