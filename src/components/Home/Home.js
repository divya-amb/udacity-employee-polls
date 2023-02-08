import { connect } from "react-redux";
import Question from "../Question/Question";
import "./Home.css";

const Home = ({ answeredQuestionIDs, unansweredQuestionIDs }) => {
    return (
        <>
            <div className="Home-container">
                <h3>Unanswered Polls</h3>
                <div className="Home-content">
                    {unansweredQuestionIDs.map((quesID) => (
                       <Question key={quesID} questionID={quesID} />
                    ))}
                </div>
            </div>
            <div className="Home-container">
                <h3>Answered Polls</h3>
                <div className="Home-content">
                    {answeredQuestionIDs.map((quesID) => (
                        <Question key={quesID} questionID={quesID} />
                    ))}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = ({ authedUser, questions, users }) => {
    const currentUser = users[authedUser.id] || { answers: []};
    const answeredQuestionIDs = Object.keys(currentUser.answers);
    const unansweredQuestionIDs = Object.keys(questions).filter(id => answeredQuestionIDs.indexOf(id) === -1);
    return {
        answeredQuestionIDs: answeredQuestionIDs.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        unansweredQuestionIDs: unansweredQuestionIDs.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    }
};
  
 export default connect(mapStateToProps)(Home);