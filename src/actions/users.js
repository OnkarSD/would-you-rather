import { saveQuestionAnswer } from "../utils/api";
import { addAnswerToQuestion } from "../actions/questions";

export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}

function addAnswerToUser(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    console.log(authedUser);
    dispatch(addAnswerToUser(authedUser, qid, answer));
    dispatch(addAnswerToQuestion(authedUser, qid, answer));

    return saveQuestionAnswer(authedUser, qid, answer).catch((e) => {
      console.warn("Error in handleSaveQuestionAnswer:", e);
    });
  };
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
