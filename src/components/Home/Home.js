import { connect } from "react-redux";
import { useState } from "react";
import Question from "../Question/Question";
import "./Home.css";

const ANSWER_TYPE = {
    ANSWERED: "answered",
    UNANSWERED: "unanswered",
};

const Home = ({ answeredQuestionIDs, unansweredQuestionIDs }) => {
    const [showAnswerType, setShowAnswerType] = useState(ANSWER_TYPE.UNANSWERED);
    
    let idsToConsider = unansweredQuestionIDs;
    let title = "Unanswered Polls";
    let unansweredClassName = "active";
    let answeredClassName = "";

    if (showAnswerType === ANSWER_TYPE.ANSWERED) {
        idsToConsider = answeredQuestionIDs;
        title = "Answered Polls";
        unansweredClassName = "";
        answeredClassName = "active";
    }
    

    return (
        <>
            <div class="Home-tab">
                <button onClick={() => setShowAnswerType(ANSWER_TYPE.UNANSWERED)} className={unansweredClassName}>Unanswered Polls</button>
                <button onClick={() => setShowAnswerType(ANSWER_TYPE.ANSWERED)} className={answeredClassName}>Answered Polls</button>
            </div>

            <div className="Home-container">
                <h3>{title}</h3>
                <div className="Home-content">
                    {idsToConsider.map((quesID) => (
                       <Question key={quesID} questionID={quesID} />
                    ))}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = ({ authedUser, questions, users }) => {
    const currentUser = users[authedUser.id] || { answers: {}};
    const answeredQuestionIDs = Object.keys(currentUser.answers);
    const unansweredQuestionIDs = Object.keys(questions).filter(id => answeredQuestionIDs.indexOf(id) === -1);
    return {
        answeredQuestionIDs: answeredQuestionIDs.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        unansweredQuestionIDs: unansweredQuestionIDs.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    }
};
  
 export default connect(mapStateToProps)(Home);