import type { z } from "zod";
import { item } from "../../entities/decoders/item.decoder";
import { Item } from "../../entities/item.entity";
import { createItem } from "../../useCases/items/createItem";
import { throwDBError } from "../helpers/throwDBError";

const itemProps = item.omit({ id: true });

export const createItemController: (
  props: z.infer<typeof itemProps>,
) => Promise<void> = async (props) => {
  const item = new Item();
  Object.assign(item, props);

  await createItem(item).catch(throwDBError);
};
