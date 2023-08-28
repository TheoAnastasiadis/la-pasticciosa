import { User, UserType } from "../../src/server/entities/user";
import { Session } from "../../src/server/entities/session";
import { appRouter } from "../../src/server/router";
import { Delivery, DeliveryStatus } from "../../src/server/entities/delivery";
import { In } from "typeorm";
import { AppDataSource } from "../../src/server/database/dataSource";

describe("Delivery Entity Use Cases", () => {
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

  test("request new delivery as user", async () => {
    const newDelivery = await appRouter
      .createCaller({
        sessionId: userSessionId,
        setCookie: {} as any,
      })
      .requestDelivery({
        name: "Example Delivery 1",
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
      });

    expect(newDelivery).toHaveProperty("id");
    expect(newDelivery).toHaveProperty("state", DeliveryStatus.REQUESTED);
  }, 20000);

  test("request new delivery as admin (on behalf of user)", async () => {
    const newDelivery = await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .requestDelivery({
        name: "Example Delivery 2",
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
        // @ts-expect-error `onBehalf` is not explicitly mentioned on the input schema
        onBehalf: user.uuid,
      });

    expect(newDelivery).toHaveProperty("id");
    expect(newDelivery).toHaveProperty("state", DeliveryStatus.REQUESTED);
    const deliveryEntry = await Delivery.findOneOrFail({
      where: { id: newDelivery.id },
      relations: { user: true },
    });
    expect(deliveryEntry).toHaveProperty("user.uuid", user.uuid);
  }, 20000);

  test("update delivery status -> accepted", async () => {
    const delivery = await Delivery.save(
      Delivery.create({
        user,
        name: "Example Delivery 3",
        state: DeliveryStatus.REQUESTED,
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
      }),
    );

    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .updateDeliveryStatus({ deliveryId: delivery.id, action: "accept" });

    await delivery.reload();
    expect(delivery).toHaveProperty("state", DeliveryStatus.ACCEPTED);
  }, 20000);

  test("update delivery status -> delete", async () => {
    const delivery = await Delivery.save(
      Delivery.create({
        user,
        name: "Example Delivery 4",
        state: DeliveryStatus.REQUESTED,
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
      }),
    );

    await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .updateDeliveryStatus({ deliveryId: delivery.id, action: "delete" });

    const deliveries = await Delivery.find({
      where: { name: "Example Delivery 4" },
    });
    expect(deliveries).toHaveLength(0);
  }, 20000);

  test("view deliveries (as admin)", async () => {
    await Delivery.save(
      Delivery.create({
        name: "Example Delivery 5",
        user: admin,
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
      }),
    );

    const deliveries = await appRouter
      .createCaller({
        sessionId: adminSessionId,
        setCookie: {} as any,
      })
      .viewDeliveries({ page: 0 });

    expect(
      deliveries.some((delivery) => delivery.name === "Example Delivery 5"),
    ).toBeTruthy();
  }, 20000);

  test("view deliveries (as user)", async () => {
    await Delivery.save(
      Delivery.create({
        name: "Example Delivery 6",
        user: admin, // this delivery should not be accessible to the simple user
        street: "Example Str.",
        number: "2A",
        zip: "12345",
        details: "Lorem Ipsum",
      }),
    );

    const deliveries = await appRouter
      .createCaller({
        sessionId: userSessionId,
        setCookie: {} as any,
      })
      .viewDeliveries({ page: 0 });

    expect(
      deliveries.some((delivery) => delivery.name === "Example Delivery 6"),
    ).toBeFalsy();
  }, 20000);

  afterAll(async () => {
    await Delivery.delete({
      name: In([
        "Example Delivery 1",
        "Example Delivery 2",
        "Example Delivery 3",
        "Example Delivery 4",
        "Example Delivery 5",
        "Example Delivery 6",
      ]),
    });
    await Session.delete({ id: In([userSessionId, adminSessionId]) });
    await User.delete({ uuid: In([user.uuid, admin.uuid]) });
  });
});
