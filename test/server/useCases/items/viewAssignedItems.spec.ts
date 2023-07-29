import { AppDataSource } from "../../../../src/server/database/dataSource";
import { User } from "../../../../src/server/entities/user.entity";
import { viewAssignedItems } from "../../../../src/server/useCases/items/viewAssignedItems";

describe("View Assigned Items", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  }, 10000);

  test("assigns item to user", async () => {
    const user = await User.findOneByOrFail({ userName: "Assigned User" });
    const items = await viewAssignedItems(user.uuid);
    expect(items).toHaveLength(3);
  });
});
