import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class QuestionCard extends Component {
  render() {
    const { question, user, loggedUser, isAnswered } = this.props;

    if (question === null) {
      return <div>Sorry Question doesn't exist . . .</div>;
    }

    const { id } = question;
    const { avatarURL } = user;
    console.log(avatarURL);
    const answer = loggedUser["answers"][id]
      ? loggedUser["answers"][id]
      : "optionOne";
    console.log(answer);
    return (
      <div className="container">
        <h3>{`${user["name"]} asks:`}</h3>
        <div className="question-card">
          <img
            src={avatarURL}
            alt={`Avatar of ${user["name"]}`}
            className="avatar-ques"
          />
          <div className="info">
            <h4>Would you Rather ...</h4>
            <p>{`${question[answer]["text"]}`}</p>
            <p>or...</p>
            {isAnswered === "true" ? (
              <Link to={`/question/${id}/result`}>
                <button>View Result</button>
              </Link>
            ) : (
              <Link to={`/question/${id}`}>
                <button>View Poll</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id, answered }) {
  const question = questions[id];
  const isAnswered = answered;
  const user = question ? users[question["author"]] : null;
  const loggedUser = users[authedUser];
  return {
    loggedUser,
    user,
    question,
    isAnswered,
  };
}

export default connect(mapStateToProps)(QuestionCard);
