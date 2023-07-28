import { userRepo } from "../../../src/server/database/repos/user.repo";
import {
  type User,
  UserStatus,
  UserType,
} from "../../../src/server/entities/user.entity";
import { appRouter } from "../../../src/server/router";
import { mock, instance } from "ts-mockito";
import type * as trpcExpress from "@trpc/server/adapters/express";
import { sessionRepo } from "../../../src/server/database/repos/session.repo";
import { itemRepo } from "../../../src/server/database/repos/item.repo";
import type { Item } from "../../../src/server/entities/item.entity";
import { AppDataSource } from "../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../src/server/database/repos/delivery.repo";
import {
  type Delivery,
  DeliveryStatus,
} from "../../../src/server/entities/delivery.entity";

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
  // create
  const admin = userRepo.create({
    userName: "admin",
    password: "********",
    email: "admin@example.com",
    companyAddress: "",
    companyName: "",
    status: UserStatus.ACCEPTED,
    type: UserType.ADMIN,
    vat: "987654321",
  });

  const user = userRepo.create({
    userName: "user",
    password: "**********",
    email: "client@email.com",
    companyAddress: "",
    companyName: "",
    status: UserStatus.ACCEPTED,
    type: UserType.USER,
    vat: "012345678",
  });

  const requested = userRepo.create({
    userName: "other_user",
    password: "**********",
    email: "other@email.com",
    companyAddress: "",
    companyName: "",
    status: UserStatus.REQUESTED,
    type: UserType.USER,
    vat: "999999999",
  });

  const item = itemRepo.create({
    name: "Old Item",
    image: "",
    price: "0.33",
    thumbnail: "",
    description: "",
  });

  const delivery = deliveryRepo.create({
    name: "Company HQ",
    street: "Main St.",
    number: "1A",
    zip: 12345,
    details: "Building E, South entrance",
    state: DeliveryStatus.ACCEPTED,
  });
  // initiliaze
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  // save
  await userRepo.insert(user);
  await userRepo.insert(admin);
  await userRepo.insert(requested);
  await itemRepo.insert(item);
  await deliveryRepo.insert(delivery);
  await delivery.reload();
  delivery.user = user;
  await delivery.save();
  await user.reload();
  user.catalogue.push(item);
  await user.save();
  await admin.reload();
  await requested.reload();
  await item.reload();
  // create sessions
  const userSession = (await sessionRepo.insert({ user })).generatedMaps[0].id;
  const adminSession = (await sessionRepo.insert({ user: admin }))
    .generatedMaps[0].id;
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
