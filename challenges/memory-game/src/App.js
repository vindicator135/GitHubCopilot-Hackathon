import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('colors');
  const [numPlayers, setNumPlayers] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState([0, 0]);
  const [times, setTimes] = useState([0, 0]);

  const handlePlayerChange = (e) => {
    const players = parseInt(e.target.value, 10);
    setNumPlayers(players);
    setScores(Array(players).fill(0));
    setTimes(Array(players).fill(0));
    setCurrentPlayer(1);
  };

  const handleScoreUpdate = (player) => {
    const newScores = [...scores];
    newScores[player - 1] += 1;
    setScores(newScores);
  };

  const handleTimeUpdate = (player, time) => {
    const newTimes = [...times];
    newTimes[player - 1] = time;
    setTimes(newTimes);
  };

  const handleNextPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer % numPlayers) + 1);
  };

  const [gridSize, setGridSize] = useState(4);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label htmlFor="theme-select">Select Theme: </label>
          <select id="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="colors">Colors</option>
            <option value="starwars">Star Wars Characters</option>
            <option value="pokemon">Pokémon Characters</option>
            <option value="countries">Country Flags</option>
          </select>
        </div>
        <div>
          <label htmlFor="player-select">Number of Players: </label>
          <select id="player-select" value={numPlayers} onChange={handlePlayerChange}>
            <option value={1}>1 Player</option>
            <option value={2}>2 Players</option>
          </select>
        </div>
        <div>
          <label htmlFor="size-select">Grid Size: </label>
          <select id="size-select" value={gridSize} onChange={(e) => setGridSize(parseInt(e.target.value, 10))}>
            <option value={4}>4x4</option>
            <option value={6}>6x6</option>
            <option value={8}>8x8</option>
          </select>
        </div>
        <Grid
          size={gridSize}
          theme={theme}
          numPlayers={numPlayers}
          currentPlayer={currentPlayer}
          handleScoreUpdate={handleScoreUpdate}
          handleTimeUpdate={handleTimeUpdate}
          handleNextPlayer={handleNextPlayer}
        />
        <div>
          <p>Current Player: Player {currentPlayer}</p>
          <p>Scores: Player 1 - {scores[0]} {numPlayers > 1 && `| Player 2 - ${scores[1]}`}</p>
          <p>Times: Player 1 - {times[0]} seconds {numPlayers > 1 && `| Player 2 - ${times[1]} seconds`}</p>
        </div>
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

const fetchThemeData = async (theme, numUniqueImages) => {
  switch (theme) {
    case 'colors':
      const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33', '#33FFF5', '#8C33FF', '#FF3333'];
      return shuffleArray(colors).slice(0, numUniqueImages).map(color => ({ name: color, image: color }));
    case 'starwars':
      const starWarsResponse = await fetch('https://akabab.github.io/starwars-api/api/all.json');
      const starWarsData = await starWarsResponse.json();
      return shuffleArray(starWarsData).slice(0, numUniqueImages).map(character => ({ name: character.name, image: character.image }));
    case 'pokemon':
      const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
      const pokemonData = await pokemonResponse.json();
      const pokemonDetails = await Promise.all(pokemonData.results.slice(0, numUniqueImages).map(pokemon => fetch(pokemon.url).then(res => res.json())));
      return pokemonDetails.map(pokemon => ({ name: pokemon.name, image: pokemon.sprites.front_default }));
    case 'countries':
      const countries = ['US', 'CA', 'GB', 'FR', 'DE', 'JP', 'CN', 'IN'];
      return shuffleArray(countries).slice(0, numUniqueImages).map(country => ({ name: country, image: `https://flagsapi.com/${country}/flat/64.png` }));
    default:
      return [];
  }
}

const Grid = ({ size, theme, numPlayers, currentPlayer, handleScoreUpdate, handleTimeUpdate, handleNextPlayer }) => {
  const gridSize = size * size;
  const numUniqueImages = gridSize / 2;
  const [shuffledImages, setShuffledImages] = useState([]);
  const [flipped, setFlipped] = useState(Array(gridSize).fill(false));
  const [matched, setMatched] = useState(Array(gridSize).fill(false));
  const [firstFlip, setFirstFlip] = useState(null);
  const [secondFlip, setSecondFlip] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const selectedImages = await fetchThemeData(theme, numUniqueImages);
      setShuffledImages(shuffleArray([...selectedImages, ...selectedImages]));
    };
    fetchData();
  }, [theme, numUniqueImages]);

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
      handleTimeUpdate(currentPlayer, timer);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        if (numPlayers > 1) {
          handleNextPlayer();
          handleReset();
        }
      }, 3000);
    }
  }, [matched, numPlayers, handleNextPlayer, handleTimeUpdate, currentPlayer, timer]);

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
        handleScoreUpdate(currentPlayer);
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

  const handleReset = async () => {
    setFlipped(Array(gridSize).fill(false));
    setMatched(Array(gridSize).fill(false));
    setFirstFlip(null);
    setSecondFlip(null);
    setTimer(0);
    setIsTimerRunning(false);
    const selectedImages = await fetchThemeData(theme, numUniqueImages);
    setShuffledImages(shuffleArray([...selectedImages, ...selectedImages]));
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      <div className="timer" style={{ fontWeight: 'bold', color: 'green' }}>
        Timer: {timer} seconds
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {Array.from({ length: gridSize }, (_, index) => (
          <div key={index} className="grid-cell" onClick={() => handleFlip(index)}>
            <span>
              {flipped[index] || matched[index] ? (
                theme === 'colors' ? (
                  <div style={{ width: '100%', height: '100%', backgroundColor: shuffledImages[index].image }}></div>
                ) : (
                  <img src={shuffledImages[index].image} alt={shuffledImages[index].name} style={{ width: '100%', height: '100%' }} />
                )
              ) : (
                '❓'
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;