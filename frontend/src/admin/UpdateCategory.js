import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");

    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    updateCategory(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
          console.log("error creat categ", data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
          console.log("succeessy creat categ");
        }
        console.log("user", user);
      })
      .catch(() => {
        console.log("erroro ");
      });
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Category was successfully updated !
            {/* <Link to="/admin/dashboard">Admin Here</Link> */}
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
            error in updating Category !
          </div>
        </div>
      </div>
    );
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead my-3 ">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-success">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update a category here"
      description="Update a category for Products"
      className="container bg-dark rounded p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 ">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
