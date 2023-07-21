import { itemRepo } from "../../database/repos/item.repo";

export const viewItems = () => itemRepo.find();
