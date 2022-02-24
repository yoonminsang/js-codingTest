const answer = [];

const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((fixed, index) => {
    const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];
    const permutations = getPermutations(rest, selectNumber - 1);
    result.push(...permutations.map((permutation) => [fixed, ...permutation]));
  });
  return result;
};

const makeCardObj = (board) => {
  const cards = [...new Set(board.flat())];
  const cardObj = cards.reduce((acc, cur) => {
    if (cur > 0) acc[cur] = [];
    return acc;
  }, {});
  board.forEach((boardRow, row) => {
    boardRow.forEach((card, column) => {
      if (card > 0) cardObj[card].push([row, column]);
    });
  });
  return cardObj;
};

const isMovable = (y, x) => {
  if (y < 0 || y >= 4 || x < 0 || x >= 4) return false;
  return true;
};

const ctrlMove = (y, x, dy, dx, board) => {
  let [nextY, nextX] = [y, x];
  while (true) {
    const [moveY, moveX] = [nextY + dy, nextX + dx];
    if (!isMovable(moveY, moveX)) return [nextY, nextX];
    if (board[moveY][moveX] > 0) return [moveY, moveX];
    [nextY, nextX] = [moveY, moveX];
  }
};

const searchCardBfs = (startY, startX, endY, endX, board) => {
  if (startY === endY && startX === endX) return [startY, startX, 1];
  const clickArr = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  const visitArr = Array(4)
    .fill()
    .map(() => Array(4).fill(false));
  const dy = [1, -1, 0, 0];
  const dx = [0, 0, -1, 1];
  const queue = [startY, startX];
  while (queue.length) {
    const [y, x] = queue.shift();
    for (let i = 0; i < 4; i++) {
      // 1칸
      let [nextY, nextX] = [y + dy[i], x + dx[i]];
      if (isMovable(nextY, nextX)) {
        if (!visitArr[nextY][nextX]) {
          visitArr[nextY][nextX] = true;
          clickArr[nextY][nextX] = table[y][x] + 1;
          if (nextY === endY && nextX === endX) return [nextY, nextX, table[nextY][nextX] + 1];
          queue.push([nextY, nextX]);
        }
      }
      // ctrl
      [ny, nx] = ctrlMove(y, x, dy[i], dx[i], board);
      if (!visitArr[nextY][nextX]) {
        visitArr[nextY][nextX] = true;
        clickArr[nextY][nextX] = table[y][x] + 1;
        if (nextY === endY && nextX === endX) return [nextY, nextX, table[nextY][nextX] + 1];
        queue.push([nextY, nextX]);
      }
    }
  }
};

const remove = (card, board, cardObj) => {
  for (const [y, x] of cardObj[card]) {
    board[y][x] = 0;
  }
};

const restore = (card, board, cardObj) => {
  for (const [y, x] of cardObj[card]) {
    board[y][x] = card;
  }
};

const searchMinBackTracking = () => {};

function solution(board, y, x) {
  const cardObj = makeCardObj(board);
  const cards = Object.keys(cardObj).map((v) => +v);
  console.log(cards, cards.length, cardObj);
  const permutations = getPermutations(cards, cards.length);
  console.log(permutations);
  return Math.min(...answer);
}

console.log(
  solution(
    [
      [1, 0, 0, 3],
      [2, 0, 0, 0],
      [0, 0, 0, 2],
      [3, 0, 1, 0],
    ],
    1,
    0,
  ),
);
