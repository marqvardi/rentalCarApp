import React from "react";
import { Button, Image, List, Loader } from "semantic-ui-react";

const ListForCars = ({ cars, loading }) => (
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
          <List animated key={car.id}>
            <List.Item>
              <Image
                size="tiny"
                avatar
                src="https://www.carimagery.com/img/v2/12780.jpg"
              />

              <List.Content>
                <List.Header as="a">
                  {car.carModel} - {car.carMaker}
                </List.Header>
                <List.Description>
                  lorem dwadawd dwa daw d wad awd awd ad daw{" "}
                </List.Description>
              </List.Content>
              <Button primary content="Edit" circular floated="right" />
              <Button color="red" content="Delete" circular floated="right" />
            </List.Item>
          </List>
        ))
      )}
    </div>
  </div>
);

export default ListForCars;
