import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CarForms from "../../components/carForms/carForms.component";
import { fetchSingleCarFromFirestore } from "../../firebase/carDataAccess/carDataAccess";
import { carActionsType } from "../../redux/reducers/carsReducer/carActionTypes";
import { fetchSingleCar } from "../../redux/reducers/carsReducer/cars.selector";
import "./editCar.style.css";

const EditCarsPage = (props) => {
  // console.log(props);
  const { id } = useParams();
  const [imageupload, setimageupload] = useState("");
  const dispatch = useDispatch();
  const car = useSelector(fetchSingleCar);
  // console.log(car);

  useEffect(() => {
    dispatch(fetchSingleCarFromFirestore(id));
    return () => {
      dispatch({ type: carActionsType.CLEAR_CAR, payload: {} });
    };
  }, []);

  // const onSubmit = async (formValues) => {
  //   // formValues.image = this.state.imageupload;
  //   setimageupload(formValues.image);
  //   console.log(formValues);
  //   // console.log(formValues);
  //   //  addCarToFirestore(formValues);
  // };

  // const handleImageUpload = (image) => {
  //   // this.setState({ imageupload: image });
  //   setimageupload(image);
  //   // setImageState(image);
  //   console.log("Image from child page", image);

  //   if (_.isEmpty(image)) return;
  // };

  // if (props.match.path.includes("EditCar")) console.log("It has edit car");

  return (
    <div>
      {!_.isEmpty(car) && (
        <CarForms
          // setimageupload={setimageupload}
          // onSubmit={onSubmit}
          // handleImageUpload={handleImageUpload}
          initialValues={car}
        />
      )}
    </div>
  );
};

export default EditCarsPage;
