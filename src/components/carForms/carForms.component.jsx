import _ from "lodash";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";
import history from "../../util/history";
import RenderInput from "../renderinput/renderInput.component";
import "./carForms.styles.css";

class CarForms extends React.Component {
  constructor(props) {
    super(props);

    if (!_.isEmpty(this.props.initialValues)) {
      this.state = {
        imageUrlFromInitialValues: this.props.initialValues.image,
      };
    }
  }

  onSubmit = async (formValues) => {
    if (_.isEmpty(this.props.initialValues)) {
      this.props.onSubmit(formValues, null);
    } else {
      this.props.onSubmit(formValues, this.state.imageUrlFromInitialValues);
    }
  };

  render() {
    const { valid } = this.props;
    return (
      <div>
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

          <Button type="button" color="blue" onClick={() => history.goBack()}>
            Go back
          </Button>
          <Button color="green" floated="right" disabled={!valid}>
            Submit
          </Button>
        </Form>
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
