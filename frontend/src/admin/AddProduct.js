import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    category,
    categories,
    loading,
    error,
    formData,
    getRedirect,
    createdProduct,
  } = values;
  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log("Error", data.error);
      } else {
        setValues({
          ...values,
          formData: new FormData(),
          categories: data,
        });
      }
    });
  };
  //   console.log("CATe", categories);
  useEffect(() => {
    preload();
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    for (var value of formData.values()) {
      console.log("form", value);
      // console.log("ajeet");
    }
    console.log("name", name);
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log("eror", data.error);
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  // const handleName = (event) => {
  //   setValues({ ...values, name: event.target.value });
  // };
  // const handlePhoto = (event) => {
  //   setValues({ ...values, photo: event.target.files[0] });
  // };
  // const handleDescription = (event) => {
  //   setValues({ ...values, description: event.target.value });
  // };
  // const handlePrice = (event) => {
  //   setValues({ ...values, price: event.target.value });
  // };
  // const handleStock = (event) => {
  //   setValues({ ...values, stock: event.target.value });
  // };
  // const handleCategory = (event) => {
  //   setValues({ ...values, category: event.target.value });
  // };
  // formData.append("name", name);
  // formData.append("photo", photo);
  // formData.append("description", description);
  // formData.append("category", category);
  // formData.append("stock", stock);
  // formData.append("price", price);

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: createdProduct ? "" : "none" }}
          >
            {createdProduct} was successfully created !
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
            error in creating Product !
          </div>
        </div>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <span>Post Photo</span>
      <div className="form-group  mt-2 ">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group  mt-2 ">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group  mt-2 ">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group  mt-2 ">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group  mt-2 ">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group mt-2 ">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-10 mt-3 "
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      //   title="Add a product here!"
      //   description="Welcome to product creation section"
      className="container bg-dark p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-success mb-3  ">
        Admin Home
      </Link>

      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
