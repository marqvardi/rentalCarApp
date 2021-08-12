import React from "react";
import { Icon, Loader, Statistic } from "semantic-ui-react";

const InfoCars = ({ totalCars, available, notAvailable, loading }) => {
  return (
    <div style={{ marginTop: "50px", border: "solid", borderRadius: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
        Information about cars
      </h2>
      <div>
        {loading ? (
          <Loader active inline="centered" content="Fetching info" />
        ) : (
          <Statistic.Group widths="three">
            <Statistic>
              <Statistic.Value>
                <Icon name="car" />
                {totalCars}
              </Statistic.Value>
              <Statistic.Label>Fleet</Statistic.Label>
            </Statistic>

            <Statistic color="green">
              <Statistic.Value>
                <Icon name="car" />
                {available}
              </Statistic.Value>
              <Statistic.Label>Available</Statistic.Label>
            </Statistic>

            <Statistic color="red">
              <Statistic.Value>
                <Icon name="car" />
                {notAvailable}
              </Statistic.Value>
              <Statistic.Label>Not available</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        )}
      </div>
    </div>
  );
};

export default InfoCars;
