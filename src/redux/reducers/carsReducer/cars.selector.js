import _ from "lodash";
import { createSelector } from "reselect";

const cars = (state) => state.cars;

export const getCars = createSelector([cars], (car) => car.allCars);

export const fetchSingleCar = createSelector([cars], (cars) => cars.car);
export const fetchCarToDeleteFromRedux = createSelector(
  [cars],
  (cars) => cars.carToDelete
);

export const getFleetTotal = createSelector([getCars], (cars) => {
  return _.size(cars);
});

export const getTotalCarsAvailable = createSelector([getCars], (cars) => {
  return _.size(Array.from(cars).filter((car) => car.available === true));
});

export const getTotalCarsNotAvailable = createSelector([getCars], (cars) => {
  return _.size(Array.from(cars).filter((car) => car.available === false));
});
