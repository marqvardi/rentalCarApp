import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import InfoCars from "../../components/carsInfo/carsInfo.component";
import ListForCars from "../../components/ListForCars/listForCars.components";
import { fetchCarsFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import {
  getCars,
  getFleetTotal,
  getTotalCarsAvailable,
  getTotalCarsNotAvailable,
} from "../../redux/reducers/carsReducer/cars.selector";
import history from "../../util/history";
import "./carsAdminPage.style.css";

const CarsAdminPage = () => {
  const dispatch = useDispatch();
  const allCars = useSelector(getCars);
  const totalCars = useSelector(getFleetTotal);
  const available = useSelector(getTotalCarsAvailable);
  const notAvailable = useSelector(getTotalCarsNotAvailable);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCarsFromFirestore());
    setLoading(false);
  }, [dispatch]);

  return (
    <div>
      <Button
        color="green"
        content="Create a new car"
        floated="right"
        onClick={() => history.push("createCars")}
      />
      <br />
      <InfoCars
        loading={loading}
        totalCars={totalCars}
        available={available}
        notAvailable={notAvailable}
      />
      <br />

      <ListForCars
        cars={Array.from(_.orderBy(allCars, "available", ["desc"]))}
        loading={loading}
      />
    </div>
  );
};

export default CarsAdminPage;
