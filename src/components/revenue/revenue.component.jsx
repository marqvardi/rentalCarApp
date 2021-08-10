import React from "react";
import { Icon, Statistic } from "semantic-ui-react";
import "./revenue.styles.css";

const Revenue = ({ revenue, projectionRevenue }) => {
  return (
    <Statistic.Group widths="two">
      <Statistic>
        <Statistic.Value>
          <Icon name="chart line" />{" "}
          {projectionRevenue.toFixed(2).toLocaleString()}
        </Statistic.Value>
        <Statistic.Label>Amount due</Statistic.Label>
      </Statistic>

      <Statistic>
        <Statistic.Value>
          <Icon name="money" /> {revenue.toFixed(2)}
        </Statistic.Value>
        <Statistic.Label>Revenue so far</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  );
};

export default Revenue;
