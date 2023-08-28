import { In } from "typeorm";
import { AppDataSource } from "../../src/server/database/dataSource";
import { Item } from "../../src/server/entities/item";
import { Session } from "../../src/server/entities/session";
import { User, UserType } from "../../src/server/entities/user";
import { appRouter } from "../../src/server/router";

describe("Item Entity Use Cases", () => {
  let adminSessionId: string;
  let admin: User;
  let userSessionId: string;
  let user: User;
  beforeAll(async () => {
    await AppDataSource.initialize();

    // create two example users, one of each kind.
    admin = User.create({
      email: "admin@email.com",
      type: UserType.ADMIN,
      password: "veryStrongPassword",
      userName: "admin" + Math.random(),
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
    });
    await admin.save();

    user = User.create({
      email: "user@email.com",
      type: UserType.USER,
      password: "veryStrongPassword",
      userName: "user" + Math.random(),
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
    });
    await user.save();

    // create sessionIds for each
    const adminSession = Session.create();
    adminSession.user = admin;
    await adminSession.save({ reload: true });
    adminSessionId = adminSession.id;

    const userSession = Session.create();
    userSession.user = user;
    await userSession.save({ reload: true });
    userSessionId = userSession.id;
  }, 20000);

  test("create new item", async () => {
    const item = await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .createItem({
        name: "Example Item 1",
        description: "Lorem Ipsum",
        price: "10.99",
        unit: "Kg",
        image: "https://www.example.com/images/full.png",
        thumbnail: "https://www.example.com/images/thumb.jpg",
      });

    expect(item).toHaveProperty("id");
  }, 10000);

  test("delete item", async () => {
    const item = await Item.save(
      Item.create({
        name: "Example Item 2",
        description: "Lorem Ipsum",
        price: "10.99",
        unit: "Kg",
        image: "https://www.example.com/images/full.png",
        thumbnail: "https://www.example.com/images/thumb.jpg",
      }),
    );

    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .deleteItem({ itemId: item.id });

    const items = await Item.find({ where: { name: "Example Item 2" } });
    expect(items).toHaveLength(0);
  }, 10000);

  test("Assign and Unassign Item", async () => {
    const item = await Item.save(
      Item.create({
        name: "Example Item 3",
        description: "Lorem Ipsum",
        price: "10.99",
        unit: "Kg",
        image: "https://www.example.com/images/full.png",
        thumbnail: "https://www.example.com/images/thumb.jpg",
      }),
    );

    // First we assign
    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .toggleAssignment({ userId: user.uuid, itemId: item.id });

    const userWOneItem = await User.findOneOrFail({
      where: { uuid: user.uuid },
      relations: ["catalogue"],
    });

    expect(userWOneItem.catalogue).toHaveLength(1);

    // Then we unassign
    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .toggleAssignment({ userId: user.uuid, itemId: item.id });

    const userWNoItems = await User.findOneOrFail({
      where: { uuid: user.uuid },
      relations: ["catalogue"],
    });
    expect(userWNoItems.catalogue).toHaveLength(0);
  }, 10000);

  test("view items (as admin)", async () => {
    await Item.save(
      Item.create({
        name: "Example Item 4",
        description: "Lorem Ipsum",
        price: "10.99",
        unit: "Kg",
        image: "https://www.example.com/images/full.png",
        thumbnail: "https://www.example.com/images/thumb.jpg",
      }),
    );

    const items = await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .viewItems({ page: 0 });

    expect(items.some((item) => item.name === "Example Item 4")).toBeTruthy();
  }, 10000);

  test("view items (as user)", async () => {
    await Item.save(
      Item.create({
        name: "Example Item 5",
        description: "Lorem Ipsum",
        price: "10.99",
        unit: "Kg",
        image: "https://www.example.com/images/full.png",
        thumbnail: "https://www.example.com/images/thumb.jpg",
      }),
    );

    const items = await appRouter
      .createCaller({
        sessionId: userSessionId,
        setCookie: {} as any,
      })
      .viewItems({ page: 0 });

    expect(items.some((item) => item.name === "Example Item 5")).toBeFalsy();
  }, 10000);

  afterAll(async () => {
    await Item.delete({
      name: In([
        "Example Item 1",
        "Example Item 2",
        "Example Item 3",
        "Example Item 4",
        "Example Item 5",
      ]),
    });
    await Session.delete({ id: In([userSessionId, adminSessionId]) });
    await User.delete({ uuid: In([user.uuid, admin.uuid]) });
  });
});
