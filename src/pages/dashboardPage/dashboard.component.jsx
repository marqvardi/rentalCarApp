import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Revenue from "../../components/revenue/revenue.component";
import {
  computeProjectedSales,
  computeRevenue,
} from "../../redux/reducers/orderReducer/order.selector";
import {
  checkIfUserIsAdmin,
  getCurrentUser,
} from "../../redux/reducers/userReducer/user.selector";
import { FetchOrders } from "../../firebase/bookingsDataAccess/bookingsDataAccess";
import { orderActionTypes } from "../../redux/reducers/orderReducer/orderActionTypes";
import InfoCars from "../../components/carsInfo/carsInfo.component";

const DashboardPage = () => {
  const isAdmin = useSelector(checkIfUserIsAdmin);
  const currentUser = useSelector(getCurrentUser);
  const ProjectionRevenue = useSelector(computeProjectedSales);
  const revenue = useSelector(computeRevenue);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchOrders(currentUser, isAdmin));
    return () => {
      dispatch({ type: orderActionTypes.CLEAR_ORDERS });
    };
  }, [dispatch, currentUser, isAdmin]);

  return (
    <div>
      {" "}
      <div>
        <Revenue revenue={revenue} projectionRevenue={ProjectionRevenue} />
      </div>
      <div>
        <InfoCars />
      </div>
    </div>
  );
};

export default DashboardPage;
