import _ from "lodash";
import React, { useState } from "react";
import CarForms from "../../components/carForms/carForms.component";
import DropZoneImage from "../../components/dropZone/dropzoneImage.component";
import { addCarToFirestore } from "../../firebase/carDataAccess/carDataAccess";
import "./createCarPage.styles.css";

const CreateCarsPage = (props) => {
  const [imageupload, setimageupload] = useState("");
  const onSubmit = async (formValues) => {
    formValues.image = _.pick(imageupload, ["public_id", "url"]);
    // console.log(formValues);
    addCarToFirestore(formValues);
  };

  const handleImageUpload = (image) => {
    setimageupload(image);
    if (_.isEmpty(image)) return;
  };

  return (
    <div>
      <h2 className="createCarsText">Create a new car</h2>
      <div className="createCarsMain">
        <div className="createCars-leftContent">
          <CarForms onSubmit={onSubmit} />
        </div>
        <div className="createCars-rightContent">
          <DropZoneImage
            stateChanger={handleImageUpload}
            handleImageUpload={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCarsPage;
