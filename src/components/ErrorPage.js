import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export class ErrorPage extends Component {
  render() {
    return (
      <div className="center">
        <h1>Whoops Error Occured (404) </h1>
        <h2>Looks like page you're looking for is not available.</h2>

        <h3>Please try to login again.</h3>
        <NavLink
          to="/"
          style={{ padding: "10px", backgroundColor: "green", color: "white" }}
        >
          BACK TO LOGIN
        </NavLink>
      </div>
    );
  }
}

export default ErrorPage;
