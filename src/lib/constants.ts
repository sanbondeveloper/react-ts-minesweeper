export const LEVEL_SIZE = {
  Beginner: [8, 8, 10],
  Intermediate: [16, 16, 40],
  Expert: [16, 32, 100],
};

export const BOARD_STATUS = {
  BOMB: -1,
  OPEN: 0,
  CLOSE: 1,
  FLAG: 2,
  RED: 3,
  NOTBOMB: 4,
  BLUE: 5,
};

export const NEIGHBORS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];
