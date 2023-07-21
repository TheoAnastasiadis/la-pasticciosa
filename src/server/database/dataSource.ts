import { DataSource } from "typeorm";
import { URL } from "url";
import appConfig from "../config/app.config";
import { User } from "../entities/user.entity";
import { Item } from "../entities/item.entity";
import { Delivery } from "../entities/delivery.entity";
import { Order } from "../entities/order.entity";

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
  entities: [User, Item, Delivery, Order],
  synchronize: true,
  logging:
    process.env["NOVE_ENV"] === "production" ? undefined : ["query", "error"],
});

// AppDataSource.initialize();
