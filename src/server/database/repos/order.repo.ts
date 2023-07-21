import { Order } from "../../entities/order.entity";
import { AppDataSource } from "../dataSource";

export const orderRepo = AppDataSource.getRepository(Order);
