import { AppDataSource } from "../../../../src/server/database/dataSource";
import { Item } from "../../../../src/server/entities/item.entity";
import { User } from "../../../../src/server/entities/user.entity";
import { assignItem } from "../../../../src/server/useCases/items/assignItem";

describe("Assign Items", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  }, 10000);

  test("assigns item to user", async () => {
    const item = await Item.findOneByOrFail({ name: "Item 1" });
    const user = await User.findOneByOrFail({ userName: "Accepted User" });

    const userWithCatalogue = await assignItem(item, user);
    expect(userWithCatalogue.catalogue).toHaveLength(1);
    expect(userWithCatalogue.catalogue?.at(0)).toEqual(item);
  });
});
