import React from "react";
import "./carsCard.styles.css";
import { Card, Icon, Image, Loader } from "semantic-ui-react";
import ReadMore from "../readMore/readMore.component";

const CarsCard = ({ car, color, loading }) => {
  const { carMaker, carModel, year, price, available, image, description } =
    car;

  return (
    <div>
      {loading ? (
        <Loader active inline="centered" content="Fetching info" />
      ) : (
        <Card color={color} raised>
          {available && car ? (
            <Image
              src={
                image.url
                  ? image.url
                  : process.env.PUBLIC_URL + "/assets/NoCar.jpg"
              }
              className="imageCard"
            />
          ) : (
            <div style={{ position: "relative" }}>
              {/* <Image src={"https://www.carimagery.com/img/v2/12780.jpg"} /> */}
              <Image
                src={
                  image.url
                    ? image.url
                    : process.env.PUBLIC_URL + "/assets/NoCar.jpg"
                }
                className="imageCard"
              />

              <div className="carNotAvailable">Not available</div>
            </div>
          )}
          <Card.Content>
            <Card.Header>{carModel}</Card.Header>
            <Card.Meta>{carMaker}</Card.Meta>
            <Card.Description className="cardDescription">
              <ReadMore>{description}</ReadMore>
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <div className="dollarPrice">
              <span>
                <Icon name="calendar times" bordered color="blue" />
                {year}
              </span>

              <span>
                <Icon name="dollar sign" bordered color="green" />
                {price} per day
              </span>
            </div>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default CarsCard;
