import { router } from "./setup";
import * as orderRoutes from "./routes/order";
import * as userRoutes from "./routes/user";
import * as itemRoutes from "./routes/item";
import * as deliveryRoutes from "./routes/delivery";

export const appRouter = router({
  // User Routes
  signUp: userRoutes.signUp,
  logIn: userRoutes.login,
  logOut: userRoutes.logout,
  updateUserStatus: userRoutes.updateStatus,
  viewUsers: userRoutes.view,
  changePassword: userRoutes.changePassword,
  // Items Routes
  toggleAssignment: itemRoutes.toggleAssignment,
  createItem: itemRoutes.create,
  deleteItem: itemRoutes.deleteItem,
  viewItems: itemRoutes.view,
  // Delivery Routes
  requestDelivery: deliveryRoutes.request,
  updateDeliveryStatus: deliveryRoutes.updateStatus,
  viewDeliveries: deliveryRoutes.view,
  // Order Routes
  placeOrder: orderRoutes.placeOrder,
  updateOrderStatus: orderRoutes.updateStatus,
  updateOrderEstimate: orderRoutes.updateEstimate,
  viewOrders: orderRoutes.view,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
