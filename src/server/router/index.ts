import { router } from "./trpc";
import { assignItemsRoute } from "./routeAddapters/itemRoutes/assignItems.route";
import { createItemRoute } from "./routeAddapters/itemRoutes/createItem.route";
import { viewItemsRoute } from "./routeAddapters/itemRoutes/viewItems.route";
import { viewAssignedItemsRoute } from "./routeAddapters/itemRoutes/viewAssignedItems.route";

const appRouter = router({
  //User Routes
  // requestUser: requestUserRoute,
  // acceptUser: acceptUserRoute,
  // viewUser: viewUserRoute,
  // viewUsers: viewUsersRoute,
  //Items Routes
  assignItems: assignItemsRoute,
  createItem: createItemRoute,
  viewItems: viewItemsRoute,
  viewAssignedItems: viewAssignedItemsRoute,
  //Delivery Routes
  // requestDelivery: ,
  // acceptDelivery: ,
  // viewDeliveries:,
  // viewAllDeliveries: ,
  //Order Routes
  // createOrder:,
  // updateOrder:,
  // setOrderState:,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
