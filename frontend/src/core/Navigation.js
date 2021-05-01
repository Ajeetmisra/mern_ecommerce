import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { isAdmin } from "../admin/helper/adminapicall";
import { isAuthenticated, signout } from "../auth/helper";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { API } from "../backend";
import { removeUserRole } from "../action/user";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#d1d1d1",
    };
  }
  return {
    color: "#ffffff",
  };
};

const Navigation = ({ history, userState, removeUserRole }) => {
  console.log("isAdmin Role", userState[0]);
  return (
    <Navbar className="bg-dark" bg="light" expand="lg">
      <Navbar.Brand className="text-white">E-Commerce Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="text-white">
            <Link
              style={currentTab(history, "/")}
              className="nav-link text-white"
              to="/"
            >
              Home
            </Link>
          </Nav.Link>
          <Nav.Link className="text-white">
            <span
              style={currentTab(history, "/cart")}
              className="nav-link"
              onClick={() => {
                console.log("isAdmin Role", userState);

                // console.log("token", isAuthenticated().token);
              }}
            >
              cart
            </span>
          </Nav.Link>
          <Nav.Link className="text-white">
            {isAuthenticated() && userState[0] === 0 && (
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/user/dashboard"
              >
                UserDashboard
              </Link>
            )}
          </Nav.Link>
          <Nav.Link className="text-white">
            {isAuthenticated() && userState[0] === 1 && (
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/admin/dashboard"
              >
                A.Dashboard
              </Link>
            )}
          </Nav.Link>
          <Nav.Link className="text-white">
            {!isAuthenticated() && (
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/signup"
              >
                SignUp
              </Link>
            )}
          </Nav.Link>
          <Nav.Link className="text-white">
            {!isAuthenticated() && (
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/signin"
              >
                SignIn
              </Link>
            )}
          </Nav.Link>
          <Nav.Link className="text-white">
            {isAuthenticated() && (
              <span
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                    removeUserRole(0);
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
// redux config
const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProp = {
  removeUserRole: (data) => removeUserRole(data),
};

Navigation.propTypes = {
  userState: propTypes.array.isRequired,
  removeUserRole: propTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(withRouter(Navigation));

// export default withRouter(Navigation);
