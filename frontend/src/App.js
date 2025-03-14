import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [gameId, setGameId] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const startGame = async (level) => {
    try {
      const response = await axios.post('http://localhost:3003/', { level });
      setGameId(response.data._id);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const makeGuess = async () => {
    try {
      const response = await axios.post(`http://localhost:3003/guess/${gameId}`, { guess: parseInt(guess) });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const getStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/${gameId}`);
      setStatus(response.data);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Guess The Numbers Game</h1>
      {!gameId ? (
        <div>
          <button onClick={() => startGame('easy')}>Start Easy Game</button>
          <button onClick={() => startGame('hard')}>Start Hard Game</button>
        </div>
      ) : (
        <div>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
          />
          <button onClick={makeGuess}>Submit Guess</button>
          <button onClick={getStatus}>Check Status</button>
        </div>
      )}
      {message && <p>{message}</p>}
      {status && (
        <div>
          <p>Status: {status.status}</p>
          <p>Attempts left: {status.attempts}</p>
        </div>
      )}
    </div>
  );
}

export default App;
