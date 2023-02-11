import { useState } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../../actions/authedUser";
import "./Login.css";

const Login = ({ isValidLogin, dispatch }) => {
    const [inputID, setInputID] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputError, setInputError] = useState(false);

    const onUsernameChanged = (e) => {
        e.preventDefault();
        setInputID(e.target.value);
    }

    const onPasswordChanged = (e) => {
        e.preventDefault();
        setInputPassword(e.target.value);
    }

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        if (!inputID || !inputPassword) {
            setInputError(true);
        } else {
            setInputError(false);
            await dispatch(handleLogin({id: inputID, password: inputPassword}));
            setInputID("");
            setInputPassword("");
        }
    }

    return (
        <form onSubmit={onSubmitLogin}>
            <div className="Login-container">
                <h3>Login</h3>
                {inputError && <div className="Login-error" data-testid="empty-error-message">
                    <p>Please enter non empty username and password values.</p>
                </div>}
                {!inputError && isValidLogin === false && <div className="Login-error" data-testid="error-message">
                    <p>Please try again with valid username and/or password.</p>
                </div>}
                <div className="Login-inputDiv">
                <span>Username: </span>
                <input type="text" data-testid="username-input" value={inputID} onChange={onUsernameChanged} />
                </div>
                <div className="Login-inputDiv">
                <span>Password: </span>
                <input type="password" data-testid="password-input" value={inputPassword} onChange={onPasswordChanged} />
                </div>
                <button type="submit" data-testid="submit-button">Submit</button>
            </div>
        </form>
       
    );
}

const mapStateToProps = ({ authedUser }) => ({
    isValidLogin: authedUser.isValidLogin,
  });
  
  export default connect(mapStateToProps)(Login);