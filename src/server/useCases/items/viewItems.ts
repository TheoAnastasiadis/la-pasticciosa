import { Item } from "../../entities/item.entity";

export const viewItems: () => Promise<Item[]> = async () => await Item.find();
