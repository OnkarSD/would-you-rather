import React, { Component } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./LoginPage";
import Home from "./HomePage";
import "../index.css";

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className="App">{authedUser === null ? <Login /> : <Home />}</div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
