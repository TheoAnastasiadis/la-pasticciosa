import { router } from "./trpc";
import { assignItemsRoute } from "./routeAddapters/item/assignItems.route";
import { createItemRoute } from "./routeAddapters/item/createItem.route";
import { viewItemsRoute } from "./routeAddapters/item/viewItems.route";
import { viewAssignedItemsRoute } from "./routeAddapters/item/viewAssignedItems.route";

const appRouter = router({
  // User Routes
  // requestUser: requestUserRoute,
  // acceptUser: acceptUserRoute,
  // viewUser: viewUserRoute,
  // viewUsers: viewUsersRoute,
  // Items Routes
  // viewUserProfile: viewUserProfileRoute
  assignItems: assignItemsRoute,
  createItem: createItemRoute,
  viewItems: viewItemsRoute,
  viewAssignedItems: viewAssignedItemsRoute,
  // Delivery Routes
  // requestDelivery: ,
  // acceptDelivery: ,
  // viewDeliveries:,
  // viewAllDeliveries: ,
  // Order Routes
  // createOrder:,
  // updateOrder:,
  // setOrderState:,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
