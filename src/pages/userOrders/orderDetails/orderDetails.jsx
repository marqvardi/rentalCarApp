import React from "react";
import { Button, List, Modal } from "semantic-ui-react";

const OrdersDetails = ({
  car,
  days,
  dateReturn,
  datePickUp,
  total,
  onClick,
  orderId,
  active,
}) => {
  return (
    <div>
      <List>
        <List.Item>
          <List.Icon name="car" />
          <List.Content>
            Car picked up on{" "}
            {new Date(datePickUp.seconds * 1000).toDateString()}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="car" />
          <List.Content>
            Car returned on {new Date(dateReturn.seconds * 1000).toDateString()}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="calendar alternate outline" />
          <List.Content>Number of days: {days}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="dollar sign" />
          <List.Content>{total.toFixed(2)}</List.Content>
          {active ? (
            <Modal
              trigger={
                <Button color="orange" floated="right">
                  Return car
                </Button>
              }
              header="Attention!"
              content="Are you sure you want to return this car?"
              actions={[
                "Nope, not yet.",
                {
                  key: "done",
                  content: "Yes please!",
                  onClick: () => onClick(orderId, car.id),
                  positive: true,
                },
              ]}
            />
          ) : (
            ""
          )}
        </List.Item>
      </List>
    </div>
  );
};

export default OrdersDetails;
