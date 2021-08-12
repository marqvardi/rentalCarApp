import React, { useEffect, useState } from "react";
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
import { getCars } from "../../redux/reducers/carsReducer/cars.selector";
import { fetchCarsFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import _ from "lodash";

const DashboardPage = () => {
  const isAdmin = useSelector(checkIfUserIsAdmin);
  const currentUser = useSelector(getCurrentUser);
  const ProjectionRevenue = useSelector(computeProjectedSales);
  const revenue = useSelector(computeRevenue);
  const allCars = useSelector(getCars);
  const totalCars = _.size(allCars);

  const available = Array.from(allCars).filter(
    (car) => car.available === true
  ).length;
  const notAvailable = Array.from(allCars).filter(
    (car) => car.available === false
  ).length;
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchOrders(currentUser, isAdmin));
    dispatch(fetchCarsFromFirestore());
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      dispatch({ type: orderActionTypes.CLEAR_ORDERS });
    };
  }, [dispatch, currentUser, isAdmin]);

  return (
    <div style={{ maxWidth: "700px" }}>
      {" "}
      <div>
        <Revenue revenue={revenue} projectionRevenue={ProjectionRevenue} />
      </div>
      <div>
        <InfoCars
          loading={loading}
          totalCars={totalCars}
          available={available}
          notAvailable={notAvailable}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
