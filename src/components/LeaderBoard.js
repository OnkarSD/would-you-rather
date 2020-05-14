import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

export class LeaderBoard extends Component {
  render() {
    const { users, usersScore } = this.props;
    console.log(usersScore);
    return (
      <div className="center">
        {usersScore.map((user) => (
          <div key={user.uid} className="container">
            <img
              src={users[user.uid].avatarURL}
              alt={`Avatar of ${user.uid}`}
              className="avatar-ques"
            />
            <div>
              <h3>{users[user.uid].name}</h3>
              <p>
                Questions Answered:{Object.keys(users[user.uid].answers).length}
              </p>
              <p>Questions Created:{users[user.uid].questions.length}</p>
            </div>
            <h4>Score:{user.score}</h4>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  let usersScore = [];
  let score = 0;
  Object.keys(users).forEach((user) => {
    score =
      users[user].questions.length + Object.keys(users[user].answers).length;
    usersScore.push({
      uid: user,
      score: score,
    });
    usersScore.sort((a, b) => b.score - a.score);
  });
  return {
    users,
    usersScore,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
