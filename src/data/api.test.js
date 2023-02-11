import {_saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe('_saveQuestion', () => {
    it('will return the saved question correctly if valid parameters are passed in', async() => {
        var question = {
            optionOneText: "option one",
            optionTwoText: "option two",
            author: "sarahedo",
        };
        var result = await _saveQuestion(question);
        expect(result.optionOne.text).toEqual(question.optionOneText);
        expect(result.optionTwo.text).toEqual(question.optionTwoText);
        expect(result.author).toEqual(question.author);
    });

    it("will return an error if an empty object is passed", async() => {
        var question = {};
        await expect(_saveQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });

    it("will return an error if the optionOne is missing in the question", async() => {
        var question = {
            optionTwoText: "option two",
            author: "author",
        };
        await expect(_saveQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });

    it("will return an error if the optionTwo is missing in the question", async() => {
        var question = {
            optionOneText: "option one",
            author: "author",
        };
        await expect(_saveQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });

    it("will return an error if the author is missing in the question", async() => {
        var question = {
            optionOneText: "option one",
            optionTwoText: "option two",
        };
        await expect(_saveQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });
});

describe('_saveQuestionAnswer', () => {
    it('will return true after answer to a question is saved', async() => {
        var questionAnswer = {
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne",
        };
        var result = await _saveQuestionAnswer(questionAnswer);
        expect(result).toEqual(true);
    });

    it("will return an error if an empty object is passed", async() => {
        var questionAnswer = {};
        await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

    it("will return an error if authedUser is missing", async() => {
        var questionAnswer = {
            qid: "question id",
            answer: "optionOne",
        };
        await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

    it("will return an error if qid is missing", async() => {
        var questionAnswer = {
            authedUser: "logged in user",
            answer: "optionOne",
        };
        await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

    it("will return an error if answer is missing", async() => {
        var questionAnswer = {
            authedUser: "logged in user",
            qid: "question id",
        };
        await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });
});
