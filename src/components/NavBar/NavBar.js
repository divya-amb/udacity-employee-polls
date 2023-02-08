import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authedUser";
import "./NavBar.css";

const NavBar = ({ isValidLogin, authedUserName, dispatch }) => {
    const onSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    return (
        <form onSubmit={onSubmitLogin}>
            <div className="NavBar-container">
                <div className="NavBar-header"><h1>Employee Polls</h1></div>
                {isValidLogin && authedUserName ? (
                    <div className="NavBar-navigation">
                        <div>
                            <span className="NavBar-element"><Link to="/">Home</Link></span>
                            <span className="NavBar-element"><Link to="/leaderboard">Leaderboard</Link></span>
                            <span className="NavBar-element"><Link to="/add">Add Question</Link></span>
                        </div>
                        <div>
                            <span className="NavBar-element">{authedUserName}</span>
                            <span className="NavBar-element NavBar-elementEnd"><button type="submit">Logout</button></span>
                        </div>
                    </div>) : null
                }
            </div>
        </form>
    );
}

const mapStateToProps = ({ authedUser }) => ({
    isValidLogin: authedUser.isValidLogin,
    authedUserName: authedUser.name,
});
  
 export default connect(mapStateToProps)(NavBar);