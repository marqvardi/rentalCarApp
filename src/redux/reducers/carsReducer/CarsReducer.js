import { carActionsType } from "./carActionTypes";

const INITIAL_STATE = {
  allCars: [],
  car: {},
  carToDelete: {},
};

const carsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case carActionsType.GET_ALL_CARS:
      return {
        ...state,
        allCars: payload,
      };
    case carActionsType.FETCH_SINGLE_CAR:
      return {
        ...state,
        car: payload,
      };
    case carActionsType.RETURN_CAR:
      return {
        ...state,
        car: { ...state.car, available: false },
      };
    case carActionsType.CLEAR_CAR:
      return {
        ...state,
        car: {},
      };
    case carActionsType.DELETE_CAR:
      return {
        ...state,
        carToDelete: payload,
      };

    case carActionsType.CLEAR_DELETE_CAR:
      return {
        ...state,
        carToDelete: payload,
      };

    default:
      return state;
  }
};

export default carsReducer;

export const clearFetchCar = () => async (dispatch) => {
  await dispatch({ type: carActionsType.FETCH_SINGLE_CAR, payload: {} });
};
