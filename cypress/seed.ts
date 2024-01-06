import { User, UserStatus, UserType } from "../src/server/entities/user";
import { AppDataSource } from "../src/server/database";
import { Item } from "../src/server/entities/item";

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

const deleteSeedAdministrator = async () => {
  await User.delete({ userName: "Cypress_Admin" });
};

const deleteSeedUser = async () => {
  await AppDataSource.initialize();
  await User.delete({ userName: "Cypress_User" });
  await AppDataSource.destroy();
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

export const setup = async () => {
  await AppDataSource.initialize();
  await Promise.allSettled([
    createSeedAdministrator(),
    createSeedUser(),
    createSeedProduct(),
    deleteSeedNewUser(),
    deleteSeedNewProduct(),
  ]);
  await AppDataSource.destroy();
};

export const teardown = async () => {
  await AppDataSource.initialize();
  await Promise.allSettled([
    deleteSeedAdministrator(),
    deleteSeedUser(),
    deleteSeedProduct(),
    deleteSeedNewUser(),
    deleteSeedNewProduct(),
  ]);
  await AppDataSource.destroy();
};
