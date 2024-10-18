function startGame() {
  // Retrieve Grid Size
  const gridSize = parseInt(document.getElementById("grid-size").value);

  // Generate Symbols
  const symbols = generateSymbols(gridSize);

  // Shuffle Symbols
  const shuffledSymbols = shuffle(symbols.concat(symbols));

  // Create Grid
  createGrid(gridSize, shuffledSymbols);
}
