import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);
  
    try {
      const parsedInput = JSON.parse(input);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error('Invalid input: expected {"data": [...]}');
      }
      console.log('Sending data:', parsedInput);
      const res = await axios.post('https://bajaj-priyanshu.syn4ck.workers.dev/bfhl', parsedInput);
      console.log('Received response:', res.data);
      setResponse(res.data);
    } catch (err) {
      console.error('Error:', err);
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format');
      } else {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const selectedFields = selectedOptions.map(option => option.value);
    
    return (
      <div>
        {selectedFields.includes('alphabets') && (
          <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
        )}
        {selectedFields.includes('numbers') && (
          <p>Numbers: {JSON.stringify(response.numbers)}</p>
        )}
        {selectedFields.includes('highest_alphabet') && (
          <p>Highest alphabet: {JSON.stringify(response.highest_alphabet)}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-500 h-screen w-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here'
          className='border-black border-[1px] outline-none rounded-full w-[15rem] p-5'
        />
        <button type="submit" className='bg-black text-white p-3 w-[5rem] rounded-xl'>Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <Select
          isMulti
          options={options}
          onChange={setSelectedOptions}
          placeholder="Select fields to display"
        />
      )}
      {renderResponse()}
    </div>
  );
}

export default App;

// {"data" : ["M","45","z","4"]}