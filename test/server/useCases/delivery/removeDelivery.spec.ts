import { AppDataSource } from "../../../../src/server/database/dataSource";
import { Delivery } from "../../../../src/server/entities/delivery.entity";
import { removeDelivery } from "../../../../src/server/useCases/delivery/removeDelivery";

describe("Remove Delivery", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });

  test("removes delivery from db", async () => {
    const delivery = await Delivery.findOneByOrFail({
      name: "Requested Delivery",
    });
    await removeDelivery(delivery);
    const results = await Delivery.findBy({
      name: "Requested Delivery",
    });
    expect(results).toHaveLength(0);
  });
});
