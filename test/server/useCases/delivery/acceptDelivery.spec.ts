import { AppDataSource } from "../../../../src/server/database/dataSource";
import { deliveryRepo } from "../../../../src/server/database/repos/delivery.repo";
import { DeliveryStatus } from "../../../../src/server/entities/delivery.entity";
import { acceptDelivery } from "../../../../src/server/useCases/delivery/acceptDelivery";

describe("Accept Delivery", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("changes delivery status to 'accepted'", async () => {
    const requestedDelivery = await deliveryRepo.findOneByOrFail({
      name: "Requested Delivery",
    });
    const acceptedDelivery = await acceptDelivery(requestedDelivery);
    expect(acceptedDelivery).toHaveProperty("state", DeliveryStatus.ACCEPTED);
  });
});
