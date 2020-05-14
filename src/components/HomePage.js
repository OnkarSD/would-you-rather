import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answered: false,
    };
  }

  handleClick = (e) => {
    e.target.value === "true"
      ? this.setState(() => ({ answered: true }))
      : this.setState({ answered: false });
    console.log(this.state);
  };

  render() {
    const { answeredQues, unansweredQues } = this.props;

    console.log(answeredQues, unansweredQues); //getting both types of question correctly DOne for today

    return (
      <div className="center homeContainer">
        <div className="tabs">
          <button value="false" onClick={this.handleClick}>
            Unanswered Questions
          </button>
          <button value="true" onClick={this.handleClick}>
            Answered Question
          </button>
        </div>
        <div className="questions">
          {this.state.answered
            ? answeredQues.map((id) => (
                <QuestionCard key={id} id={id} answered="true" />
              ))
            : unansweredQues.map((id) => (
                <QuestionCard key={id} id={id} answered="false" />
              ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const user = users[authedUser];
  const answeredQues = user ? Object.keys(user["answers"]) : null;
  const unansweredQues = Object.keys(questions).filter((id) => {
    return !answeredQues.includes(id) && id;
  });
  return {
    authedUser,
    answeredQues,
    questions,
    unansweredQues,
  };
}

export default connect(mapStateToProps)(Home);
