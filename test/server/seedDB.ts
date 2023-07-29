import moment from "moment";
import { AppDataSource } from "../../src/server/database/dataSource";
import {
  Delivery,
  DeliveryStatus,
} from "../../src/server/entities/delivery.entity";
import { Item } from "../../src/server/entities/item.entity";
import { Order, OrderStatus } from "../../src/server/entities/order.entity";
import {
  User,
  UserStatus,
  UserType,
} from "../../src/server/entities/user.entity";

export default async function (): Promise<void> {
  await AppDataSource.initialize();
  // create example items
  const item1 = await Item.createAndSave({
    name: "Item 1",
    description: "Delicious beef patty with melted cheese on a soft bun.",
    price: (8.99).toFixed(2),
    image: "https://example.com/cheeseburger.jpg",
    thumbnail: "https://example.com/thumbnails/cheeseburger.jpg",
  });
  const item2 = await Item.createAndSave({
    name: "Item 2",
    description:
      "Classic pizza topped with tomatoes, mozzarella, and fresh basil.",
    price: (12.5).toFixed(2),
    image: "https://example.com/margherita_pizza.jpg",
    thumbnail: "https://example.com/thumbnails/margherita_pizza.jpg",
  });
  const item3 = await Item.createAndSave({
    name: "Item 3",
    description: "Decadent chocolate brownie served with vanilla ice cream.",
    price: (5.75).toFixed(2),
    image: "https://example.com/chocolate_brownie.jpg",
    thumbnail: "https://example.com/thumbnails/chocolate_brownie.jpg",
  });
  // create example users
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user1 = await User.createAndSave({
    userName: "Requested User",
    email: "foodlover@example.com",
    password: "securepassword123",
    type: UserType.USER,
    status: UserStatus.REQUESTED,
    companyName: "Foodies R Us",
    companyAddress: "123 Main Street, City",
    vat: "123456789",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user2 = await User.createAndSave({
    userName: "Accepted User",
    email: "chefmaster@example.com",
    password: "bestchefever",
    type: UserType.USER,
    status: UserStatus.ACCEPTED,
    companyName: "Chef's Kitchen",
    companyAddress: "456 Chef Avenue, Town",
    vat: "987654321",
  });
  const user3 = await User.createAndSave({
    userName: "Assigned User",
    email: "supplier@example.com",
    password: "supplychain123",
    type: UserType.USER,
    status: UserStatus.ACCEPTED,
    companyName: "Fresh Produce Co.",
    companyAddress: "789 Supplier Road, Village",
    vat: "456789123",
  });
  user3.catalogue = [item1, item2, item3];
  await user3.save();
  // create example deliveries
  const delivery1 = await Delivery.createAndSave(
    {
      street: "Food Street",
      number: "123",
      zip: "12345",
      name: "Requested Delivery",
      details: "Near the park",
      state: DeliveryStatus.REQUESTED,
    },
    user3,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const delivery2 = await Delivery.createAndSave(
    {
      street: "Delivery Avenue",
      number: "456",
      zip: "54321",
      name: "Accepted Delivery",
      details: "Green building, 5th floor",
      state: DeliveryStatus.ACCEPTED,
    },
    user3,
  );
  // create example Orders
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const order1 = await Order.createAndSave(
    {
      total: (21.49).toFixed(2),
      status: OrderStatus.PENDING,
      estimatedDelivery: moment([2023, 9, 7]).toDate(),
    },
    user3,
    delivery1,
    [item1, item2, item3],
  );
}
