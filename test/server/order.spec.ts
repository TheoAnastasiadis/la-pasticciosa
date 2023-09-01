import { Session } from "../../src/server/entities/session";
import { AppDataSource } from "../../src/server/database";
import { User, UserType } from "../../src/server/entities/user";
import { Item } from "../../src/server/entities/item";
import { Delivery, DeliveryStatus } from "../../src/server/entities/delivery";
import { appRouter } from "../../src/server/router";
import { Order, OrderStatus } from "../../src/server/entities/order";
import { In } from "typeorm";
import moment from "moment";
import { Quantity } from "../../src/server/entities/quantity";

describe("Order Entity Use Cases", () => {
  let adminSessionId: string;
  let admin: User;
  let userSessionId: string;
  let user: User;
  beforeAll(async () => {
    await AppDataSource.initialize();

    // create two example users, one of each kind.
    admin = await User.create({
      email: "admin@email.com",
      type: UserType.ADMIN,
      password: "veryStrongPassword",
      userName: "admin" + Math.random(),
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
    }).save();

    user = await User.create({
      email: "user@email.com",
      type: UserType.USER,
      password: "veryStrongPassword",
      userName: "user" + Math.random(),
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
    }).save();

    // create sessionIds for each
    adminSessionId = (await Session.create({ user: admin }).save()).id;
    userSessionId = (await Session.create({ user: user }).save()).id;
  }, 20000);

  test("place order (as user)", async () => {
    // create example item and assign to user
    const item = await Item.save(
      Item.create({
        name: "Example Item 1",
        description: "Lorem Ipsum",
        price: "10.99",
        unit: "Kg",
        image: "https://www.example.com/images/full.png",
        thumbnail: "https://www.example.com/images/thumb.jpg",
      }),
    );
    user.catalogue = [item];
    await user.save();

    // create example delivery and assign to user
    const delivery = await Delivery.save(
      Delivery.create({
        name: "Example Delivery 1",
        user,
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
        state: DeliveryStatus.ACCEPTED,
      }),
    );

    const order = await appRouter
      .createCaller({
        sessionId: userSessionId,
        setCookie: {} as any,
      })
      .placeOrder({
        deliveryId: delivery.id,
        quantityIds: [{ item: item.id, value: 1 }],
      });

    expect(order).toHaveProperty("status", OrderStatus.PENDING);
    expect(moment(order.estimatedDelivery).unix()).toBe(0);
    expect(order).toHaveProperty("total", "10.99");
  }, 20000);

  test("place order (as admin on behalf of user)", async () => {
    // create example item and assign to user
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
    user.catalogue = [item];
    await user.save();

    // create example delivery and assign to user
    const delivery = await Delivery.save(
      Delivery.create({
        name: "Example Delivery 2",
        user,
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
        state: DeliveryStatus.ACCEPTED,
      }),
    );

    const order = await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .placeOrder({
        deliveryId: delivery.id,
        quantityIds: [{ item: item.id, value: 1 }],
        // @ts-expect-error onBehalf is not explicitly set as input for the route
        onBehalf: user.uuid,
      });

    expect(order).toHaveProperty("user.uuid", `${user.uuid}`);
    expect(order).toHaveProperty("status", OrderStatus.PENDING);
    expect(moment(order.estimatedDelivery).unix()).toBe(0);
    expect(order).toHaveProperty("total", "10.99");
  }, 20000);

  test("auto generate order", async () => {
    // create example items and assign to user
    const item1 = await Item.save(
      Item.create({
        name: "Raviolli",
        description: "Filled Pasta",
        price: "10.99",
        unit: "Kg",
        image: "https://www.example.com/images/full.png",
        thumbnail: "https://www.example.com/images/thumb.jpg",
      }),
    );
    const item2 = await Item.save(
      Item.create({
        name: "Papardelle",
        description: "regular",
        price: "5.67",
        unit: "500gr",
        image: "https://www.example.com/images/full.png",
        thumbnail: "https://www.example.com/images/thumb.jpg",
      }),
    );
    user.catalogue = [item1, item2];
    await user.save();

    // create example delivery and assign to user
    const delivery = await Delivery.save(
      Delivery.create({
        name: "Restaurant",
        user,
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
        state: DeliveryStatus.ACCEPTED,
      }),
    );

    const text = "Θα ήθελα 2 κιλά ραβιόλι παρακαλώ πολύ.";

    const detection = await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .autoGenerate({ mobile: user.mobileNumber, text });

    expect(detection).not.toHaveProperty("reason");
    expect(detection).toHaveProperty("user", user.uuid.toString());
    expect(detection).toHaveProperty("quantities", [
      { item: item1.id.toString(), value: 2 },
    ]);
    expect(detection).toHaveProperty("delivery", delivery.id.toString());
  }, 20000);

  test("update status and update estimate", async () => {
    // create example item and assign to user
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
    user.catalogue = [item];
    await user.save();

    // create example delivery and assign to user
    const delivery = await Delivery.save(
      Delivery.create({
        name: "Example Delivery 3",
        user,
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
        state: DeliveryStatus.ACCEPTED,
      }),
    );

    // create example order
    const order = await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .placeOrder({
        deliveryId: delivery.id,
        quantityIds: [{ item: item.id, value: 1 }],
        // @ts-expect-error onBehalf is not explicitly set as input for the route
        onBehalf: user.uuid,
      });

    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .updateOrderStatus({ orderId: order.id, status: OrderStatus.ACCEPTED });

    const orderEntry = await Order.findOneByOrFail({ id: order.id });
    expect(orderEntry).toHaveProperty("status", OrderStatus.ACCEPTED);

    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .updateOrderEstimate({ id: order.id, day: 2, month: 0, year: 2012 });

    await orderEntry.reload();
    expect(orderEntry.estimatedDelivery).toEqual("2012-01-01");
  }, 20000);

  afterAll(async () => {
    user.catalogue = []; // if we don't emtpy the catalogue, the user cannot be deleted.
    await user.save();
    const orders = await Order.find({ where: { user: { uuid: user.uuid } } });
    await Quantity.delete({
      order: { id: In(orders.map((order) => order.id)) },
    });
    await Order.delete({ id: In(orders.map((order) => order.id)) });
    await Delivery.delete({
      name: In([
        "Example Delivery 1",
        "Example Delivery 2",
        "Example Delivery 3",
        "Restaurant",
      ]),
    });
    await Item.delete({
      name: In([
        "Example Item 1",
        "Example Item 2",
        "Example Item 3",
        "Raviolii",
        "Papardelle",
      ]),
    });
    await Session.delete({ id: In([userSessionId, adminSessionId]) });
    await User.delete({ uuid: In([user.uuid, admin.uuid]) });
  });
});
