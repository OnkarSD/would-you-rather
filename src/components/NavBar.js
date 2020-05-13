import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

export class NavBar extends Component {
  LogOutAction = (e) => {
    this.props.dispatch(setAuthedUser(null));
  };

  render() {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeClassName="active">
              NewPoll
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              LeaderBoard
            </NavLink>
          </li>
          <li>
            <img src={this.props.avatarURL} alt="" className="nav-avatar" />
          </li>
          <li>{this.props.authedUser}</li>
          <li>
            <button onClick={this.LogOutAction}>LOGOUT</button>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const avatarURL = users[authedUser].avatarURL;
  return {
    authedUser,
    avatarURL,
  };
}

export default connect(mapStateToProps)(NavBar);
