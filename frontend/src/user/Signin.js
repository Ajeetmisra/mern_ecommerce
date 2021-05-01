import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
import propTypes from "prop-types";
import { addUserRole, removeUserRole } from "../action/user";
import { connect } from "react-redux";

const Signin = ({ addUserRole, removeUserRole }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const [userRole, setUserRole] = useState(0);
  const { email, password, error, loading, didRedirect } = values;
  // const { user } = isAuthenticated();

  const handleEmailChange = (event) => {
    setValues({ ...values, email: event.target.value, error: false });
  };
  const handlePasswordChange = (event) => {
    setValues({ ...values, password: event.target.value, error: false });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: true, loading: false });
        } else {
          setUserRole(data.user.role);
          addUserRole(data.user.role); // redux
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true, loading: false });
          });
        }
      })
      .catch((err) => {
        console.log("signin request failed");
      });
  };
  const performRedirect = () => {
    if (didRedirect) {
      // redirecting user to admin page more securely
      console.log("userRole......", userRole);
      if (userRole === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  const loadingMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: loading ? "" : "none" }}
          >
            Loading...
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                name="email"
                value={email}
                onChange={handleEmailChange}
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block mt-2 "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In">
      {signInForm()}
      {performRedirect()}
      {loadingMessage()}
      {errorMessage()}
    </Base>
  );
};

// redux config
const mapDispatchToProp = {
  addUserRole: (data) => addUserRole(data),
  removeUserRole: (data) => removeUserRole(data),
};

Signin.propTypes = {
  addUserRole: propTypes.func.isRequired,
  removeUserRole: propTypes.func.isRequired,
};

// redux export
export default connect(null, mapDispatchToProp)(Signin);
