import { Delivery } from "../../entities/delivery.entity";
import { AppDataSource } from "../dataSource";

export const deliveryRepo = AppDataSource.getRepository(Delivery);
