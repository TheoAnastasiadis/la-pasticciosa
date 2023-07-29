import {
  User,
  UserStatus,
  UserType,
} from "../../../src/server/entities/user.entity";
import { appRouter } from "../../../src/server/router";
import { mock, instance } from "ts-mockito";
import type * as trpcExpress from "@trpc/server/adapters/express";
import { Item } from "../../../src/server/entities/item.entity";
import { AppDataSource } from "../../../src/server/database/dataSource";
import {
  Delivery,
  DeliveryStatus,
} from "../../../src/server/entities/delivery.entity";
import { Session } from "../../../src/server/entities/session.entity";

export const setCookie =
  mock<trpcExpress.CreateExpressContextOptions["res"]["cookie"]>();

export const createCaller: () => Promise<{
  callAsAdmin: ReturnType<typeof appRouter.createCaller>;
  callAsAcceptedUser: ReturnType<typeof appRouter.createCaller>;
  user: User;
  admin: User;
  item: Item;
  requested: User;
  delivery: Delivery;
}> = async () => {
  // initiliaze
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  // create
  const admin = await User.createAndSave({
    userName: "admin",
    password: "********",
    email: "admin@example.com",
    companyAddress: "",
    companyName: "",
    status: UserStatus.ACCEPTED,
    type: UserType.ADMIN,
    vat: "987654321",
  });

  const user = await User.createAndSave({
    userName: "user",
    password: "**********",
    email: "client@email.com",
    companyAddress: "",
    companyName: "",
    status: UserStatus.ACCEPTED,
    type: UserType.USER,
    vat: "012345678",
  });

  const requested = await User.createAndSave({
    userName: "other_user",
    password: "**********",
    email: "other@email.com",
    companyAddress: "",
    companyName: "",
    status: UserStatus.REQUESTED,
    type: UserType.USER,
    vat: "999999999",
  });

  const item = await Item.createAndSave({
    name: "Old Item",
    image: "http://example.com/images/item_1_full.jpg",
    price: "0.33",
    thumbnail: "http://example.com/images/item_1_small.jpg",
    description: "lorem ipsum",
  });

  const delivery = await Delivery.createAndSave(
    {
      name: "Company HQ",
      street: "Main St.",
      number: "1A",
      zip: "12345",
      details: "Building E, South entrance",
      state: DeliveryStatus.ACCEPTED,
    },
    user,
  );
  // save
  user.catalogue = [item];
  await user.save();
  // create sessions
  const userSession = (await Session.insert({ user })).generatedMaps[0].id;
  const adminSession = (await Session.insert({ user: admin })).generatedMaps[0]
    .id;
  // create callers
  const callAsAcceptedUser = appRouter.createCaller({
    sessionId: userSession,
    setCookie: instance(setCookie),
  });
  const callAsAdmin = appRouter.createCaller({
    sessionId: adminSession,
    setCookie: instance(setCookie),
  });
  return {
    callAsAcceptedUser,
    callAsAdmin,
    user,
    admin,
    item,
    requested,
    delivery,
  };
};
