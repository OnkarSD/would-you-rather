import { getInitialData } from "../utils/api";
import { receiveQuestions, addQuestion } from "./questions";
import { receiveUsers, addQuestionToUser } from "./users";
import { saveQuestion } from "../utils/api";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion(Options) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const { optionOneText, optionTwoText } = Options;
    const author = authedUser;

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addQuestionToUser(question));
    });
  };
}
