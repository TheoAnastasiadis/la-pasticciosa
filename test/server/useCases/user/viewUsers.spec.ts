import { AppDataSource } from "../../../../src/server/database/dataSource";
import { viewUsers } from "../../../../src/server/useCases/users/viewUsers";

describe("View Users", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  });
  test("fetches all users", async () => {
    const users = await viewUsers();
    expect(users.length).toBeGreaterThanOrEqual(3);
  });
});
