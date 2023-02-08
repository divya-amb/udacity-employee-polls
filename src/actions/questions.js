import { saveQuestion, saveQuestionAnswer } from "../data/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

function answerQuestion({ qid, answer, authedUserID }) {
  return {
    type: ANSWER_QUESTION,
    authedUserID,
    qid,
    answer,
  };
}

export function handleAnswerQuestion({qid, answer}) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer({
      qid,
      answer,
      authedUser: authedUser.id,
    })
      .then(() => { 
        dispatch(answerQuestion({qid, answer, authedUserID: authedUser.id})) 
      })
      .then(() => dispatch(hideLoading()));
  };
}


function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion({optionOneText, optionTwoText}) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
