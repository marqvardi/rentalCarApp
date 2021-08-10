import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Statistic } from "semantic-ui-react";
import { fetchCarsFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import { getCars } from "../../redux/reducers/carsReducer/cars.selector";

const InfoCars = () => {
  const allCars = useSelector(getCars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarsFromFirestore());
  }, [dispatch]);

  const totalCars = Array.from(allCars).length;
  const available = Array.from(allCars).filter(
    (car) => car.available === true
  ).length;
  const notAvailable = Array.from(allCars).filter(
    (car) => car.available === false
  ).length;

  return (
    <div style={{ marginTop: "40px", border: "solid", borderRadius: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
        Information about cars
      </h2>
      <Statistic.Group widths="three">
        <Statistic>
          <Statistic.Value>
            <Icon name="car" />
            {totalCars}
          </Statistic.Value>
          <Statistic.Label>Fleet</Statistic.Label>
        </Statistic>

        <Statistic color="green">
          <Statistic.Value>
            <Icon name="car" />
            {available}
          </Statistic.Value>
          <Statistic.Label>Available</Statistic.Label>
        </Statistic>

        <Statistic color="red">
          <Statistic.Value>
            <Icon name="car" />
            {notAvailable}
          </Statistic.Value>
          <Statistic.Label>Not available</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </div>
  );
};

export default InfoCars;
