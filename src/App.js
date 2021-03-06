import { Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import HeaderComponent from "./components/header/header.component";
import CarListing from "./pages/CarListing/carListing";
import CarRentingPage from "./pages/carRentingPage/carRentingPage";
import SignInOrRegisterPage from "./pages/signInOrRegister/signInOrRegisterPage";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActionTypes } from "./redux/reducers/userReducer/userActionTypes";
import history from "./util/history";
import CheckoutPage from "./pages/checkout/checkoutPage";

import "./App.css";
import SidebarComponent from "../src/components/sidebar/sidebar.component.jsx";
import { getCurrentUser } from "./redux/reducers/userReducer/user.selector";
import OrdersPage from "./pages/userOrders/OrdersPage";
import DashboardPage from "./pages/dashboardPage/dashboard.component";
import CarsAdminPage from "./pages/carsAdmin/carsAdminPage";
import { Container } from "semantic-ui-react";
import CreateCarsPage from "./pages/createCars/createCarsPage";
import DeleteCar from "./components/deleteCar/deleteCar.component";
import EditCarsPage from "./pages/editCars/editCarsPage";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    var unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snap) => {
          dispatch({
            type: userActionTypes.CURRENT_USER,
            payload: {
              id: snap.id,
              ...snap.data(),
            },
          });
        });
      } else {
        dispatch({ type: userActionTypes.SIGN_OUT_USER, payload: userAuth });
      }
    });

    return () => {
      dispatch({ type: userActionTypes.SIGN_OUT_USER, payload: null });
      unsubscribeFromAuth();
    };
  }, [dispatch]);

  return (
    <div>
      <Router history={history}>
        <div className="wrapper">
          <HeaderComponent />

          {currentUser && <SidebarComponent />}

          <div className="main-content">
            <Container>
              <Switch>
                <Route path="/" component={CarListing} exact />
                <Route path="/renting/:id" component={CarRentingPage} />
                <Route
                  path="/signInOrRegister"
                  component={SignInOrRegisterPage}
                />
                <Route path="/checkout" component={CheckoutPage} />
                <Route path="/Orders" component={OrdersPage} />
                <Route path="/Dashboard" component={DashboardPage} />
                <Route path="/CarsAdmin" component={CarsAdminPage} />
                <Route path="/CreateCars" component={CreateCarsPage} />
                <Route path="/EditCar/:id" component={EditCarsPage} />
                <Route path="/deleteCar/:id" component={DeleteCar} />
              </Switch>
            </Container>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
