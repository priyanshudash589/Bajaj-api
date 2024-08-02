const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin:'http://localhost:5173'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function findHighestAlphabet(alphabets) {
    if (alphabets.length === 0) return [];
    return [alphabets.reduce((max, current) => 
      current.toLowerCase() > max.toLowerCase() ? current : max
    )];
}
app.get('/api/', (req, res)=>{
  res.send("Welcome to the server")
})

app.get('/api/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/api/bfhl', (req, res) => {
  console.log('Received request:', req.body);
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid input: expected {"data": [...]}' });
  }

  const numbers = data.filter(item => !isNaN(item) && item !== '');
  const alphabets = data.filter(item => isNaN(item) && item.length === 1);

  const response = {
    is_success: true,
    user_id: "priyanshudash589",
    email: "pd9382@srmist.edu.in",
    roll_number: "RA2111027020088",
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: findHighestAlphabet(alphabets)
  };

  console.log('Sending response:', response);
  res.json(response);
});
  

app.use((req, res) => {
  console.log('404 for:', req.method, req.url);
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});