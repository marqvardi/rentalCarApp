import _ from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Header, Image, List, Loader, Modal } from "semantic-ui-react";
import { deleteCar } from "../../firebase/carDataAccess/carDataAccess";
import ReadMore from "../readMore/readMore.component";
import "./listForCars.style.css";

const ListForCars = ({ cars, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteCar(selected.id));

      // dispatch(fetchCarsFromFirestore());
      toast.success("Car sucessfully deleted.");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderActions = (car) => {
    // console.log("actions", car);

    return (
      <div className="buttonDeleteModal">
        <Button
          content="Cancel"
          onClick={() => {
            setOpenModal(false);
            setSelected(null);
          }}
        />

        <Button negative content="Delete" onClick={() => handleDelete()} />
      </div>
    );
  };

  const renderContent = (car) => {
    return (
      <div>
        {!_.isEmpty(selected) && (
          <Modal.Content image>
            <Image
              size="medium"
              // src={selected.image.url}
              src={
                selected.image.url
                  ? selected.image.url
                  : process.env.PUBLIC_URL + "/assets/NoCar.jpg"
              }
              wrapped
            />
            <Modal.Description>
              <Header>{selected.carModel}</Header>
              <ReadMore>{selected.description}</ReadMore>
            </Modal.Description>
          </Modal.Content>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        border: "solid",
        borderRadius: "20px",
        padding: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>List of cars</h2>
      <div>
        {loading ? (
          <Loader active inline="centered" content="Fetching data....." />
        ) : (
          cars.map((car) => (
            <div key={car.id}>
              <List animated>
                <List.Item>
                  <div style={{ minHeight: "100px" }}>
                    <Image
                      size="tiny"
                      avatar
                      src={
                        car.image.url
                          ? car.image.url
                          : process.env.PUBLIC_URL + "/assets/NoCar.jpg"
                      }
                    />
                    {car.available ? "Available" : "Not available"}
                    <List.Content>
                      <List.Header>
                        {car.carModel} - {car.carMaker}
                      </List.Header>
                      <List.Description>
                        <ReadMore>{car.description}</ReadMore>
                      </List.Description>
                    </List.Content>
                  </div>
                  <div>
                    <Link to={`/editcar/${car.id}`}>
                      <Button primary content="Edit" circular floated="right" />
                    </Link>
                    {!car.available ? (
                      <Button
                        color="red"
                        content="Delete"
                        circular
                        floated="right"
                        disabled={true}
                      />
                    ) : (
                      <Modal
                        trigger={
                          <div key={car.id}>
                            <Button
                              color="red"
                              content="Delete"
                              circular
                              floated="right"
                              onClick={() => setSelected(car)}
                            />
                          </div>
                        }
                        header="Are you sure you want to delete this car?"
                        actions={renderActions}
                        content={renderContent}
                        open={openModal}
                        onOpen={() => setOpenModal(true)}
                        onClose={() => setOpenModal(false)}
                      />

                      // <Link to={`/deleteCar/${car.id}`}>
                      //   <Button
                      //     color="red"
                      //     content="Delete"
                      //     circular
                      //     floated="right"
                      //   />
                      // </Link>
                    )}
                  </div>
                </List.Item>
              </List>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListForCars;
