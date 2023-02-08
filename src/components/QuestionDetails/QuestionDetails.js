import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatQuestion } from "../../helper";
import QuestionResult from "../QuestionResult";
import AnswerQuestion from "../AnswerQuestion";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionDetails = (props) => {
  const { id, isQuestionAnswered } = props;
  return (
    <div>
      {isQuestionAnswered ? <QuestionResult questionID={id} /> : <AnswerQuestion questionID={id} /> }
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { qid } = props.router.params;
  const question = questions[qid];

  return {
    id: qid,
    isQuestionAnswered: question ? formatQuestion(question, users[question.author], authedUser.id).answered : false
  };
};

export default withRouter(connect(mapStateToProps)(QuestionDetails));
