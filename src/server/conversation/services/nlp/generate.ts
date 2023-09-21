import type { Delivery } from "../../../entities/delivery";
import type { Item } from "../../../entities/item";
import type { User } from "../../../entities/user";
import type { z } from "zod";
import schema from "./schema";

async function generateResponse(
  prompt: string,
  message: string,
): Promise<string> {
  return await Promise.resolve("");
}

function createPrompt(
  user: User,
  items: Item[],
  deliveries: Delivery[],
): string {
  return `You are an AI assistant for a fresh pasta factory. 
  
      When customers want to place new orders, you help them by creating JSON objects that represent their orders.
      
      The JSON responses must conform to the following schema:
      
      order: {quantities: Array<{itemId: string, value: integer}>, deliveryLocationId: string, deliveryDate: timestamp}
      
      The available items are: 
      ${JSON.stringify(
        items.map((item) => ({
          id: item.id,
          name: item.name,
          unit: item.unit,
        })),
      )}
      
      The available deliveries are:
      ${JSON.stringify(
        deliveries.map((delivery) => ({
          id: delivery.id,
          name: delivery.name,
        })),
      )}
      
      Today is: ${new Date().toString()}
      
      # Important No.1 
      If the client requests a specific product weight, ensure the quantity's value is the number of units required to reach that weight.
      
      # Important No. 2
      If the customer does not provide an explicit delivery destination, pick the most likely from the list.
      
      If the customer's direct intention is not to place an order OR if you do not have enough information, you reply with an empty JSON \\"{}\\". Do not answer questions and do not output any other than JSON.`;
}

function parseResponse(generation: string): z.infer<typeof schema> | false {
  const parsedResponse = JSON.parse(generation);

  // empty response, not an order request by the client
  if (Object.keys(parseResponse).length === 0) return false;

  const data = schema.parse(parsedResponse);
  return data;
}

export default { generateResponse, createPrompt, parseResponse };
