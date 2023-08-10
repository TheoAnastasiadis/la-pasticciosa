import { router } from "./trpc";
import { assignItemsRoute } from "./routeAddapters/item/assignItems.route";
import { createItemRoute } from "./routeAddapters/item/createItem.route";
import { viewItemsRoute } from "./routeAddapters/item/viewItems.route";
import { viewAssignedItemsRoute } from "./routeAddapters/item/viewAssignedItems.route";
import { acceptUserRoute } from "./routeAddapters/user/acceptUser.route";
import { requestUserRoute } from "./routeAddapters/user/requestUser.route";
import { viewUsersRoute } from "./routeAddapters/user/viewUsers.route";
import { viewUserProfileRoute } from "./routeAddapters/user/viewUserProfile.route";
import { requestDeliveryRoute } from "./routeAddapters/delivery/requestDelivery.route";
import { acceptDeliveryRoute } from "./routeAddapters/delivery/acceptDelivery.route";
import { removeDeliveryRoute } from "./routeAddapters/delivery/removeDelivery.route";
import { placeOrderRoute } from "./routeAddapters/order/placeOrder.route";
import { updateOrderStatusRoute } from "./routeAddapters/order/updateOrderStatus.route";
import { updateOrderEstimateRoute } from "./routeAddapters/order/updateOrderEstimate.route";
import { acceptOrderRoute } from "./routeAddapters/order/acceptOrder.route";
import { viewOrdersRoute } from "./routeAddapters/order/viewOrders.route";
import { LoginUserRoute } from "./routeAddapters/user/loginUser.route";
import { logOutRoute } from "./routeAddapters/user/logout.route";
import { rejectUserRoute } from "./routeAddapters/user/rejectUser.route";
import { viewDeliveriesRoute } from "./routeAddapters/delivery/viewDeliveries.route";
import { unassignItemsRoute } from "./routeAddapters/item/unassignItems.route";
import { deleteItemRoute } from "./routeAddapters/item/deleteItem.route";

export const appRouter = router({
  // User Routes
  requestUser: requestUserRoute,
  acceptUser: acceptUserRoute,
  rejectUser: rejectUserRoute,
  viewUsers: viewUsersRoute,
  viewUserProfile: viewUserProfileRoute,
  // User Routes -> Auth
  logIn: LoginUserRoute,
  logOut: logOutRoute,
  // Items Routes
  assignItems: assignItemsRoute,
  unassingItems: unassignItemsRoute,
  createItem: createItemRoute,
  deleteItem: deleteItemRoute,
  viewItems: viewItemsRoute,
  viewAssignedItems: viewAssignedItemsRoute,
  // Delivery Routes
  requestDelivery: requestDeliveryRoute,
  acceptDelivery: acceptDeliveryRoute,
  removeDelivery: removeDeliveryRoute,
  viewDeliveries: viewDeliveriesRoute,
  // Order Routes
  placeOrder: placeOrderRoute,
  updateOrderStatus: updateOrderStatusRoute,
  updateOrderEstimate: updateOrderEstimateRoute,
  acceptOrder: acceptOrderRoute,
  viewOrders: viewOrdersRoute,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
