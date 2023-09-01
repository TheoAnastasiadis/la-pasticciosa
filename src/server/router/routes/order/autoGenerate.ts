import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import { procedure } from "../../setup";
import { z } from "zod";
import { phoneParser } from "../../validators";
import { User } from "../../../entities/user";
import { Delivery, DeliveryStatus } from "../../../entities/delivery";
import assert from "assert";
import nlp from "../../../businessLogic/nlp";
import type { Item } from "../../../entities/item";

export const autoGenerate = procedure
  .meta({ secure: true, adminOnly: true })
  .use(authenticate)
  .use(authorize)
  .input(
    z.object({
      mobile: phoneParser,
      text: z.string(),
    }),
  )
  .output(
    z.union([
      z.object({
        quantities: z.array(z.object({ item: z.string(), value: z.number() })),
        delivery: z.string(),
        user: z.string(),
      }),
      z.object({ reason: z.string() }),
    ]),
  )
  .mutation(async ({ input }) => {
    const { mobile, text } = input;

    const user = await User.findOneOrFail({
      where: { mobileNumber: mobile },
      relations: { catalogue: true },
    });

    assert(user.catalogue);

    // FIRST we try to avoid calling openAI
    const deliveries = await Delivery.find({
      where: { user: { uuid: user.uuid }, state: DeliveryStatus.ACCEPTED },
    });

    if (
      text.length < 5 ||
      deliveries.length === 0 ||
      user.catalogue.length === 0
    )
      return {
        reason:
          "Conditions are not met for the automatic generations of orders for this user.",
      };

    // THEN we attempt NLP
    let result: {
      quantities: Array<{ item: string; value: number }>;
      delivery: string;
    };
    try {
      result = await nlp.detectQuantitiesAndDelivery(
        user as User & { catalogue: Item[] },
        deliveries,
        text,
      );
    } catch (e) {
      return { reason: "OpenAI response not usefull" };
    }

    return { ...result, user: user.uuid.toString() };
  });
