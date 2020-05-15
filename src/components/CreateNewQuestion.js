import React, { Component } from "react";
import { handleAddQuestion } from "../actions/shared";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export class CreateNewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionOneText: "",
      optionTwoText: "",
      isCreated: false,
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    console.log(optionOneText, optionTwoText);

    this.props.dispatch(handleAddQuestion({ optionOneText, optionTwoText }));
    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      isCreated: true,
    }));
  };

  render() {
    const { optionOneText, optionTwoText, isCreated } = this.state;
    if (isCreated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h3>Create New Question</h3>
        <form onSubmit={this.handleSubmit} className="new-container info">
          <input
            type="text"
            value={optionOneText}
            placeholder="First Option"
            onChange={this.handleChange}
            name="optionOneText"
            required
          />
          <br />

          <input
            type="text"
            value={optionTwoText}
            placeholder="Second Option"
            onChange={this.handleChange}
            name="optionTwoText"
            required
          />
          <button disabled={optionOneText === "" || optionTwoText === ""}>
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(CreateNewQuestion);
