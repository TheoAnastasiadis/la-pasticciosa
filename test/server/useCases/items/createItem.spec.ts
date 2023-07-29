import { AppDataSource } from "../../../../src/server/database/dataSource";
import { Item } from "../../../../src/server/entities/item.entity";
import { createItem } from "../../../../src/server/useCases/items/createItem";

describe("Create Items", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });

  test("creates new item", async () => {
    await createItem({
      name: "New Item",
      price: (10).toFixed(),
      description: "Lorem ipsum...",
      image: "https://example.com/images/product/original.jpg",
      thumbnail: "https://example.com/images/product/small.jpg",
    });

    const items = await Item.findBy({ name: "New Item" });
    expect(items).toHaveLength(1);
  });
});
