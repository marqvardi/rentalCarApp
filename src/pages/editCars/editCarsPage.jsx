import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CarForms from "../../components/carForms/carForms.component";
import DropZoneImage from "../../components/dropZone/dropzoneImage.component";
import {
  fetchSingleCarFromFirestore,
  updateCarDetails,
} from "../../firebase/carDataAccess/carDataAccess";
import { carActionsType } from "../../redux/reducers/carsReducer/carActionTypes";
import { fetchSingleCar } from "../../redux/reducers/carsReducer/cars.selector";
import history from "../../util/history";
import "./editCar.style.css";

const EditCarsPage = (props) => {
  // console.log(props);
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(fetchSingleCar);
  const [imageupload, setimageupload] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleCarFromFirestore(id));
    return () => {
      dispatch({ type: carActionsType.CLEAR_CAR, payload: {} });
    };
  }, [dispatch, id]);

  const onSubmit = async (formValues, imageURL) => {
    if (_.isEmpty(imageupload)) {
      formValues.image = imageURL;
    } else {
      formValues.image = imageupload;
    }
    dispatch(updateCarDetails(formValues));
    history.push("/CarsAdmin");
    toast.success("Card successfully edited.");
  };

  const handleImageUpload = (imageData) => {
    console.log(car);
    console.log(imageData);
    if (_.isEmpty(imageData)) return;
    setimageupload(_.pick(imageData, ["public_id", "url"]));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Edit the car</h2>
      <div className="editCarMain">
        <div className="editCar-leftContent">
          {!_.isEmpty(car) && (
            <CarForms onSubmit={onSubmit} initialValues={car} />
          )}
        </div>
        <div className="editCar-rightContent">
          {!_.isEmpty(car) && (
            <DropZoneImage
              image={car.image.url}
              modeEdit={true}
              setimageupload={setimageupload}
              handleImageUpload={handleImageUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCarsPage;
