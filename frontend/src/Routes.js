import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoutes exact path="/user/dashboard" component={UserDashBoard} />
        <AdminRoutes exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoutes
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoutes
          exact
          path="/admin/create/product"
          component={AddProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
