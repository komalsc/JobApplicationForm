import React from "react";
import "./SubmittedApplications.css";

export const SubmittedApplications = ({ submittedData, setSubmittedData }) => {
  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    localStorage.setItem("jobApplications", JSON.stringify(updatedData));
  };

  return (
    <div className="submitted-container">
      <h2>Submitted Applications</h2>
      {submittedData.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>LinkedIn URL</th>
              <th>About</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.email}</td>
                <td>{data.contact}</td>
                <td>{data.gender}</td>
                <td>
                  {data.url ? (
                    <a href={data.url} target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{data.about}</td>
                <td>
                  {data.resume && data.resume.url ? (
                    <a href={data.resume.url} download={data.resume.name}>
                      Download Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
