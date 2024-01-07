import { User, UserStatus, UserType } from "../src/server/entities/user";
import { AppDataSource } from "../src/server/database";
import { Item } from "../src/server/entities/item";
import { Delivery, DeliveryStatus } from "../src/server/entities/delivery";
import { Order } from "../src/server/entities/order";

const createSeedAdministrator = async () => {
  await User.create({
    userName: "Cypress_Admin",
    email: "cypressadmin@example.com",
    password: "123456abcde",
    type: UserType.ADMIN,
    status: UserStatus.ACCEPTED,
    companyName: "La Pasticciosa",
    companyAddress: "Default Address",
    mobileNumber: "6912345678",
    vat: "123456789",
  }).save();
};

const createSeedUser = async () => {
  await User.create({
    userName: "Cypress_User",
    email: "cypressuser@example.com",
    password: "123456abcde",
    type: UserType.USER,
    status: UserStatus.ACCEPTED,
    companyName: "User Company",
    companyAddress: "Default Address",
    mobileNumber: "6912345633",
    vat: "123456339",
  }).save();
};

const createSeedAssignedUser = async () => {
  await User.create({
    userName: "Cypress_Assigned_User",
    email: "cypressassigneduser@example.com",
    password: "123456abcde",
    type: UserType.USER,
    status: UserStatus.ACCEPTED,
    companyName: "User Company",
    companyAddress: "Default Address",
    mobileNumber: "6921345633",
    vat: "123546339",
  }).save();
};

const createSeedProduct = async () => {
  await Item.create({
    name: "Sample Product",
    description: "Sample description, of sample product.",
    price: "10.00",
    unit: "Kg",
    image:
      "https://www.refugeesrespond.org/dadaabwikimedia/images/a/a9/Example.jpg",
    thumbnail:
      "https://www.refugeesrespond.org/dadaabwikimedia/images/a/a9/Example.jpg",
  }).save();
};

const createSeedDelivery = async (user: User) => {
  await Delivery.create({
    name: "Example Accepted Delivery",
    street: "Example Address",
    number: "2",
    zip: "98765",
    state: DeliveryStatus.ACCEPTED,
    user,
  }).save();
};

const deleteSeedAdministrator = async () => {
  await User.delete({ userName: "Cypress_Admin" });
};

const deleteSeedUser = async () => {
  await User.delete({ userName: "Cypress_User" });
};

const deleteSeedAssignedUser = async () => {
  await User.delete({ userName: "Cypress_Assigned_User" });
};

const deleteSeedNewUser = async () => {
  await User.delete({ userName: "Cypress_New_User" });
};

const deleteSeedProduct = async () => {
  await Item.delete({ name: "Sample Product" });
};

const deleteSeedNewProduct = async () => {
  await Item.delete({ name: "Example Product" });
};

const deleteSeedNewDelivery = async () => {
  await Delivery.delete({ name: "Sample New Delivery" });
};

const deleteSeedDelivery = async () => {
  await Delivery.delete({ name: "Example Accepted Delivery" });
};

const deleteSeedNewOrders = async () => {
  const orders = await Order.find({
    where: { user: { userName: "Cypress_Assigned_User" } },
    relations: { quantities: true },
  });
  await Promise.all(
    orders
      .map((order) => order.quantities)
      .flat()
      .map((value) => value?.remove()),
  );
  await Promise.all(orders.map((order) => order.remove()));
};

export const setup = async () => {
  await AppDataSource.initialize();
  await Promise.allSettled([
    createSeedAdministrator(),
    createSeedUser(),
    createSeedAssignedUser(),
    createSeedProduct(),
    deleteSeedNewUser(),
    deleteSeedNewProduct(),
    deleteSeedNewDelivery(),
  ]);
  const [user, item] = await Promise.all([
    User.findOneByOrFail({ userName: "Cypress_Assigned_User" }),
    Item.findOneByOrFail({ name: "Sample Product" }),
  ]);
  await Promise.all([createSeedDelivery(user), user.assignItem(item)]);
  await AppDataSource.destroy();
};

export const teardown = async () => {
  await AppDataSource.initialize();
  await deleteSeedNewOrders();
  await deleteSeedProduct();
  await Promise.allSettled([
    deleteSeedAdministrator(),
    deleteSeedUser(),
    deleteSeedNewUser(),
    deleteSeedNewProduct(),
    deleteSeedNewDelivery(),
    deleteSeedAssignedUser(),
    deleteSeedDelivery(),
  ]);
  await AppDataSource.destroy();
};
