import { createSelector } from "reselect";

export const Orders = (state) => state.orders;

export const getActiveOrdersForAdmin = createSelector(
  [Orders],
  (orders) => (orders.allActiveOrders ? orders.allActiveOrders : {})
  // .filter((order) => order.id === currentUser.id)
);

export const getCompletedOrdersForAdmin = createSelector(
  [Orders],
  (orders) => (orders.allCompletedOrders ? orders.allCompletedOrders : {})
  // .filter((order) => order.id === currentUser.id)
);

// return sales projection  (bookings still marked as active)
export const computeProjectedSales = createSelector(
  [getActiveOrdersForAdmin],
  (orders) =>
    Array.from(orders).reduce((sum, order) => sum + order.orderItem.total, 0)
);

// return sales already completed  (bookings marked as completed)
export const computeRevenue = createSelector(
  [getCompletedOrdersForAdmin],
  (orders) =>
    Array.from(orders).reduce((sum, order) => sum + order.orderItem.total, 0)
);
