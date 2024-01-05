import { User, UserStatus, UserType } from "../src/server/entities/user";
import { AppDataSource } from "../src/server/database";

console.log("starting...");
AppDataSource.initialize().then(() => {
  // create a new seed administrator
  User.create({
    userName: "Cypress_Admin",
    email: "cypresadmin@example.com",
    password: "123456abcde",
    type: UserType.ADMIN,
    status: UserStatus.ACCEPTED,
    companyName: "La Pasticciosa",
    companyAddress: "Default Address",
    vat: "123456789",
  })
    .save()
    .then(console.dir)
    .catch(console.error);
});
