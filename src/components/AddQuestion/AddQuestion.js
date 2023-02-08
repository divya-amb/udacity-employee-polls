import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../../actions/questions";
import "./AddQuestion.css";

const AddQuestion = ({ dispatch }) => {

  const navigate = useNavigate();
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const handleOptionOneTextChange = (e) => {
    const text = e.target.value;
    setOptionOneText(text);
  };

  const handleOptionTwoTextChange = (e) => {
    const text = e.target.value;
    setOptionTwoText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion({ optionOneText, optionTwoText }));
    setOptionOneText("");
    setOptionTwoText("");
    navigate("/");
  };

  return (
    <div className="AddQuestion-container">
        <div className="AddQuestion-headerContainer">
          <div className="AddQuestion-headerItem">
            <h3>Would you rather?</h3>
          </div>       
        </div>

        <form onSubmit={handleSubmit} style={{width: "100%"}}>
          <div className="AddQuestion-optionContainer">
            <div className={"AddQuestion-option"}>
                <textarea
                  placeholder="Option One Text"
                  value={optionOneText}
                  onChange={handleOptionOneTextChange}
                  className="AddQuestion-textarea"
                />
            </div>
            <div className="AddQuestion-option">
              <textarea
                placeholder="Option Two Text"
                value={optionTwoText}
                onChange={handleOptionTwoTextChange}
                className="AddQuestion-textarea"
              />
            </div>
            
          </div>
          <div className="AddQuestion-headerContainer">
            <button className="btn" type="submit" disabled={optionOneText === "" || optionTwoText === ""}>
              Submit
            </button>
          </div>
        </form>
       
    </div>
  );
};

export default connect()(AddQuestion);
