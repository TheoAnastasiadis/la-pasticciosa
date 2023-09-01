import { DataSource } from "typeorm";
import { URL } from "url";
import appConfig from "../config/app.config";
import { User } from "../entities/user";
import { Item } from "../entities/item";
import { Delivery } from "../entities/delivery";
import { Order } from "../entities/order";
import { Session } from "../entities/session";
import { Quantity } from "../entities/quantity";

const dbUrl = new URL(appConfig.getDBUrl());
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

export const AppDataSource = new DataSource({
  type: "cockroachdb",
  url: dbUrl.toString(),
  ssl: true,
  extra: {
    options: routingId,
  },
  timeTravelQueries: false,
  entities: [User, Item, Delivery, Order, Session, Quantity],
  synchronize: true,
  logging: ["error"],
});
