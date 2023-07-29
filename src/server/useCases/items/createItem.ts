import { item } from "../../entities/decoders/item.decoder";
import { Item } from "../../entities/item.entity";
import type { z } from "zod";

export const itemProps = item.omit({ id: true });

export const createItem: (
  props: z.infer<typeof itemProps>,
) => Promise<Item> = async (props) => {
  return await Item.createAndSave(props as Item);
};
