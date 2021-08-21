import React from "react";
import { Icon, Statistic } from "semantic-ui-react";
import "./revenue.styles.css";

const Revenue = ({ revenue, projectionRevenue }) => {
  return (
    <div style={{ marginTop: "50px", border: "solid", borderRadius: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "50px" }}>Revenue</h2>
      <Statistic.Group widths="two">
        <Statistic>
          <Statistic.Value>
            <Icon name="chart line" />{" "}
            {projectionRevenue.toLocaleString("de-DE", {
              style: "currency",
              currency: "GBP",
            })}
          </Statistic.Value>
          <Statistic.Label>Still to receive</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value>
            <Icon name="money" />{" "}
            {revenue.toLocaleString("de-DE", {
              style: "currency",
              currency: "GBP",
            })}
          </Statistic.Value>
          <Statistic.Label>Revenue so far</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </div>
  );
};

export default Revenue;
