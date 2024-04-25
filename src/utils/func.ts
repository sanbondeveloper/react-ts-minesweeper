export const createBoardWithBombs = ({
  width,
  height,
  bombCount,
  x,
  y,
}: {
  width: number;
  height: number;
  bombCount: number;
  x: number;
  y: number;
}) => {
  const board = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
  const check: { [key: string]: boolean | undefined } = {};
  const bombs: [number, number][] = [];
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  let count = 0;

  while (count < bombCount) {
    const randomX = Math.floor(Math.random() * height);
    const randomY = Math.floor(Math.random() * width);

    if (randomX === x && randomY === y) continue;
    if (check[`${randomX}-${randomY}`]) continue;

    check[`${randomX}-${randomY}`] = true;
    bombs.push([randomX, randomY]);
    board[randomX][randomY] = -1;
    count += 1;
  }

  for (const [x, y] of bombs) {
    for (let k = 0; k < 8; k++) {
      const nx = x + dir[k][0];
      const ny = y + dir[k][1];

      if (nx < 0 || ny < 0 || nx >= height || ny >= width) continue;
      if (board[nx][ny] === -1) continue;

      board[nx][ny] += 1;
    }
  }

  return board;
};
