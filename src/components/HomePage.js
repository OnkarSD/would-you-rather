import React, { Component } from "react";
import { connect } from "react-redux";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answered: false,
    };
  }

  handleClick = (e) => {
    e.target.value === "true"
      ? this.setState({ answered: true })
      : this.setState({ answered: false });
    console.log(this.state);
  };

  render() {
    const { answeredQues, questions, unansweredQues } = this.props;

    console.log(answeredQues, unansweredQues); //getting both types of question correctly DOne for today

    return (
      <div>
        <div className="tabs">
          <button value="false" onClick={this.handleClick}>
            Unanswered Questions
          </button>
          <button value="true" onClick={this.handleClick}>
            Answered Question
          </button>
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
