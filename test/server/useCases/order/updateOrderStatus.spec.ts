import { AppDataSource } from "../../../../src/server/database/dataSource";
import { orderRepo } from "../../../../src/server/database/repos/order.repo";
import { OrderStatus } from "../../../../src/server/entities/order.entity";
import { updateOrderStatus } from "../../../../src/server/useCases/order/updateOrderStatus";

describe("Update order status", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("changes the status of the order", async () => {
    const order = await orderRepo.findOneOrFail({
      where: { status: OrderStatus.PENDING },
    });
    const result = await updateOrderStatus(order, OrderStatus.ACCEPTED);
    expect(result).toHaveProperty("status", OrderStatus.ACCEPTED);
  });
});
