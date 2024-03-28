const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 from uuid library
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Generate unique identifiers
  const uniqueDeviceNumber = uuidv4();
  const uniqueIdNumber = uuidv4();

  // Add unique identifiers to form data
  formData.uniqueDeviceNumber = uniqueDeviceNumber;
  formData.uniqueIdNumber = uniqueIdNumber;

  // Log the form data to a file
  fs.appendFile('form-logs.txt', JSON.stringify(formData) + '\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
      res.status(500).send('Error logging form data');
    } else {
      console.log('Form data logged successfully');
      res.status(200).send('Form data logged successfully');
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

