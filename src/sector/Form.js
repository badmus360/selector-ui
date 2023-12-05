// components/FormComponent.js
import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Add logic to send data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      
      <label>Sector</label>
      {/* Populate sectors dynamically */}
      <select
        name="sector"
        value={formData.sector}
        onChange={handleChange}
      >
        <option value="">Select sector</option>
        {/* Map over sectors to create options */}
      </select>

      <div>
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
        />
        <label>Agree to terms</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
