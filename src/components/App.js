import React, { Component } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./LoginPage";
import Home from "./HomePage";
import "../index.css";
import NavBar from "./NavBar";
import LeaderBoard from "./LeaderBoard";
import CreateNewQuestion from "./CreateNewQuestion";

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className="App">
          <Switch>
            {authedUser === null ? (
              <Login />
            ) : (
              <>
                <NavBar />
                <Route path="/" exact component={Home} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/new" component={CreateNewQuestion} />
              </>
            )}
          </Switch>
        </div>
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
