import { connect } from "react-redux";
import {  Link } from "react-router-dom";
import { formatQuestion, formatDate } from "../../helper";
import "./Question.css";

const Question = ({ question }) => {

  if (question === null) {
      return <p>This Question doesn't exist</p>;
    }
  
    const {
      authorName,
      timestamp,
      qid,
    } = question;

    return (
      <div className="Question-container">
          <span>{authorName}</span>
          <span>{formatDate(timestamp)}</span>
          <Link to={`/questions/${qid}`}>Answer</Link>
      </div>
    );
}

const mapStateToProps = ({ authedUser, questions, users }, { questionID }) => {
  const question = questions[questionID];
  
    return {
      question: question
        ? formatQuestion(question, users[question.author], authedUser)
        : null,
    };
};
  
 export default connect(mapStateToProps)(Question);