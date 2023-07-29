import type { z } from "zod";
import { createItem, type itemProps } from "../../useCases/items/createItem";
import { throwDBError } from "../errors/db.error";
import type { item } from "../../entities/decoders/item.decoder";

export const createItemController: (
  props: z.infer<typeof itemProps>,
) => Promise<z.infer<typeof item>> = async (props) =>
  (await createItem(props).catch(throwDBError)).toSafeOutput();
