import React, { useState, useEffect } from 'react';
import "./JobApplication.css";
import { SubmittedApplications } from './SubmittedApplications';

export const JobApplication = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    gender: "",
    resume: null,
    url: "",
    about: ""
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [showSubmitted, setShowSubmitted] = useState(false);  // Toggle State

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("jobApplications")) || [];
    setSubmittedData(storedData);
  }, []);

  const validate = () => {
    let tempErrors = {};
  
    if (!formData.firstname) tempErrors.firstname = "First name is required";
    if (!formData.lastname) tempErrors.lastname = "Last name is required";
    // if (!formData.email) tempErrors.email = "Email is required"; 
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      tempErrors.contact = "Email must have all valid character";
    }
    if (!formData.contact) {
      tempErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      tempErrors.contact = "Contact number must be a 10-digit numeric value";
    }
    if (!formData.resume) tempErrors.resume = "Resume is required";
    if (!formData.url) tempErrors.url = "LinkedIn URL is required";
  
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFormData({ ...formData, resume: { name: file.name, url: fileURL } });
    }
  };

  const handleReset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      gender: "",
      resume: null,
      url: "",
      about: ""
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedData = [...submittedData, formData];
      setSubmittedData(updatedData);
      localStorage.setItem("jobApplications", JSON.stringify(updatedData));
      alert("Application submitted successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        gender: "",
        resume: null,
        url: "",
        about: ""
      });
    }
  };

  return (
    <div >
      <button className="toggle-btn" onClick={() => setShowSubmitted(!showSubmitted)}>
        {showSubmitted ? "Back to Form" : "View Submitted Applications"}
      </button>

      {showSubmitted ? (
       <SubmittedApplications submittedData={submittedData} setSubmittedData={setSubmittedData} />

      ) : (
        <>
        <div className='container'>
          <h1>Job Application Form</h1>
          <form onSubmit={handleSubmit}>
            <label>First Name*</label>
            <input type='text' name='firstname' value={formData.firstname} onChange={handleChange} />
            {errors.firstname && <span className='error'>{errors.firstname}</span>}

            <label>Last Name*</label>
            <input type='text' name='lastname' value={formData.lastname} onChange={handleChange} />
            {errors.lastname && <span className='error'>{errors.lastname}</span>}

            <label>Email*</label>
            <input type='email' name='email' value={formData.email} onChange={handleChange} />
            {errors.email && <span className='error'>{errors.email}</span>}

            <label>Contact*</label>
            <input type='text' name='contact' value={formData.contact} onChange={handleChange} />
            {errors.contact && <span className='error'>{errors.contact}</span>}

            <label>Gender</label>
            <input type='radio' name='gender' value='Male' onChange={handleChange} /> Male
            <input type='radio' name='gender' value='Female' onChange={handleChange} /> Female
            <input type='radio' name='gender' value='Other' onChange={handleChange} /> Other

            <label>Resume Upload*</label>
            <input type='file' name='resume' onChange={handleFileChange} />
            {errors.resume && <span className='error'>{errors.resume}</span>}

            <label>LinkedIn URL</label>
            <input type='text' name='url' value={formData.url} onChange={handleChange} />
            {errors.url && <span className='error'>{errors.url}</span>}


            <label>About</label>
            <textarea name='about' value={formData.about} onChange={handleChange} rows='5'></textarea>

            <button type='reset' onClick={handleReset}>Reset</button>
            <button type='submit'>Submit</button>
          </form>
          </div>
        </>
      )}
    </div>
  );
};
