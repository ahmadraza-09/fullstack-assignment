import React, { useState } from "react";
import axios from "axios";
import "../css/RequestBox.css"; // Create a CSS file for modal styling

const RequestBox = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    query_description: "",
  });
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3060/request/createRequest",
        formData
      );
      alert("Request submitted successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        query_description: "",
      });
    } catch (err) {
      console.error("Submit error:", err); // Log the error for debugging
      const errorMessage =
        err.response?.data?.message ||
        "Failed to submit the request. Please try again later.";
      setError(errorMessage);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Submit a Request</h2>
        <form onSubmit={handleSubmit}>
          {/* {success && <p className="success-message">{success}</p>} */}
          {error && <p className="error-message">{error}</p>}

          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label>Query</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter your query"
              required
            />
          </div>
          <div>
            <label>Query Description</label>
            <textarea
              name="query_description"
              value={formData.query_description}
              onChange={handleChange}
              placeholder="Enter your query description in details"
              required
            />
          </div>
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default RequestBox;
