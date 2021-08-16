import React from "react";
import { Button, Image, List, Loader } from "semantic-ui-react";
import ReadMore from "../readMore/readMore.component";

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
          <div key={car.id}>
            <List animated>
              <List.Item>
                <div style={{ minHeight: "100px" }}>
                  <Image size="tiny" avatar src={car.image.url} />
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
                  <Button primary content="Edit" circular floated="right" />
                  <Button
                    color="red"
                    content="Delete"
                    circular
                    floated="right"
                  />
                </div>
              </List.Item>
            </List>
          </div>
        ))
      )}
    </div>
  </div>
);

export default ListForCars;
