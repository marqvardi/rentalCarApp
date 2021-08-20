import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { fetchCarToDelete } from "../../firebase/carDataAccess/carDataAccess";
import { carActionsType } from "../../redux/reducers/carsReducer/carActionTypes";
import { fetchCarToDeleteFromRedux } from "../../redux/reducers/carsReducer/cars.selector";

import ReadMore from "../readMore/readMore.component";

const DeleteCar = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  let car = useSelector(fetchCarToDeleteFromRedux);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarToDelete(id));
    setOpen(true);
    return () => {
      dispatch({ type: carActionsType.CLEAR_DELETE_CAR, payload: {} });
    };
  }, [dispatch, id]);

  const renderActions = () => {
    return (
      <React.Fragment>
        {/* <Button negative onClick={() => dispatch(deleteCar)} content="Delete" /> */}

        <Button content="Cancel" floated="right" />
        <Button negative content="Delete" floated="right" />
      </React.Fragment>
    );
  };

  const renderContent = () => {
    return (
      <div>
        <Modal.Content image>
          <Image size="medium" src={car.image.url} wrapped />
          <Modal.Description>
            <Header>{car.carModel}</Header>
            <ReadMore>{car.description}</ReadMore>
          </Modal.Description>
        </Modal.Content>
      </div>
    );
  };

  return (
    <div>
      {!_.isEmpty(car) && (
        // <CustomModal
        //   title="Delete car"
        //   actions={renderActions()}
        //   content={renderContent()}
        //   onDismiss={() => history.goBack()}
        // />

        <Modal
          actions={renderActions()}
          content={renderContent()}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default DeleteCar;
