// const distance = [
//   [-1, 0],
//   [1, 0],
//   [0, -1],
//   [0, 1],
// ];

// const bfs = (board, cursor1, cursor2) => {
//   const visited = Array(4)
//     .fill()
//     .map(() => Array(4).fill(false));
//   const queue = [];
//   queue.push(cursor1);
//   while (queue.length) {
//     const current = queue.shift();
//     const current_row = current[0],
//       current_column = current[1],
//       current_count = current[2] || 0;
//     let next_row, next_column;
//     if (current[0] === cursor2[0] && current[1] === cursor2[1]) {
//       return current_count;
//     }
//     for (let i = 0; i < 4; i++) {
//       (next_row = current_row + distance[i][0]),
//         (next_column = current_column + distance[i][1]);
//       if (next_row < 0 || next_row >= 4 || next_column < 0 || next_column >= 4)
//         continue;
//       if (!visited[next_row][next_column]) {
//         visited[next_row][next_column] = true;
//         queue.push([next_row, next_column, current_count + 1]);
//       }
//       for (let j = 0; j < 2; j++) {
//         if (board[next_row][next_row] !== 0) break;
//         (next_row = current_row + distance[i][0]),
//           (next_column = current_column + distance[i][1]);
//         if (
//           next_row < 0 ||
//           next_row >= 4 ||
//           next_column < 0 ||
//           next_column >= 4
//         )
//           break;
//       }
//       if (!visited[next_row][next_column]) {
//         visited[next_row][next_column] = true;
//         queue.push([next_row, next_column, current_count + 1]);
//       }
//     }
//   }
//   return Infinity;
// };

// const permutation = (board, cursor) => {
//   let min = Infinity;
//   for (let num = 1; num <= 6; num++) {
//     const card = [];
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 4; j++) {
//         if (board[i][j] === num) {
//           card.push([i, j]);
//         }
//       }
//     }
//     if (card.length === 0) continue;
//     const one = bfs(board, cursor, card[0]) + bfs(board, card[0], card[1]) + 2;
//     const two = bfs(board, cursor, card[1]) + bfs(board, card[1], card[0]) + 2;
//     for (let i = 0; i < 2; i++) {
//       board[card[i][0]][card[i][1]] = 0;
//     }
//     min = Math.min(
//       min,
//       one + permutation(board, card[1]),
//       two + permutation(board, card[0])
//     );
//     for (let i = 0; i < 2; i++) {
//       board[card[i][0]][card[i][1]] = num;
//     }
//   }
//   if (min === Infinity) return 0;
//   return min;
// };

// function solution(board, r, c) {
//   return permutation(board, [r, c, 0]);
// }

const result = [];

const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((fixed, index) => {
    const rest = arr.slice(0, index).concat(index + 1);
    const permutations = getPermutations(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    result.push(...attached);
  });
  return result;
};

const isMovable = (y, x) => {
  if (-1 < y && y < 4 && -1 < x && x < 4) return true;
  else return false;
};

const ctrlMove = (y, x, dy, dx, board) => {
  let ny = y,
    nx = x;
  while (true) {
    const nny = ny + dy;
    const nnx = nx + dx;
    if (!isMovable(nny, nnx)) return [ny, nx];
    if (board[nny][nnx]) return [nny, nnx];
    ny = nny;
    nx = nnx;
  }
};

const bfs = (startY, startX, endY, endX, board) => {
  if (startY === endY && startX === endX) return [startY, startX, 1];
  const queue = [];
  const table = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  const visit = Array(4)
    .fill()
    .map(() => Array(4).fill(false));

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  queue.push([startY, startX]);
  visit[startY][startX] = true;

  while (queue.length) {
    const [y, x] = queue.shift();
    for (let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];
      if (isMovable(ny, nx) && !visit[ny][nx]) {
        visit[ny][nx] = true;
        table[ny][nx] = table[y][x] + 1;
        if (ny === endY && nx === endX) return [ny, nx, table[ny][nx] + 1];
        queue.push([ny, nx]);
      }

      [ny, nx] = ctrlMove(y, x, dy[i], dx[i], board);
      if (!visit[ny][nx]) {
        visit[ny][nx] = true;
        table[ny][nx] = table[y][x] + 1;

        if (ny === endY && nx === endX) return [ny, nx, table[ny][nx] + 1];

        queue.push([ny, nx]);
      }
    }
  }
};

const remove = (card, cardPos, board) => {
  for (const [y, x] of cardPos.get(card)) {
    board[y][x] = 0;
  }
};

const restore = (card, cardPos, board) => {
  for (const [y, x] of cardPos.get(card)) {
    board[y][x] = card;
  }
};

const backTracking = (
  startY,
  startX,
  permutationsIdx,
  permutationIdx,
  count,
  board,
  cardPos,
  permutation
) => {
  if (permutationIdx === cardPos.size) {
    result.push(count);
    return;
  }

  const card = permutation[permutationIdx];
  const [firstY, firstX] = [cardPos.get(card)[0][0], cardPos.get(card)[0][1]];
  const [secondY, secondX] = [cardPos.get(card)[1][0], cardPos.get(card)[1][1]];

  let [nextY1, nextX1, jojack1] = bfs(startY, startX, firstY, firstX, board);
  let [nextY2, nextX2, jojack2] = bfs(nextY1, nextX1, secondY, secondX, board);

  remove(card, cardPos, board);
  backTracking(
    nextY2,
    nextX2,
    permutationsIdx,
    permutationIdx + 1,
    count + jojack1 + jojack2,
    board,
    cardPos,
    permutation
  );
  restore(card, cardPos, board);

  [nextY1, nextX1, jojack1] = bfs(startY, startX, secondY, secondX, board);
  [nextY2, nextX2, jojack2] = bfs(nextY1, nextY2, firstY, firstX, board);

  remove(card, cardPos, board);
  backTracking(
    nextY2,
    nextX2,
    permutationsIdx,
    permutationIdx + 1,
    count + jojack1 + jojack2,
    board,
    cardPos,
    permutation
  );
  restore(card, cardPos, board);
};

function solution(board, r, c) {
  const copyBoard = board.map((v1) => v1.map((v2) => v2));
  const cardPos = new Map();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const card = board[i][j];
      if (card) {
        if (cardPos.has(card)) {
          const prev = cardPos.get(card);
          cardPos.set(card, [...prev, [i, j]]);
        } else {
          cardPos.set(card, [[i, j]]);
        }
      }
    }
  }
  const permutations = getPermutations([...cardPos.keys()], cardPos.size);
  permutations.forEach((permutation, idx) => {
    backTracking(r, c, idx, 0, 0, copyBoard, cardPos, permutation);
  });
  console.log(result);
  return Math.min(...result);
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
    0
  )
);
