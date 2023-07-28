import moment from "moment";
import { AppDataSource } from "../../../../src/server/database/dataSource";
import { orderRepo } from "../../../../src/server/database/repos/order.repo";
import { OrderStatus } from "../../../../src/server/entities/order.entity";
import { updateOrderEstimate } from "../../../../src/server/useCases/order/updateOrderEstimate";

describe("Update order estimate", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("changes the ETA of the order", async () => {
    const order = await orderRepo.findOneOrFail({
      where: [
        { status: OrderStatus.PENDING },
        { status: OrderStatus.ACCEPTED },
      ],
    });
    const now = moment();
    const inOneMonth = now.add(1, "M");
    const result = await updateOrderEstimate(order, inOneMonth.toDate());
    expect(result).toHaveProperty(
      "estimatedDelivery",
      inOneMonth.toDate().toISOString(),
    );
  });
});
