import { AppDataSource } from "../../../../src/server/database/dataSource";
import { orderRepo } from "../../../../src/server/database/repos/order.repo";
import { OrderStatus } from "../../../../src/server/entities/order.entity";
import { viewOrdersByUser } from "../../../../src/server/useCases/order/viewOrdersByUser";

describe("View orders by User", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("fetches the orders associated with a user", async () => {
    const order = await orderRepo.findOneOrFail({
      where: { status: OrderStatus.PENDING },
      relations: { user: true },
    });
    const results = await viewOrdersByUser(order.user);
    expect(results).toHaveLength(1);
  });
});
