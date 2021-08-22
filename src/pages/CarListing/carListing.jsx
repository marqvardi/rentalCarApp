import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carActionsType } from "../../redux/reducers/carsReducer/carActionTypes";
import { Button, Container, Grid, Loader } from "semantic-ui-react";
import "./carListing.styles.css";

import CarsCard from "../../components/carsCard/carsCard";
import { Link } from "react-router-dom";
import { getBasket } from "../../redux/reducers/checkoutReducer/checkout.selector";
import { getCars } from "../../redux/reducers/carsReducer/cars.selector";
import {
  // checkIfUserIsAdmin,
  getCurrentUser,
} from "../../redux/reducers/userReducer/user.selector";
import { fetchCarsFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import _ from "lodash";
// import history from "../../util/history";

const CarListing = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const BasketHasItem = useSelector(getBasket);
  const auth = useSelector(getCurrentUser);
  const cars = useSelector(getCars);
  const ArrayCars = _.orderBy(cars, ["available"], ["desc"]);
  // const isAdmin = useSelector(checkIfUserIsAdmin);

  useEffect(() => {
    dispatch(fetchCarsFromFirestore());
    setLoading(false);

    return () => {
      dispatch({ type: carActionsType.GET_ALL_CARS, payload: {} });
    };
  }, [dispatch, auth]);

  const renderGrid = (cars) => {
    return (
      <Container>
        <div>
          {BasketHasItem && (
            <Link to="/checkout">
              <Button
                color="yellow"
                content="Finish your booking here"
                floated="right"
                style={{
                  marginBottom: "15px",
                  color: "black",
                  marginTop: "30px",
                }}
              />
            </Link>
          )}
          <Grid stackable columns={4} celled>
            <Grid.Row>
              {ArrayCars &&
                cars.map((car) => (
                  <Grid.Column key={car.id}>
                    {car.available ? (
                      <div>
                        <CarsCard car={car} color="green" loading={loading} />
                        <Link to={`/renting/${car.id}`}>
                          <br />
                          <Button color="green" content="Rent this car" fluid />
                        </Link>
                      </div>
                    ) : (
                      <div className="notAvailable">
                        <CarsCard car={car} color="red" loading={loading} />
                      </div>
                    )}
                  </Grid.Column>
                ))}
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    );
  };

  return (
    <>
      {loading ? (
        <Loader active content="Loading data, slow on purpose" size="medium" />
      ) : (
        renderGrid(ArrayCars)
      )}
    </>
  );
};

export default CarListing;
