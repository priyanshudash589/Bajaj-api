const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function findHighestAlphabet(alphabets) {
    if (alphabets.length === 0) return [];
    return [alphabets.reduce((max, current) => 
      current.toLowerCase() > max.toLowerCase() ? current : max
    )];
  }

app.get('/bfhl', (req, res) => {
  res.send('Welcome to the API. Use POST method to submit data.');
});


app.post('/bfhl', (req, res) => {
    const { data } = req.body;
  
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }
  
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);
  
    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: findHighestAlphabet(alphabets)
    };
  
    res.json(response);
  });


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});