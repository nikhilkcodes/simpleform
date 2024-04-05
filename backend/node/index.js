const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // Import cors middleware

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
  // Extract form data from request body
  const formData = req.body;

  // Generate unique device ID and unique ID number
  const uniqueDeviceID = uuidv4();
  const uniqueIDNumber = uuidv4();

  // Add unique IDs to formData
  formData.uniqueDeviceID = uniqueDeviceID;
  formData.uniqueIDNumber = uniqueIDNumber;

  // Log the form data along with unique IDs
  logFormData(formData);

  // Send response
  res.status(200).json({
    userID: uniqueIDNumber,
    uniqueDeviceID: uniqueDeviceID
  });
});

// Function to log form data
function logFormData(formData) {
  const logData = `${new Date().toISOString()} - ${JSON.stringify(formData)}\n`;
  fs.appendFile('form_logs.txt', logData, (err) => {
    if (err) {
      console.error('Error logging form data:', err);
    } else {
      console.log('Form data logged successfully');
    }
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
