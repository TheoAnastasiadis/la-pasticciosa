import moment from "moment";
import { AppDataSource } from "../../../../src/server/database/dataSource";
import { updateOrderEstimate } from "../../../../src/server/useCases/order/updateOrderEstimate";
import {
  Order,
  OrderStatus,
} from "../../../../src/server/entities/order.entity";

describe("Update order estimate", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("changes the ETA of the order", async () => {
    const order = await Order.findOneOrFail({
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
