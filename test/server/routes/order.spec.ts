import moment from "moment";
import { AppDataSource } from "../../../src/server/database/dataSource";
import { type Delivery } from "../../../src/server/entities/delivery.entity";
import type { Item } from "../../../src/server/entities/item.entity";
import { Order, OrderStatus } from "../../../src/server/entities/order.entity";
import { createCaller } from "./testObjects";

let callAsAcceptedUser: Awaited<
  ReturnType<typeof createCaller>
>["callAsAcceptedUser"];
let callAsAdmin: Awaited<ReturnType<typeof createCaller>>["callAsAdmin"];
let delivery: Delivery;
let item: Item;

describe("Order Routes", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const callers = await createCaller();
    callAsAcceptedUser = callers.callAsAcceptedUser;
    callAsAdmin = callers.callAsAdmin;
    item = callers.item;
    delivery = callers.delivery;
  }, 10000);
  test("place order [as user]", async () => {
    const result = await callAsAcceptedUser.placeOrder({
      props: { delivery: delivery.id, items: [item.id] },
    });
    expect(result).toHaveProperty("createdAt");
  });
  test("accept order [as admin]", async () => {
    const order = await Order.findOneByOrFail({
      status: OrderStatus.PENDING,
    });
    const result = await callAsAdmin.acceptOrder(order.id);
    expect(result.status).toBe(OrderStatus.ACCEPTED);
  });
  test("update order status [as admin]", async () => {
    const [order] = await Order.find({});
    const result = await callAsAdmin.updateOrderStatus({
      status: OrderStatus.PREPARATION,
      orderId: order.id,
    });
    expect(result.status).toBe(OrderStatus.PREPARATION);
  });
  test("update order estimate [as admin]", async () => {
    const [order] = await Order.find({});
    const result = await callAsAdmin.updateOrderEstimate({
      day: 13,
      month: 1,
      year: 2020,
      id: order.id,
    });
    expect(result.estimatedDelivery).toBe(moment([2020, 1, 13]).toDate());
  });
  test("view orders [as admin]", async () => {
    const orders = await callAsAdmin.viewOrders();
    expect(orders.length).toBeGreaterThanOrEqual(1);
  });
  test("view orders [as user]", async () => {
    const orders = await callAsAcceptedUser.viewOrders();
    expect(orders.length).toBeLessThanOrEqual(1);
  });
});
