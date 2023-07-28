import { AppDataSource } from "../../../../src/server/database/dataSource";
import { type Item } from "../../../../src/server/entities/item.entity";
import { type User } from "../../../../src/server/entities/user.entity";
import { createCaller } from "../testObjects";

let callAsAcceptedUser: Awaited<
  ReturnType<typeof createCaller>
>["callAsAcceptedUser"];
let callAsAdmin: Awaited<ReturnType<typeof createCaller>>["callAsAdmin"];
let user: User;
let item: Item;

describe("Item Routes", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const callers = await createCaller();
    callAsAcceptedUser = callers.callAsAcceptedUser;
    callAsAdmin = callers.callAsAdmin;
    user = callers.user;
    item = callers.item;
  });
  test("create items [as admin]", async () => {
    const newItem = await callAsAdmin.createItem({
      name: "New Example Item",
      description: "Simple example item made for testing purposes.",
      image: "https://www.example.com/example_image.jpg",
      price: "99.9",
      thumbnail: "https://www.example.com/example_image.jpg?thumbnail=true",
    });
    expect(newItem).toHaveProperty("price", "99.9");
  });
  test("asign items [as admin]", async () => {
    const result = await callAsAdmin.assignItems({
      userId: user.uuid,
      itemId: item.id,
    });
    expect(result.catalogue.length).toBe(2);
  });
  test("view assigned items", async () => {
    const items = await callAsAcceptedUser.viewAssignedItems();
    expect(items?.length).toBeGreaterThanOrEqual(1);
  });
  test("view items [as admin]", async () => {
    const items = await callAsAdmin.viewItems();
    expect(items.length).toBeGreaterThanOrEqual(2);
  });
});
