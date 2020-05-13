import React, { Component } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    this.props.dispatch(setAuthedUser(user));
    this.setState({
      user: "",
    });
  };

  handleChange = (e) => {
    this.setState({ user: e.target.value });
  };

  render() {
    const { users } = this.props;
    return (
      <div className="container">
        <h3>Welcome to the Would You Rather App!</h3>
        <p>Please sign in to continue</p>

        <form onSubmit={this.handleSubmit} className="login-container">
          <img
            className="avatar"
            src={
              this.state.user === ""
                ? "https://cdn1.iconfinder.com/data/icons/avatar-vol-9/512/3-128.png"
                : users[this.state.user].avatarURL
            }
            alt="SelectUser"
          />
          <select onChange={this.handleChange} className="login-select">
            <option>Please Select Avatar</option>
            {Object.keys(users).map((EachUser) => (
              <option key={EachUser} value={EachUser}>
                {EachUser}
              </option>
            ))}
          </select>
          <button className="login-btn">LogIn</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
