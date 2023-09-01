import assert from "assert";
import OpenAI from "openai";
import { z } from "zod";
import appConfig from "../config/app.config";
import type { Delivery } from "../entities/delivery";
import type { User } from "../entities/user";
import type { Item } from "../entities/item";

export default {
  detectQuantitiesAndDelivery: async (
    user: User & { catalogue: Item[] },
    deliveries: Delivery[],
    text: string,
  ) => {
    // initialize api
    const openai = new OpenAI({
      apiKey: appConfig.getOpenAIKey(),
    });

    const generationParams = {
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    // create prompt
    const propmt = [
      {
        role: "system",
        content:
          "You help clients make orders using natural language.\n\nYou have to translate their messages into JSON objects containing the order info. These objects need to conform to the following schema.\nschema = {\nquantities:\n  {\n    itemId: string,\n    value: integer, // the number of units required to match the client's requested total weight\n  }[], \ndeliveryId: string\n}",
      },
      {
        role: "assistant",
        content: `Please provide your description of the order you want to place.\n\nThe available items for purchase by the user are:\n${JSON.stringify(
          user.catalogue.map((item) => ({
            itemId: item.id,
            name: item.name,
            unit: item.unit,
          })),
        )}\n\nThe available delivery locations are:\n${JSON.stringify(
          deliveries.map((delivery) => ({
            deliveryId: delivery.id,
            name: delivery.name,
          })),
        )}\n\nIf you don't provide me with delivery information, I will pick one of the above.\n\nEach item comes in specific units of quantity. If you ask for a specific weight, then the value of each returned quantity will, multiplied by the corresponding unit, total the requested weight. Otherwise, I will simply include the number of units.`,
      },
      {
        role: "user",
        content: text,
      },
    ] satisfies Array<{
      role: "system" | "assistant" | "user";
      content: string;
    }>;
    console.warn(propmt);

    // generate completion
    const response = await openai.chat.completions.create({
      messages: propmt,
      ...generationParams,
    });

    // this is the schema we are excpecting
    const schema = z.object({
      deliveryId: z.string(),
      quantities: z.array(z.object({ itemId: z.string(), value: z.number() })),
    });

    // atempt to parse info according to schema
    assert(response.choices?.[0].message.role === "assistant");
    const raw = response.choices?.[0].message.content;
    assert(raw);
    // verify output is a valid JSON object
    const parsed = JSON.parse(raw);
    // verify output conforms to schema
    const data = schema.parse(parsed);

    console.warn(data);

    // convert to the usual naming
    const quantities = data.quantities.map(({ itemId, value }) => ({
      item: itemId,
      value,
    }));

    return { quantities, delivery: data.deliveryId };
  },
};
