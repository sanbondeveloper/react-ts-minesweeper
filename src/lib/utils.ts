import { BOARD_STATUS, NEIGHBORS } from './constants';

function shuffleArray(array: number[][]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function generateRandomCoordinates(height: number, width: number, exclude: number[][]) {
  const coordinates = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const index = exclude.findIndex(([x, y]) => x === i && y === j);

      if (index === -1) coordinates.push([i, j]);
    }
  }

  return shuffleArray(coordinates);
}

export function createBoardWithBombs({
  board,
  bombCount,
  x,
  y,
}: {
  board: number[][];
  bombCount: number;
  x: number;
  y: number;
}) {
  const N = board.length;
  const M = board[0].length;
  const result = [...board.map((row) => [...row])];
  const bombs: [number, number][] = [];
  const exclude = [[x, y]];

  NEIGHBORS.forEach(([wx, wy]) => {
    const nx = x + wx;
    const ny = y + wy;

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) return;

    exclude.push([nx, ny]);
  });

  const randomCoordinates = generateRandomCoordinates(N, M, exclude);

  for (let i = 0; i < bombCount; i++) {
    const [x, y] = randomCoordinates[i];

    result[x][y] = BOARD_STATUS.BOMB;
    bombs.push([x, y]);
  }

  for (const [x, y] of bombs) {
    NEIGHBORS.forEach(([wx, wy]) => {
      const nx = x + wx;
      const ny = y + wy;

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) return;
      if (result[nx][ny] === BOARD_STATUS.BOMB) return;

      result[nx][ny] += 1;
    });
  }

  return result;
}

export function initOpen({
  board,
  boardStatus,
  x: i,
  y: j,
}: {
  board: number[][];
  boardStatus: number[][];
  x: number;
  y: number;
}) {
  const N = board.length;
  const M = board[0].length;
  const queue: [x: number, y: number][] = [[i, j]];
  const result = [...boardStatus.map((row) => [...row])];

  result[i][j] = BOARD_STATUS.OPEN;

  while (queue.length > 0) {
    const [x, y] = queue.shift() as [x: number, y: number];

    NEIGHBORS.forEach(([wx, wy]) => {
      const nx = x + wx;
      const ny = y + wy;

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) return;
      if (result[nx][ny] === BOARD_STATUS.OPEN || board[nx][ny] === BOARD_STATUS.BOMB) return;

      result[nx][ny] = BOARD_STATUS.OPEN;

      if (board[nx][ny] === 0) {
        queue.push([nx, ny]);
      }
    });
  }

  return result;
}
