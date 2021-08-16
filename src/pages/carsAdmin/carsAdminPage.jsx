import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import InfoCars from "../../components/carsInfo/carsInfo.component";
import ListForCars from "../../components/ListForCars/listForCars.components";
import { fetchCarsFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import { getCars } from "../../redux/reducers/carsReducer/cars.selector";
import history from "../../util/history";
import "./carsAdminPage.style.css";

const CarsAdminPage = () => {
  const dispatch = useDispatch();
  const allCars = useSelector(getCars);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCarsFromFirestore());
    setLoading(false);
  }, [dispatch]);

  const totalCars = _.size(allCars);

  const available = Array.from(allCars).filter(
    (car) => car.available === true
  ).length;
  const notAvailable = Array.from(allCars).filter(
    (car) => car.available === false
  ).length;

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

      <ListForCars cars={allCars} loading={loading} />
    </div>
  );
};

export default CarsAdminPage;
