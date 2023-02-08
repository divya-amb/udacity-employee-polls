import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _verifyLogin,
  } from './_DATA.js'

  export function verifyLogin({id, password}) {
    return Promise.resolve(_verifyLogin({id, password})).then(({name}) => ({name}));
  }
  
  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }
  
  export function saveQuestion (question) {
    return _saveQuestion(question)
  }
  
  export function saveQuestionAnswer (info) {
    return _saveQuestionAnswer(info)
  }