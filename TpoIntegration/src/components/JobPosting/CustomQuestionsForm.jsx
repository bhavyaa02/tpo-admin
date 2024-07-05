import React, { useState } from "react";

const CustomQuestionsForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [dataType, setDataType] = useState("");

  const addQuestion = () => {
    if (question && dataType) {
      onAddQuestion({ question, dataType });
      setQuestion("");
      setDataType("");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="section-jp">
      <h2>Add Custom Questions</h2>
      <label>Question:</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question Name"
      />
      <label>Data Type:</label>
      <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
        <option value="">Select Data Type</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="file">File</option>
      </select>
      <button type="button-jp" onClick={addQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default CustomQuestionsForm;
