import { AppDataSource } from "../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../src/server/database/repos/delivery.repo";
import { itemRepo } from "../../../src/server/database/repos/item.repo";
import { orderRepo } from "../../../src/server/database/repos/order.repo";
import { sessionRepo } from "../../../src/server/database/repos/session.repo";
import { userRepo } from "../../../src/server/database/repos/user.repo";

export default async function (): Promise<void> {
  await orderRepo.delete({});
  await deliveryRepo.delete({});
  await sessionRepo.delete({});
  await userRepo.delete({});
  await itemRepo.delete({});
  await AppDataSource.destroy();
}
