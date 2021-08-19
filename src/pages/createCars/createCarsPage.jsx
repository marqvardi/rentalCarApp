import _ from "lodash";
import React, { useState } from "react";
import CarForms from "../../components/carForms/carForms.component";
import DropZoneImage from "../../components/dropZone/dropzoneImage.component";
import { addCarToFirestore } from "../../firebase/carDataAccess/carDataAccess";
import "./createCarPage.styles.css";

const CreateCarsPage = () => {
  const onSubmit = async (formValues) => {
    // console.log(formValues);
    formValues.image = this.state.imageupload;

    addCarToFirestore(formValues);
  };

  const handleImageUpload = (image) => {
    this.setState({ imageupload: image });

    console.log("Image from child page", image);

    if (_.isEmpty(image)) return;
  };

  return (
    <div className="createCarsMain">
      <div className="createCars-leftContent">
        <CarForms onSubmit={onSubmit} handleImageUpload={handleImageUpload} />
      </div>
      <div className="createCars-rightContent">{/* <DropZoneImage /> */}</div>
    </div>
  );
};

export default CreateCarsPage;
