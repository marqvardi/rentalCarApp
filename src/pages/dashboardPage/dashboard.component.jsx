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
import {
  getFleetTotal,
  getTotalCarsAvailable,
  getTotalCarsNotAvailable,
} from "../../redux/reducers/carsReducer/cars.selector";
import { fetchCarsFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import { Container } from "semantic-ui-react";

const DashboardPage = () => {
  const isAdmin = useSelector(checkIfUserIsAdmin);
  const currentUser = useSelector(getCurrentUser);
  const ProjectionRevenue = useSelector(computeProjectedSales);
  const revenue = useSelector(computeRevenue);
  const totalCars = useSelector(getFleetTotal);
  const available = useSelector(getTotalCarsAvailable);
  const notAvailable = useSelector(getTotalCarsNotAvailable);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchOrders(currentUser, isAdmin));
    dispatch(fetchCarsFromFirestore());

    setLoading(false);

    return () => {
      dispatch({ type: orderActionTypes.CLEAR_ORDERS });
    };
  }, [dispatch, currentUser, isAdmin]);

  return (
    <Container>
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
    </Container>
  );
};

export default DashboardPage;
