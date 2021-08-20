import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CLOUDINARY_PRESET,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
} from "../../keys";
import "./dropzoneImage.styles.css";
import { Image } from "semantic-ui-react";
import _ from "lodash";

const DropZoneImage = ({ image, modeEdit, handleImageUpload }) => {
  const [uploadFile, setUploadFile] = useState("");
  const [uploadForEdit, setUploadForEdit] = useState(image);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // console.log(acceptedFiles);
      const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
      acceptedFiles.forEach(async (acceptedFiles) => {
        const formData = new FormData();
        formData.append("file", acceptedFiles);
        formData.append("upload_preset", CLOUDINARY_PRESET);

        const response = await fetch(url, {
          method: "post",
          body: formData,
        });
        const data = await response.json();
        // console.log(data);

        setUploadFile(data.url);
        if (modeEdit) {
          setUploadForEdit(data.url);
          console.log(data);
        }

        handleImageUpload(data);

        if (_.isEmpty(image)) return;
      });
    },
    [handleImageUpload, image, modeEdit]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",

    multiple: false,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`${isDragActive ? "DropZoneActive" : "dropzoneImage"}`}
      >
        <input {...getInputProps()} />
        Drop image here
      </div>

      <div>
        {modeEdit ? (
          <Image
            className="imageForCreatingCar"
            src={
              uploadForEdit
                ? uploadForEdit
                : process.env.PUBLIC_URL + "/assets/nocar.jpg"
            }
          />
        ) : (
          <Image
            className="imageForCreatingCar"
            src={
              uploadFile
                ? uploadFile
                : process.env.PUBLIC_URL + "/assets/nocar.jpg"
            }
          />
        )}
      </div>
    </>
  );
};

export default DropZoneImage;
