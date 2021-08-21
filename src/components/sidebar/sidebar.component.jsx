import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import { checkIfUserIsAdmin } from "../../redux/reducers/userReducer/user.selector";
import "./sidebar.style.css";

const SidebarComponent = () => {
  const isAdmin = useSelector(checkIfUserIsAdmin);

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
      className="menustyle"
    >
      {!isAdmin && (
        <Menu.Item as={Link} name="home" to="/" className="itemMenu">
          <Icon name="home" />
          Home
        </Menu.Item>
      )}

      {!isAdmin && (
        <Menu.Item as={Link} name="Orders" to="/Orders">
          <Icon name="clipboard list" />
          My orders
        </Menu.Item>
      )}

      {isAdmin && (
        <Menu.Item
          as={Link}
          name="Dashboard"
          to="/Dashboard"
          className="itemMenu"
        >
          <Icon name="dashboard" />
          Dashboard
        </Menu.Item>
      )}

      {isAdmin && (
        <Menu.Item as={Link} name="Cars" to="/CarsAdmin">
          <Icon name="car" />
          Cars
        </Menu.Item>
      )}
    </Sidebar>
  );
};

export default SidebarComponent;
