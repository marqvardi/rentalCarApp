import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CarsCard from "../../components/carsCard/carsCard";
import { Button, Container, Form, Loader, Modal } from "semantic-ui-react";
import { DateTimePicker, DropdownList } from "react-widgets";
import { Field, reduxForm } from "redux-form";
import { TimeList } from "../../util/timeList";
import { checkoutActionTypes } from "../../redux/reducers/checkoutReducer/checkoutActionTypes";
import "./carRentingPage.styles.css";
import history from "../../util/history";
import { countDays } from "../../util/countDays";
import { fetchSingleCar } from "../../redux/reducers/carsReducer/cars.selector";
import { checkIfUserIsSignerIn } from "../../redux/reducers/userReducer/user.selector";
import { fetchSingleCarFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import { clearFetchCar } from "../../redux/reducers/carsReducer/CarsReducer";
import _ from "lodash";
import { carActionsType } from "../../redux/reducers/carsReducer/carActionTypes";

const CarRentingPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isSignedIn = useSelector(checkIfUserIsSignerIn);
  const [loading, setLoading] = useState(true);
  const car = useSelector(fetchSingleCar);

  useEffect(() => {
    dispatch(fetchSingleCarFromFirestore(id));
    // console.log(car);
    setLoading(false);
    return () => {
      dispatch({ type: carActionsType.CLEAR_CAR, payload: {} });
    };
  }, [dispatch, id]);

  let date = new Date();
  // console.log(car);

  const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => {
    return (
      <div>
        <DateTimePicker
          onChange={onChange}
          format="DD MMM YYYY"
          time={showTime}
          value={!value ? null : new Date(value)}
          min={date}
        />
      </div>
    );
  };

  const renderDropDownList = ({
    input: { onChange, value },
    meta: { error, touched },
  }) => (
    <div>
      <DropdownList
        onChange={onChange}
        value={!value ? null : value}
        data={TimeList}
        textField="time"
      />
      <div style={{ color: "red" }}>{touched ? error : ""}</div>
    </div>
  );

  const onSubmit = async (values) => {
    const days = countDays(values);

    const bookingDetails = {
      car: car,
      datePickUp: values.datePickUp,
      dateReturn: values.dateReturn,
      days: days,
      timeForPickUp: values.timeForPickUp.value,
    };

    // console.log(bookingDetails);
    props.dispatch({
      type: checkoutActionTypes.SET_CHECKOUT_DETAILS_FOR_BOOKING,
      payload: bookingDetails,
    });

    if (isSignedIn) {
      history.push("/checkout");
    } else {
      // console.log("tentando mostrar modal");
      //show modal and redirect to login page
    }
  };

  const handleGoBack = () => {
    dispatch(clearFetchCar());
    history.goBack();
    // history.push("/");
  };

  const { valid } = props;

  const renderForm = () => (
    <Form onSubmit={props.handleSubmit(onSubmit)} className="ui form formStyle">
      <h2>Booking details</h2>
      <Form.Field>
        <label>Date to pick up your car</label>
        <Field
          name="datePickUp"
          component={renderDateTimePicker}
          label="Enter a pickup date"
          showTime="false"
          autocomplete="new-password"
          style={{ marginBottom: "30px" }}
        />
      </Form.Field>

      <Form.Field>
        <label>Date to return your car</label>
        <Field
          required
          name="dateReturn"
          component={renderDateTimePicker}
          label="Enter a pickup date"
          showTime="false"
          autocomplete="new-password"
          style={{ marginBottom: "30px" }}
        />
      </Form.Field>
      <Form.Field>
        <label>Time to pick up your car</label>
        <Field
          required
          name="timeForPickUp"
          component={renderDropDownList}
          className="w-2/5 mt-0"
        />
      </Form.Field>
      <Button content="Go back" onClick={handleGoBack} color="teal" />
      <Modal
        trigger={
          <Button primary disabled={!valid}>
            Go to checkout
          </Button>
        }
        header="Redirecting you"
        content="You need be logged in to book the car"
        actions={[{ key: "OK", content: "Yes, please", positive: true }]}
        onActionClick={handleRedirect}
      ></Modal>
    </Form>
  );

  const handleRedirect = () => {
    history.push("/Signinorregister");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {!_.isEmpty(car) && !loading ? (
        <Container>
          <div className="box">
            <CarsCard car={car} loading={loading} color="green" />

            {renderForm()}
          </div>
        </Container>
      ) : (
        <Loader active inline="centered" content="Fetching info" />
      )}
    </div>
  );
};

const validate = (formValues, props) => {
  // console.log("props propds", props);
  const errors = {};

  // if (countDays(formValues) <= 0) {
  //   errors.dateReturn = "Return date should be after picking up the car";
  // }

  if (!formValues.datePickUp) {
    errors.datePickUp = "You must enter a date to pick up the car";
  }

  if (!formValues.dateReturn) {
    errors.datePickUp = "You must enter a date to pick up the car";
  }

  if (!formValues.timeForPickUp) {
    errors.datePickUp = "You must enter a date to pick up the car";
  }

  return errors;
};

export default reduxForm({
  form: "bookingDetails",
  validate: validate,
})(CarRentingPage);
