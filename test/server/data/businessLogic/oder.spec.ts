import logic from "../../../../src/server/data/businessLogic/order";
import { User, UserStatus } from "../../../../src/server/entities/user";
import {
  Delivery,
  DeliveryStatus,
} from "../../../../src/server/entities/delivery";
import { Item } from "../../../../src/server/entities/item";
import { TRPCError } from "@trpc/server";

describe("validate function", () => {
  const { validate } = logic;

  it("throws error if user status is not accepted", () => {
    const user = { status: "PENDING", uuid: "user_uuid" } as unknown as User;
    const quantities: Array<{ item: string; value: number }> = [];
    const delivery = {
      user: { uuid: "user_uuid" },
      state: "ACCEPTED",
    } as unknown as Delivery;
    expect(() => validate(user, quantities, delivery)).toThrow(TRPCError);
  });

  it("throws error if delivery user does not match the user or delivery state is not accepted", () => {
    const user = {
      status: UserStatus.ACCEPTED,
      uuid: "user_uuid",
    } as unknown as User;
    const quantities: Array<{ item: string; value: number }> = [];
    const delivery = {
      user: { uuid: "other_user_uuid" },
      state: DeliveryStatus.REQUESTED,
    } as unknown as Delivery;
    expect(() => validate(user, quantities, delivery)).toThrow(TRPCError);
  });

  it("throws error if quantities array is empty", () => {
    const user = {
      status: UserStatus.ACCEPTED,
      uuid: "user_uuid",
    } as unknown as User;
    const quantities: Array<{ item: string; value: number }> = [];
    const delivery = {
      user: { uuid: "user_uuid" },
      state: DeliveryStatus.ACCEPTED,
    } as unknown as Delivery;
    expect(() => validate(user, quantities, delivery)).toThrow(TRPCError);
  });

  it("throws error if items are not assigned for the user", () => {
    const user = {
      status: UserStatus.ACCEPTED,
      uuid: "user_uuid",
      catalogue: [{ id: "1" }, { id: "2" }],
    } as unknown as User;
    const quantities: Array<{ item: string; value: number }> = [
      { item: "3", value: 1 },
    ];
    const delivery = {
      user: { uuid: "user_uuid" },
      state: DeliveryStatus.ACCEPTED,
    } as unknown as Delivery;
    expect(() => validate(user, quantities, delivery)).toThrow(TRPCError);
  });

  it("does not throw error if all conditions are met", () => {
    const user = {
      status: UserStatus.ACCEPTED,
      uuid: "user_uuid",
      catalogue: [{ id: "1" }, { id: "2" }],
    } as unknown as User;
    const quantities: Array<{ item: string; value: number }> = [
      { item: "1", value: 1 },
    ];
    const delivery = {
      user: { uuid: "user_uuid" },
      state: DeliveryStatus.ACCEPTED,
    } as unknown as Delivery;
    expect(() => validate(user, quantities, delivery)).not.toThrow();
  });
});

describe("calculateTotal function", () => {
  const { calculateTotal } = logic;

  it("calculates the correct total for given quantities", () => {
    const quantities = [
      { item: { price: "10" }, value: 2 },
      { item: { price: "5" }, value: 3 },
    ] as unknown as Array<{ item: Item; value: number }>;
    expect(calculateTotal(quantities)).toBe("35.00");
  });
});
