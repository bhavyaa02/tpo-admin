import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RegistrationForm = ({ onFormDataChange }) => {
  const options = ["CS", "IT", "AI&DS"];

  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [formData, setFormData] = useState({
    job_description: "",
    package_details: "",
    criteria_10th: "",
    criteria_12th: "",
    deg_criteria: "",
    diploma_criteria: "",
    eligible_branches: [],
    docs: null,
  });

  const addRole = () => {
    if (newRole.trim() !== "") {
      setRoles([...roles, newRole.trim()]);
      setNewRole("");
    }
  };

  const removeRole = (index) => {
    const updatedRoles = roles.filter((_, idx) => idx !== index);
    setRoles(updatedRoles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    onFormDataChange({ ...formData, roles, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, docs: file });
    onFormDataChange({ ...formData, roles, docs: file });
  };

  const handleBranchesChange = (event, value) => {
    setFormData({ ...formData, eligible_branches: value });
    onFormDataChange({ ...formData, roles, eligible_branches: value });
  };

  return (
    <div className="section-jp">
      <h2>Basic Details</h2>
      <label>Job Description:</label>
      <input
        type="text"
        name="job_description"
        value={formData.job_description}
        onChange={handleInputChange}
        placeholder="Job Description"
      />
      <label>Package details:</label>
      <input
        type="text"
        name="package_details"
        value={formData.package_details}
        onChange={handleInputChange}
        placeholder="Package"
      />

      <div style={{ marginBottom: "10px" }}>
        <label>Roles:</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          {roles.map((role, index) => (
            <Chip
              key={index}
              label={role}
              onDelete={() => removeRole(index)}
              deleteIcon={<CancelIcon />}
              style={{ margin: "5px" }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <TextField
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Enter Role"
            style={{ flex: 1, minWidth: "120px", marginRight: "10px" }}
          />
          <button
            type="button"
            onClick={addRole}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3784f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
      </div>

      <label>10th Criteria:</label>
      <input
        type="number"
        name="criteria_10th"
        value={formData.criteria_10th}
        onChange={handleInputChange}
        placeholder="percentage"
      />
      <label>12th Criteria:</label>
      <input
        type="number"
        name="criteria_12th"
        value={formData.criteria_12th}
        onChange={handleInputChange}
        placeholder="percentage"
      />
      <label>Degree Criteria:</label>
      <input
        type="number"
        name="deg_criteria"
        value={formData.deg_criteria}
        onChange={handleInputChange}
        placeholder="percentage"
      />
      <label>Diploma Criteria:</label>
      <input
        type="number"
        name="diploma_criteria"
        value={formData.diploma_criteria}
        onChange={handleInputChange}
        placeholder="percentage"
      />

      <label>Eligible Branches:</label>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        value={formData.eligible_branches}
        onChange={handleBranchesChange}
        style={{ width: 860 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Select Branches"
          />
        )}
      />

      <label>Docs (if any):</label>
      <input
        type="file"
        accept=".pdf"
        name="docs"
        onChange={handleFileChange}
        placeholder="Add file"
      />
    </div>
  );
};

export default RegistrationForm;
