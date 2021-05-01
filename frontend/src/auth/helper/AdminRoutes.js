import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";
import { connect } from "react-redux";
import propTypes from "prop-types";

const AdminRoutes = ({ component: Component, userState, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && userState[0] === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
// redux config
const mapStateToProps = (state) => ({
  userState: state.user,
});
AdminRoutes.propTypes = {
  userState: propTypes.array.isRequired,
};

export default connect(mapStateToProps, null)(AdminRoutes);
