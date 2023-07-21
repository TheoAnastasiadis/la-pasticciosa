import { Item } from "../../entities/item.entity";
import { AppDataSource } from "../dataSource";

export const itemRepo = AppDataSource.getRepository(Item);
