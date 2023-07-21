import { AppDataSource } from "../../../../src/server/database/dataSource";
import { itemRepo } from "../../../../src/server/database/repos/item.repo";
import { viewItems } from "../../../../src/server/useCases/items/viewItems";

describe("View Items", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();

    const item1 = itemRepo.create({
      name: "Product 1",
      price: 10,
      description: "Lorem ipsum...",
      image: "https://example.com/images/product/original.jpg",
      thumbnail: "https://example.com/images/product/small.jpg",
    });
    await itemRepo.insert(item1);

    const item2 = itemRepo.create({
      name: "Product 2",
      price: 10,
      description: "Lorem ipsum...",
      image: "https://example.com/images/product/original.jpg",
      thumbnail: "https://example.com/images/product/small.jpg",
    });
    await itemRepo.insert(item2);
  });

  test("fetches all items", async () => {
    const items = await viewItems();
    expect(items).toHaveLength(2);
  });

  afterAll(async () => {
    await itemRepo.delete({ name: "Product 1" });
    await itemRepo.delete({ name: "Product 2" });
  });
});
