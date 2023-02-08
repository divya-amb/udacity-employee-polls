import { connect } from "react-redux";
import "./Leaderboard.css";

const Leaderboard = ({ users }) => {
    const heading = ["User", "Answered", "Created"];
    return (
        <>
            <div className="Leaderboard-container">
                <h3>Leaderboard</h3>
                <table className="Leaderboard-table">
                    <thead>
                        <tr>
                            {heading.map((head) => <th key={head} >{head}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({id, avatarURL, name, answers, questions }) => 
                          {
                            return (
                                <tr>
                                    <td>
                                        <div className="Leaderboard-user">
                                        <img src={avatarURL} alt={`Avatar of ${name}`} className="Leaderboard-avatar" />
                                        {name}
                                        </div>
                                    </td>
                                    <td>{Object.keys(answers).length}</td>
                                    <td>{questions.length}</td>
                                </tr>
                            )
                          }
                        )}
                    </tbody>
            </table>
            </div>
        </>
    );
}

const mapStateToProps = ({ users }) => {
    return {
        users: Object.values(users).sort((a, b) => (b.questions.length + Object.keys(b.answers).length)-(a.questions.length + Object.keys(a.answers).length)),
    }
};
  
 export default connect(mapStateToProps)(Leaderboard);