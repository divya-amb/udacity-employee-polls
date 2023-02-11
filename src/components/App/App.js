import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../../actions/shared";
import Login from "../Login";
import NavBar from "../NavBar";
import Home from "../Home";
import Leaderboard from "../Leaderboard";
import AddQuestion from "../AddQuestion";
import QuestionDetails from "../QuestionDetails";
import NotFound from "../NotFound";
import Loading from "../Loading";
import "./App.css";

const App = ({authedUserID, loading, dispatch}) => {
  useEffect(() => {
    if (authedUserID) {
      dispatch(handleInitialData());
    }
  }, [authedUserID]);

  return (
    <Fragment>
      <LoadingBar />
        <div className="App-container">
          <NavBar />
          {authedUserID ? (
              <div className="App-content">
                {loading ? <Loading /> : (<Routes>
                  <Route path="/questions/:qid" element={<QuestionDetails />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/add" element={<AddQuestion />} />
                  <Route path="/" exact element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>)}
              </div>
          ) : (
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          )}
        </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, users = {}, questions = {} }) => ({
  authedUserID: authedUser.id,
  loading: Object.keys(users).length === 0 || Object.keys(questions).length === 0,
});

export default connect(mapStateToProps)(App);