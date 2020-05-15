import React, { Component } from "react";
import { connect } from "react-redux";

export class QuestionResult extends Component {
  render() {
    const { question, user, authedUser } = this.props;
    const { avatarURL } = user;
    const total =
      question["optionOne"]["votes"].length +
      question["optionTwo"]["votes"].length;
    const optOneScore = question["optionOne"]["votes"].length;
    const optTwoScore = question["optionTwo"]["votes"].length;
    const selClass = question["optionOne"]["votes"].includes(authedUser)
      ? "userAns"
      : "";
    const selClass2 = question["optionTwo"]["votes"].includes(authedUser)
      ? "userAns"
      : "";
    console.log(selClass, selClass2);
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
            <h4>Results :</h4>
            <div className={selClass}>
              <p>{question["optionOne"]["text"]}</p>
              <p>
                <progress value={optOneScore} max={total}>
                  {optOneScore}
                </progress>
                <br />
                {optOneScore} out of {total} votes.
              </p>
            </div>
            <div className={selClass2}>
              <p>{question["optionTwo"]["text"]}</p>
              <p>
                <progress value={optTwoScore} max={total}>
                  {optTwoScore}
                </progress>
                <br />
                {optTwoScore} out of {total} votes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const user = question ? users[question["author"]] : null;
  return {
    id,
    authedUser,
    user,
    question,
  };
}

export default connect(mapStateToProps)(QuestionResult);
