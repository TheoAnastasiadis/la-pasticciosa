import {
  type CreateTRPCProxyClient,
  createTRPCProxyClient,
  httpBatchLink,
} from "@trpc/client";
import type { AppRouter } from "../../../data/router";
import appConfig from "../../../config/app.config";
import { User, UserType } from "../../../entities/user";
import { Session } from "../../../entities/session";
import type { z } from "zod";
import type schema from "../nlp/schema";
import assert from "assert";

export default class OrderService {
  private readonly _client!: CreateTRPCProxyClient<AppRouter>;

  private constructor(sessionId: string) {
    this._client = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: appConfig.getClientUrl() + "/data",
          headers: {
            Cookie: `__session=${sessionId};`,
          },
        }),
      ],
    });
  }

  static async authenticate(): Promise<OrderService> {
    const admin = await User.findOneByOrFail({ type: UserType.ADMIN });
    const session = await Session.create({ user: admin }).save();

    return new OrderService(session.id);
  }

  async placeOrder(data: z.infer<typeof schema>, user: User): Promise<string> {
    const order = await this._client.placeOrder.mutate({
      deliveryId: data.deliveryLocationId,
      quantityIds: data.quantities.map(({ itemId, value }) => ({
        item: itemId,
        value,
      })),
      // @ts-expect-error onBehalf is not explicitly declared as input
      onBehalf: user.uuid,
    });

    return order.id;
  }

  async updateOrderEstimate(orderId: string, timestamp: Date): Promise<string> {
    const order = await this._client.updateOrderEstimate.mutate({
      id: orderId,
      day: timestamp.getDate(),
      month: timestamp.getMonth(),
      year: timestamp.getFullYear(),
    });

    assert(order.estimatedDelivery);

    return order.estimatedDelivery;
  }
}
