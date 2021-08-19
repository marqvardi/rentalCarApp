import _ from "lodash";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";
import { addCarToFirestore } from "../../firebase/carDataAccess/carDataAccess";
import history from "../../util/history";
import DropZoneImage from "../dropZone/dropzoneImage.component";
import RenderInput from "../renderinput/renderInput.component";
import "./carForms.styles.css";

class CarForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageupload: "" };
  }

  onSubmit = async (formValues) => {
    formValues.image = this.state.imageupload;
    // console.log("seria submitted to firestore", formValues);
    addCarToFirestore(formValues);
  };

  handleImageUpload = (image) => {
    this.setState({ imageupload: image });
    if (_.isEmpty(image)) return;
  };

  render() {
    const { valid } = this.props;
    //console.log(this.props);

    return (
      <div>
        <h2>Create a new car</h2>
        <div className="createCarMain">
          <div className="left-content">
            <Form
              className="ui form"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="carModel"
                component={RenderInput}
                label="Enter a model"
                type="text"
              />
              <Field
                name="carMaker"
                component={RenderInput}
                label="Enter a maker"
                type="text"
              />
              <Field
                name="description"
                component={RenderInput}
                label="Enter a description"
                type="text"
              />
              <Field
                name="year"
                component={RenderInput}
                label="Enter a year"
                type="number"
              />
              <Field
                name="price"
                component={RenderInput}
                label="Enter the price per day"
                type="number"
              />
              <Button
                type="button"
                color="blue"
                onClick={() => history.goBack()}
              >
                Go back
              </Button>
              <Button color="green" floated="right" disabled={!valid}>
                Submit
              </Button>
            </Form>
          </div>
          <div className="right-content">
            <DropZoneImage
              stateChanger={this.handleImageUpload}
              image={
                this.props.initialValues
                  ? this.props.initialValues.image.url
                  : null
              }
              modeEdit={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.carModel) {
    errors.carModel = "You must enter a model";
  }

  if (!formValues.carMaker) {
    errors.carMaker = "You must enter a maker";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  if (!formValues.price) {
    errors.price = "You must enter a price";
  }

  if (formValues.price <= 0) {
    errors.price = "Price can not be zero nor negative";
  }

  if (_.isEmpty(formValues.year)) {
    errors.year = "You must enter a year";
  }

  if (formValues.year > new Date().getFullYear()) {
    errors.year = "Year is incorrect";
  }

  return errors;
};

export default reduxForm({
  form: "createCars",
  validate: validate,
})(CarForms);