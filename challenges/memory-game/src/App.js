import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Grid size={4} />
      </header>
    </div>
  );
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Grid = ({ size }) => {
  const gridSize = size * size;
  const numUniqueImages = gridSize / 2;
  const [characters, setCharacters] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [flipped, setFlipped] = useState(Array(gridSize).fill(false));
  const [matched, setMatched] = useState(Array(gridSize).fill(false));
  const [firstFlip, setFirstFlip] = useState(null);
  const [secondFlip, setSecondFlip] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    fetch('https://akabab.github.io/starwars-api/api/all.json')
      .then(response => response.json())
      .then(data => {
        const selectedCharacters = shuffleArray(data).slice(0, numUniqueImages);
        setCharacters(selectedCharacters);
        setShuffledImages(shuffleArray([...selectedCharacters, ...selectedCharacters]));
      });
  }, [numUniqueImages]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (matched.every(Boolean)) {
      setIsTimerRunning(false);
    }
  }, [matched]);

  const handleFlip = (index) => {
    if (flipped[index] || matched[index]) return;

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    if (firstFlip === null) {
      setFirstFlip(index);
    } else if (secondFlip === null) {
      setSecondFlip(index);
      if (shuffledImages[firstFlip].name === shuffledImages[index].name) {
        const newMatched = [...matched];
        newMatched[firstFlip] = true;
        newMatched[index] = true;
        setMatched(newMatched);
        resetFlips();
      } else {
        setTimeout(() => {
          const resetFlipped = [...flipped];
          resetFlipped[firstFlip] = false;
          resetFlipped[index] = false;
          setFlipped(resetFlipped);
          resetFlips();
        }, 1000);
      }
    }
  };

  const resetFlips = () => {
    setFirstFlip(null);
    setSecondFlip(null);
  };

  const handleReset = () => {
    setFlipped(Array(gridSize).fill(false));
    setMatched(Array(gridSize).fill(false));
    setFirstFlip(null);
    setSecondFlip(null);
    setTimer(0);
    setIsTimerRunning(false);
    const selectedCharacters = shuffleArray(characters).slice(0, numUniqueImages);
    setShuffledImages(shuffleArray([...selectedCharacters, ...selectedCharacters]));
  };

  const cells = Array.from({ length: gridSize }, (_, index) => (
    <td key={index} className="grid-cell" onClick={() => handleFlip(index)}>
      <span>
        {flipped[index] || matched[index] ? (
          <img src={shuffledImages[index].image} alt={shuffledImages[index].name} style={{ width: '100%', height: '100%' }} />
        ) : (
          '❓'
        )}
      </span>
    </td>
  ));

  const tableRows = [];
  for (let i = 0; i < size; i++) {
    tableRows.push(
      <tr key={i}>
        {cells.slice(i * size, i * size + size)}
      </tr>
    );
  }

  return (
    <div>
      <div className="timer" style={{ fontWeight: 'bold', color: 'green' }}>
        Timer: {timer} seconds
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
      </div>
      <table className="grid-table">
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
}

export default App;