import { AppDataSource } from "../../src/server/database/dataSource";
import { Delivery } from "../../src/server/entities/delivery.entity";
import { Item } from "../../src/server/entities/item.entity";
import { Order } from "../../src/server/entities/order.entity";
import { Session } from "../../src/server/entities/session.entity";
import { User } from "../../src/server/entities/user.entity";

export default async function (): Promise<void> {
  await Order.delete({});
  await Delivery.delete({});
  await Session.delete({});
  await User.delete({});
  await Item.delete({});
  await AppDataSource.destroy();
}
