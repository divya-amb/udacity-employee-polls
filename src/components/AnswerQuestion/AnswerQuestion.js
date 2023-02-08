import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../../helper";
import "./AnswerQuestion.css";

const AnswerQuestion = ({ question }) => {

  if (question === null) {
      return <p>This Question doesn't exist</p>;
    }
  
    return (
      <div>
          Answer Question
      </div>
    );
}

const mapStateToProps = ({ authedUser, questions, users }, { questionID }) => {
  const question = questions[questionID];
  
    return {
      question: question
        ? formatQuestion(question, users[question.author], authedUser.id)
        : null,
    };
};
  
 export default connect(mapStateToProps)(AnswerQuestion);