import { Session } from "../../../src/server/entities/session";
import { AppDataSource } from "../../../src/server/database";
import { User, UserStatus, UserType } from "../../../src/server/entities/user";
import { Item } from "../../../src/server/entities/item";
import {
  Delivery,
  DeliveryStatus,
} from "../../../src/server/entities/delivery";
import { appRouter } from "../../../src/server/data/router";
import { Order, OrderStatus } from "../../../src/server/entities/order";
import { In } from "typeorm";
import moment from "moment";
import { Quantity } from "../../../src/server/entities/quantity";

describe("Order Entity Use Cases", () => {
  let adminSessionId: string;
  let admin: User;
  let userSessionId: string;
  let user: User;

  beforeAll(async () => {
    await AppDataSource.initialize();

    //empty db
    await Quantity.delete({});
    await Delivery.delete({});
    await Order.delete({});
    await Item.delete({});
    await User.delete({});

    // create two example users, one of each kind.
    admin = await User.create({
      email: "admin@email.com",
      type: UserType.ADMIN,
      password: "veryStrongPassword",
      userName: "admin" + Math.random(),
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
      mobileNumber: "6955555555",
    }).save();

    user = await User.create({
      email: "user@email.com",
      type: UserType.USER,
      status: UserStatus.ACCEPTED,
      password: "veryStrongPassword",
      userName: "user" + Math.random(),
      companyName: "Company",
      companyAddress: "Address",
      vat: "123456789",
      mobileNumber: "6977777777",
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
    const item = await Item.create({
      name: "Example Item 2",
      description: "Lorem Ipsum",
      price: "10.99",
      unit: "Kg",
      image: "https://www.example.com/images/full.png",
      thumbnail: "https://www.example.com/images/thumb.jpg",
    }).save();

    user.catalogue = [item];
    await user.save();

    // create example delivery and assign to user
    const delivery = await Delivery.create({
      name: "Example Delivery 2",
      user,
      street: "Example Str.",
      number: "2A",
      zip: "12345",
      details: "Lorem Ipsum",
      state: DeliveryStatus.ACCEPTED,
    }).save();

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
    expect(orderEntry.estimatedDelivery).toEqual("2012-01-02");
  }, 20000);

  afterAll(async () => {
    await Session.delete({ id: In([userSessionId, adminSessionId]) });
    //empty db
    await Quantity.delete({});
    await Delivery.delete({});
    await Order.delete({});
    await Item.delete({});
    await User.delete({});

    await AppDataSource.destroy();
  });
});
