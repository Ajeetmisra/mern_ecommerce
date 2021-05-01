import React from "react";
import Navigation from "./Navigation";

export default function Base({ title, children, className, description }) {
  return (
    <div>
      <Navigation />
      <div className="container-fluid">
        <div className="jumbotron text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3 fixed-bottom">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions, feel free to reach out!</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container text-center py-3 ">
          <span className="text-muted">
            An Amazing <span className="text-white">E-commerce app</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
