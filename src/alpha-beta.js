import { isGameOver } from "./collision"; 

function evaluateWorld(world) {
  let score = 0;
  if (Array.isArray(world.cats)) {
    for (const cat of world.cats) {
      score += typeof cat.points === "number" ? cat.points : 0;
    }

    // Penalize if the stack is high (y > threshold)
    for (const cat of world.cats) {
      if (typeof cat.y === "number" && cat.y < 100) { 
        score -= 100; // penalty for being near the top
      }
    }
  }

  return score;
}

function getPossibleMoves(world) {
  // Only generate moves if a cat is ready to be dropped
  if (!world.cats || world.cats.length === 0) return [];

  const moves = [];
  const leftBound = 30;   // Adjust as needed 
  const rightBound = 590; // Adjust as needed 
  const step = 20;        // Granularity of possible moves (20 is smoother for Suika)

  for (let x = leftBound; x <= rightBound; x += step) {
    moves.push({ x });
  }
  return moves;
}

function applyMove(world, move) {
  // Deep clone the world to avoid mutating the original
  const newWorld = JSON.parse(JSON.stringify(world));

  // Simulate dropping the next cat at move.x
  if (newWorld.cats && newWorld.cats.length > 0) {
    // Find the falling cat (the one with the highest y) and assume the last cat in the array is the one to drop
    const nextCat = newWorld.cats[newWorld.cats.length - 1];
    nextCat.x = move.x;
    // Simulate it falling to the bottom (set y to the bottom of the board)
    nextCat.y = 600; // Adjust this value to your board's bottom y coordinate
  }

  return newWorld;
}

function alphaBeta(world, depth, alpha, beta, maximizingPlayer) {
  if (depth === 0 || isGameOver(world)) {
    return evaluateWorld(world);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of getPossibleMoves(world)) {
      const newWorld = applyMove(world, move);
      const evaluation = alphaBeta(newWorld, depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break; // Beta cutoff
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of getPossibleMoves(world)) {
      const newWorld = applyMove(world, move);
      const evaluation = alphaBeta(newWorld, depth - 1, alpha, beta, true);
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break; // Alpha cutoff
      }
    }
    return minEval;
  }
}

export function findBestMove(world) {
  let bestMove = null;
  let bestValue = -Infinity;
  const depth = 3; 

  for (const move of getPossibleMoves(world)) {
    const newWorld = applyMove(world, move);
    const moveValue = alphaBeta(newWorld, depth, -Infinity, Infinity, false);

    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = move;
    }
  }

  return bestMove;
}