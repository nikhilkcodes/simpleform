import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const success = () => {
    toast.success('Message sent successfully!');
    setSubmitted(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Fetch additional information from Node.js server
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const ipAddress = window.ipAddress || 'Unknown';
      const browserVersion = window.navigator.userAgent || 'Unknown';
      const response = await axios.post('http://localhost:3001/submit-form', {
        name,
        email,
        phone,
        latitude,
        longitude,
        ipAddress,
        browserVersion,
      });
      console.log(response.data);
      success();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAllowed(true);
          setUserLocation(position.coords);
          resolve(position);
        },
        (error) => {
          setLocationAllowed(false);
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    getCurrentPosition()
      .then(() => {})
      .catch((error) => console.error('Error getting location:', error));
  }, []);

  return (
    <div>
      {locationAllowed ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : submitted ? 'Success' : 'Submit'}
          </button>
        </form>
      ) : (
        <p>Please allow location access to proceed.</p>
      )}
    </div>
  );
};

export default FormComponent;
