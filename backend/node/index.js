const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware
const app = express();

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware to enable CORS

app.post('/submit-form', (req, res) => {
  const formData = req.body;

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
