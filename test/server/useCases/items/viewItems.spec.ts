import { AppDataSource } from "../../../../src/server/database/dataSource";
import { viewItems } from "../../../../src/server/useCases/items/viewItems";

describe("View Items", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });

  test("fetches all items", async () => {
    const items = await viewItems();
    expect(items?.length).toBeGreaterThanOrEqual(3);
  });
});
