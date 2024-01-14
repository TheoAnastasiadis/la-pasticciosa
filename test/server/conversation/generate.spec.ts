import { AppDataSource } from "../../../src/server/database";
import { Delivery } from "../../../src/server/entities/delivery";
import { Item } from "../../../src/server/entities/item";
import { Order } from "../../../src/server/entities/order";
import { Quantity } from "../../../src/server/entities/quantity";
import { User, UserStatus, UserType } from "../../../src/server/entities/user";
import ai from "../../../src/server/conversation/services/nlp/generate";
import assert from "assert";
import { DeepPartial } from "typeorm";

describe("test generation use cases", () => {
  let user: User;
  let admin: User;
  let delivery: Delivery;
  let items: Item[];

  beforeAll(async () => {
    await AppDataSource.initialize();

    admin = await AppDataSource.manager
      .create(User, {
        userName: "generation_admin",
        email: "generation_admin@example.com",
        password: "123456abcde",
        mobileNumber: "6933333333",
        type: UserType.ADMIN,
        status: UserStatus.ACCEPTED,
        companyName: "Admin Company",
        companyAddress: "Admin Company Address",
        vat: "555555555",
      })
      .save({ reload: true });

    items = await Promise.all(
      [
        {
          name: "Ravioli Σπανάκι Ρικότα",
          description: "Γεμιστό Ζυμαρικό",
          price: "10,00",
          unit: "Κg",
          image: "https://www.example.com/images/ravioli.jpg?q=full",
          thumbnail: "https://www.example.com/images/ravioli.jpg?q=0.25",
        },
        {
          name: "Papardelle",
          description: "Απλό ζυμαρικό",
          price: "5,00",
          unit: "500gr",
          image: "https://www.example.com/images/papardelle.jpg?q=full",
          thumbnail: "https://www.example.com/images/papardelle.jpg?q=0.25",
        },
      ].map(
        async (item: DeepPartial<Item>) =>
          await (AppDataSource.manager.create(Item, item) as Item).save({
            reload: true,
          }),
      ),
    );

    user = await AppDataSource.manager
      .create(User, {
        userName: "generation_user",
        email: "generation_user@example.com",
        password: "123456abcde",
        mobileNumber: "6944444444",
        type: UserType.USER,
        status: UserStatus.ACCEPTED,
        companyName: "User Company",
        companyAddress: "User Company Address",
        vat: "666666666",
        catalogue: items,
      })
      .save();
    assert(user.catalogue);

    delivery = await AppDataSource.manager
      .create(Delivery, {
        street: "Παπαδοπούλου",
        number: "3",
        zip: "12345",
        name: "Έδρα",
        details: "...",
        user,
      })
      .save();
  });

  test("generate response", async () => {
    const prompt = ai.createPrompt(user, user.catalogue as Item[], [delivery]);
    const message = "Θα ήθελα 2 κιλά παπαρδέλλες και 5 κιλά ραβιόλι";
    const response = await ai.generateResponse(prompt, message);
    console.warn(response);
    expect(response).toMatch(/`{3}json[\s\S]*`{3}/gm);
    const data = ai.parseResponse(response);
    expect(data).toEqual({
      quantities: [
        {
          itemId: items[0].id.toString(),
          value: 5,
        },
        { itemId: items[1].id.toString(), value: 4 },
      ],
      deliveryLocationId: delivery.id.toString(),
    });
  }, 20000);

  test("parse valid response", () => {
    const string = `\`\`\`json
    {
      "quantities": [
        {
          "itemId": "998",
          "value": 4
        },
        {
          "itemId": "997",
          "value": 5
        }
      ],
      "deliveryLocationId": "772"
    }
    \`\`\``;
    const data = ai.parseResponse(string);
    expect(data).toBeTruthy();
    expect(data).toEqual({
      quantities: [
        {
          itemId: "998",
          value: 4,
        },
        {
          itemId: "997",
          value: 5,
        },
      ],
      deliveryLocationId: "772",
    });
  });

  test("parse invalid response", () => {
    const string = "{}";
    const data = ai.parseResponse(string);
    expect(data).toBeFalsy();
  });

  afterAll(async () => {
    //empty db
    await Quantity.delete({});
    await Delivery.delete({});
    await Order.delete({});
    await Item.delete({});
    await User.delete({});

    await AppDataSource.destroy();
  });
});
