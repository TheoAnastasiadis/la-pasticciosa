import type { z } from "zod";
import { viewItems } from "../../useCases/items/viewItems";
import { throwDBError } from "../errors/db.error";
import type { item } from "../../entities/decoders/item.decoder";

export const viewItemsController: () => Promise<
  Array<z.infer<typeof item>>
> = async () => {
  return (await viewItems().catch(throwDBError)).map((item) =>
    item.toSafeOutput(),
  );
};
