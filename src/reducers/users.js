import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_QUESTION , ADD_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ANSWER_QUESTION:
      const { qid, authedUserID, answer } = action;
      return {
          ...state,
          [authedUserID]: {
              ...state[authedUserID],
              answers: {
                  ...state[authedUserID].answers,
                  [qid]: answer,
              }
          }
      };
    /*case ADD_QUESTION:
      const { question } = action;
      return {
          ...state,
          [authedUser]: {
            ...state[authedUser],
            questions: {
                ...state[authedUser].questions,
                qid,
            }
        }
      };*/
    default:
      return state;
  }
}