import type { Item } from "../../entities/item";
import type { Order } from "../../entities/order";
import { Quantity } from "../../entities/quantity";

export async function createNewQuantity(
  item: Item,
  value: number,
  order: Order,
): Promise<Quantity> {
  const quantity = Quantity.create();
  quantity.value = value;
  quantity.order = order;
  await quantity.save();
  quantity.item = item;
  return await quantity.save();
}
