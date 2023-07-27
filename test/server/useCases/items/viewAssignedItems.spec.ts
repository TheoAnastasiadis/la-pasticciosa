import { AppDataSource } from "../../../../src/server/database/dataSource";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { viewAssignedItems } from "../../../../src/server/useCases/items/viewAssignedItems";

describe("View Assigned Items", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  }, 10000);

  test("assigns item to user", async () => {
    const user = await userRepo.findOneByOrFail({ userName: "Assigned User" });
    const items = await viewAssignedItems(user.uuid);

    expect(items).toBeTruthy();
    expect(items).toHaveLength(3);
  });
});
