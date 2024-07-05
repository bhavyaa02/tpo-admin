import React, { useState, useEffect } from "react";
import RegistrationForm from "./RegistrationForm";
import CustomQuestionsForm from "./CustomQuestionsForm";
import QuestionTable from "./QuestionTable";
import "./jobposting.css";
import api from '../../api';
// import axios, { formToJSON } from 'axios';
// import FormData from 'form'
// import FormData from "form-data";

const JobPostingContainer = () => {
  const [withTracker, setWithTracker] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({
    companyId: "",
    remarkId: "",
  });
  const [confirmedCompanies, setConfirmedCompanies] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchConfirmedCompanies = async () => {
      try {
        const response = await api.get(
          "remarks/confirmed"
        );
        setConfirmedCompanies(response.data);
      } catch (error) {
        console.error("Error fetching confirmed companies:", error);
      }
    };

    fetchConfirmedCompanies();
  }, []);

  const handleTrackerChange = (e) => {
    setWithTracker(e.target.value === "yes");
  };

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleCompanyChange = (e) => {
    const [companyId, remarkId] = e.target.value.split(",");
    setSelectedCompany({ companyId, remarkId });
  };

  const handleFormDataChange = (data) => {
    setFormData(data);
  };

  const handleSubmit = async () => {
    // console.log(selectedCompany);
    console.log(formData);
    const payload = {
      ...formData,
      questions: withTracker ? questions : "",
      tracker: withTracker ? "yes" : "no",
      companyId: selectedCompany.companyId,
      remarkId: selectedCompany.remarkId,
    };
    console.log("payload: ", payload);
    const formDataToSend = new FormData();
    // formDataToSend.
    // formDataToSend.append(payload);
    // for (const key in payload) {
    //   if (Object.hasOwnProperty.call(payload, key)) {
    //     const value = payload[key];
    //     console.log(value);
    //     // // If the key is 'questions', stringify the value before appending it to FormData
    //     if (key === "questions") {
    //       console.log(key, value);
    //       formDataToSend.append(key, JSON.stringify(value));
    //     }
    //     else {
    //       // Otherwise, directly append the key-value pair to FormData
    //       console.log(key, value);
    //       formDataToSend.append(key, value);
    //       // console.log(formDataToSend);
    //     }
    //   }
    // }
    Object.keys(payload).forEach((key) => {
      // If the key is 'questions', stringify the value before appending it to FormData
      if (key === "questions") {
        formDataToSend.append(key, JSON.stringify(payload[key]));
      } else {
        // Otherwise, directly append the key-value pair to FormData
        console.log(key, payload[key]);
        formDataToSend.append(key, payload[key]);
      }
    });
    console.log("FormData:", formDataToSend); // Log the formDataToSend to check its contents

    // if (payload.docs) {
    //   formDataToSend.append('docs', payload.docs);
    //   // console.log(formDataToSend);
    // }

    console.log(formDataToSend.entries.length);
    // console.log(formDataToSend["companyId"]); // Log the formDataToSend to check its contents
    for (var pair of formDataToSend.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // if(formDataToSend.entries.length ){
    //   console.log("NULLLLLLLLLLLLLLLLLLLL");

    // }
    // if(formDataToSend == {}) {
    //   console.log("HAHAHA U SUCK");
    // }
    try {
      console.log(formDataToSend);
      api
        .post("jobpostings", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        })
        .then((res) => {
          console.log("Job posting created successfully:", res.data);
          clearForm();
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    } catch (error) {
      console.error("Error creating job posting:", error);
    }
  };

  const clearForm = () => {
    setWithTracker(false);
    setQuestions([]);
    setSelectedCompany({ companyId: "", remarkId: "" });
    setConfirmedCompanies([]);
    setFormData({});
  };

  return (
    <div className="container-jp">
      <div className="header-jp">
        <div>
          <h1>Job Posting</h1>
        </div>
      </div>
      <div className="section-jp">
        <h2>Companies with Confirmed Status</h2>
        <label>Company:</label>
        <select
          onChange={handleCompanyChange}
          value={`${selectedCompany.companyId},${selectedCompany.remarkId}`}
        >
          <option value="">Select Company</option>
          {confirmedCompanies.map((company) => (
            <option
              key={company.companyId}
              value={`${company.companyId},${company.remarkId}`}
            >
              {company.companyName}
            </option>
          ))}
        </select>
      </div>
      {selectedCompany && (
        <>
          <RegistrationForm onFormDataChange={handleFormDataChange} />
          <div className="section-jp">
            <h2>Tracker</h2>
            <label>With Tracker?</label>
            <select onChange={handleTrackerChange}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {withTracker && (
            <CustomQuestionsForm onAddQuestion={handleAddQuestion} />
          )}
          {withTracker && questions.length > 0 && (
            <QuestionTable questions={questions} />
          )}
          <div className="section-jp">
            <button type="button-jp" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobPostingContainer;
