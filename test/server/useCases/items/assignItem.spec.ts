import { AppDataSource } from "../../../../src/server/database/dataSource";
import { itemRepo } from "../../../../src/server/database/repos/item.repo";
import { userRepo } from "../../../../src/server/database/repos/user.repo";
import { assignItem } from "../../../../src/server/useCases/items/assignItem";

describe("Assign Items", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  }, 10000);

  test("assigns item to user", async () => {
    const item = await itemRepo.findOneByOrFail({ name: "Item 1" });
    const user = await userRepo.findOneByOrFail({ userName: "Accepted User" });

    const userWithCatalogue = await assignItem(item, user);
    expect(userWithCatalogue.catalogue).toHaveLength(1);
    expect(userWithCatalogue.catalogue?.at(0)).toEqual(item);
  });
});
