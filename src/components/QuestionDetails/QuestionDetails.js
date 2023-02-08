import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatQuestion, formatDate } from "../../helper";
import { handleAnswerQuestion } from "../../actions/questions";
import "./QuestionDetails.css";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionDetails = ({ question, dispatch }) => {
  if (question === null) {
    return <p>This Question doesn't exist</p>;
  }

  const {
    authorName,
    avatar,
    qid,
    timestamp,
    optionOneText,
    optionOneVoteCount,
    optionOneVotePercentage,
    optionOneAnswered,
    optionTwoText,
    optionTwoVoteCount,
    optionTwoVotePercentage,
    optionTwoAnswered,
    answered,
  } = question;

  const onOptionClicked = async (answer) => {
    if (!answered) {
      await dispatch(handleAnswerQuestion({ qid, answer }));
    }
  }

  return (
    <div className="QuestionDetails-container">
        <div className="QuestionDetails-headerContainer">
          <div className="QuestionDetails-headerItem">
            <img src={avatar} alt={`Avatar of ${authorName}`} className="QuestionDetails-avatar" />
            {authorName}
          </div>
          <div className="QuestionDetails-headerItem">
            <h3>Would you rather?</h3>
            asked at <b>{formatDate(timestamp)}</b>
          </div>           
        </div>
         
        <div className="QuestionDetails-optionContainer">
        <div className={`QuestionDetails-option ${optionOneAnswered ? "QuestionDetails-answered" : ""} ${answered ? "" : "QuestionDetails-notAnswered"}`}
          onClick={() => onOptionClicked("optionOne")}>
          <div className="QuestionDetails-optionText">
            <h4>{optionOneText}</h4>
          </div>
          {answered && 
          <div className="QuestionDetails-voteInfo">
            {optionOneVoteCount} vote(s)&nbsp;&nbsp;
            {parseFloat(optionOneVotePercentage).toFixed(2)} %
          </div>}
        </div>
        <div className={`QuestionDetails-option ${optionTwoAnswered ? "QuestionDetails-answered" : ""} ${answered ? "" : "QuestionDetails-notAnswered"}`}
          onClick={() => onOptionClicked("optionTwo")}>
          <div className="QuestionDetails-optionText">
            <h4>{optionTwoText}</h4>
          </div>
          {answered && <div className="QuestionDetails-voteInfo">
            {optionTwoVoteCount} vote(s)&nbsp;&nbsp;
            {parseFloat(optionTwoVotePercentage).toFixed(2)} %
          </div>}
        </div>
        </div>   
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { qid } = props.router.params;
  const question = questions[qid];

  return {
    question: question
        ? formatQuestion(question, users[question.author], authedUser.id)
        : null,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionDetails));
