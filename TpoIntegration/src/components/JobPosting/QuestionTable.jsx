import React from "react";

const QuestionTable = ({ questions }) => {
  return (
    <div className="section table-container">
      <h2>Questions</h2>
      <table>
        <thead>
          <tr>
            <th>Question:</th>
            <th>Data Type</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={index}>
              <td>{q.question}</td>
              <td>{q.dataType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
