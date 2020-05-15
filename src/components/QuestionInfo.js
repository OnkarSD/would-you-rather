import React, { Component } from "react";
import { connect } from "react-redux";
// import { formatQuestion } from "../utils/_DATA";
import { Redirect } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/users";

export class QuestionInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionChoosed: "",
      isSubmitted: false,
    };
  }

  handleChange = (e) => {
    this.setState({ optionChoosed: e.target.value });
    // console.log(this.state.optionChoosed);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let answer = this.state.optionChoosed;
    const { id } = this.props.question;
    const qid = id;

    answer === this.props.question.optionOne.text
      ? (answer = "optionOne")
      : (answer = "optionTwo");
    this.props.dispatch(handleSaveQuestionAnswer(qid, answer));
    this.setState(() => ({
      selectedOption: "",
      isSubmitted: true,
    }));
  };

  render() {
    const { id, question, user } = this.props;
    const { avatarURL } = user;

    if (this.state.isSubmitted === true) {
      return <Redirect to={`/question/${id}/result`} />;
    }
    return (
      <div>
        <div className="container">
          <h3>{`${user["name"]} asks:`}</h3>
          <div className="question-card">
            <img
              src={avatarURL}
              alt={`Avatar of ${user["name"]}`}
              className="avatar-ques"
            />
            <div>
              <h4>Would you Rather ...</h4>
              <form onSubmit={this.handleSubmit} className="info">
                <label htmlFor="optionOne">
                  <input
                    type="radio"
                    name="answer"
                    id="optionOne"
                    value={question["optionOne"]["text"]}
                    onChange={this.handleChange}
                  />
                  {question["optionOne"]["text"]}
                </label>
                <br />
                <label htmlFor="optionTwo">
                  <input
                    type="radio"
                    name="answer"
                    id="optionTwo"
                    value={question["optionTwo"]["text"]}
                    onChange={this.handleChange}
                  />
                  {question["optionTwo"]["text"]}
                </label>
                <br />
                <button type="submit" className="">
                  Vote Now
                </button>
              </form>
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

export default connect(mapStateToProps)(QuestionInfo);
