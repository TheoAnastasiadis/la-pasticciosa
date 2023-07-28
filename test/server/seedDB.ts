import { AppDataSource } from "../../src/server/database/dataSource";
import { deliveryRepo } from "../../src/server/database/repos/delivery.repo";
import { itemRepo } from "../../src/server/database/repos/item.repo";
import { orderRepo } from "../../src/server/database/repos/order.repo";
import { userRepo } from "../../src/server/database/repos/user.repo";
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
  const item1 = new Item();
  item1.name = "Item 1";
  item1.description = "Delicious beef patty with melted cheese on a soft bun.";
  item1.price = (8.99).toFixed(2);
  item1.image = "https://example.com/cheeseburger.jpg";
  item1.thumbnail = "https://example.com/thumbnails/cheeseburger.jpg";
  await itemRepo.insert(item1);
  await item1.reload();
  const item2 = new Item();
  item2.name = "Item 2";
  item2.description =
    "Classic pizza topped with tomatoes, mozzarella, and fresh basil.";
  item2.price = (12.5).toFixed(2);
  item2.image = "https://example.com/margherita_pizza.jpg";
  item2.thumbnail = "https://example.com/thumbnails/margherita_pizza.jpg";
  await itemRepo.insert(item2);
  await item2.reload();
  const item3 = new Item();
  item3.name = "Item 3";
  item3.description =
    "Decadent chocolate brownie served with vanilla ice cream.";
  item3.price = (5.75).toFixed(2);
  item3.image = "https://example.com/chocolate_brownie.jpg";
  item3.thumbnail = "https://example.com/thumbnails/chocolate_brownie.jpg";
  await itemRepo.insert(item3);
  await item3.reload();
  // create example users
  const user1 = new User();
  user1.userName = "Requested User";
  user1.email = "foodlover@example.com";
  user1.password = "securepassword123";
  user1.type = UserType.USER;
  user1.status = UserStatus.REQUESTED;
  user1.companyName = "Foodies R Us";
  user1.companyAddress = "123 Main Street, City";
  user1.vat = "123456789";
  user1.catalogue = [];
  await userRepo.insert(user1);
  await user1.reload();
  const user2 = new User();
  user2.userName = "Accepted User";
  user2.email = "chefmaster@example.com";
  user2.password = "bestchefever";
  user2.type = UserType.USER;
  user2.status = UserStatus.ACCEPTED;
  user2.companyName = "Chef's Kitchen";
  user2.companyAddress = "456 Chef Avenue, Town";
  user2.vat = "987654321";
  user2.catalogue = [];
  await userRepo.insert(user2);
  await user2.reload();
  const user3 = new User();
  user3.userName = "Assigned User";
  user3.email = "supplier@example.com";
  user3.password = "supplychain123";
  user3.type = UserType.USER;
  user3.status = UserStatus.ACCEPTED;
  user3.companyName = "Fresh Produce Co.";
  user3.companyAddress = "789 Supplier Road, Village";
  user3.vat = "456789123";
  await userRepo.insert(user3);
  await user3.reload();
  user3.catalogue.push(item1, item2, item3);
  await user3.save();
  // create example deliveries
  const delivery1 = new Delivery();
  delivery1.street = "Food Street";
  delivery1.number = "123";
  delivery1.zip = 12345;
  delivery1.name = "Requested Delivery";
  delivery1.details = "Near the park";
  delivery1.user = user2;
  delivery1.state = DeliveryStatus.REQUESTED;
  await deliveryRepo.insert(delivery1);
  const delivery2 = new Delivery();
  delivery2.street = "Delivery Avenue";
  delivery2.number = "456";
  delivery2.zip = 54321;
  delivery2.name = "Accepted Delivery";
  delivery2.details = "Green building, 5th floor";
  delivery2.state = DeliveryStatus.ACCEPTED;
  await deliveryRepo.insert(delivery2);
  await delivery2.reload();
  delivery2.user = user3;
  await delivery2.save();
  // create example Orders
  const order1 = new Order();
  order1.user = user3;
  order1.delivery = delivery1;
  order1.items = [item1, item2];
  order1.total = (21.49).toFixed(2);
  order1.status = OrderStatus.PENDING;
  order1.estimatedDelivery = "2023-07-26 18:30:00";
  order1.createdAt = new Date("2023-07-26 10:15:00");
  await orderRepo.insert(order1);
}
