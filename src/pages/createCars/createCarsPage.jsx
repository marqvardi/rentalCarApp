import React from "react";
import { useState } from "react";
import CreateCars from "../../components/createCars.component.jsx/createCar.component";
import DropZoneImage from "../../components/dropZone/dropzoneImage.component";
import "./createCarPage.styles.css";

const CreateCarsPage = () => {
  const [imageState, setImageState] = useState();

  return (
    <div>
      {/* <h2>Create a new car</h2>
      <div className="createCarPage-main">
        <div className="left-content"> */}
      <CreateCars />
      {/* </div>
        <div className="left-content">
          <DropZoneImage stateChanger={handleImageUpload} />
        </div>
      </div> */}
    </div>
  );
};

export default CreateCarsPage;
