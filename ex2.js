let answer = Infinity;

function solution(board, r, c) {
  const new_board = board.slice();
  const card_pos = new Map();

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j]) {
        const card = board[i][j];
        if (card_pos.has(card)) {
          const origin = card_pos.get(card);
          card_pos.set(card, [...origin, [i, j]]);
        } else {
          card_pos.set(card, [[i, j]]);
        }
      }
    }
  }
  console.log(card_pos);

  const permutation = getPermutation([...card_pos.keys()], card_pos.size);

  for (let i = 0; i < permutation.length; i++) {
    searchMin_backtrack(r, c, 0, i, 0, new_board, card_pos, permutation);
  }

  return answer;
}

const isMovable = (y, x) => {
  if (-1 < y && y < 4 && -1 < x && x < 4) return true;
  else return false;
};

const ctrl_move = (y, x, dy, dx, board) => {
  // x, y는 현재 카드의 좌표, dx, dy는 이동 방향
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

const searchCard_bfs = (sy, sx, ey, ex, board) => {
  // 시작좌표(sx, sy)와 카드 캐릭터가 각각 위치한 종료좌표(ex, ey
  // 시작과 종료좌표가 같으면 바로 탐색을 종료할 수 있다.
  // 이 경우 현재 커서위치가 찾고자 하는 카드 바로위에 위치한 경우이다.
  if (sy === ey && sx === ex) return [sy, sx, 1];

  const queue = [];
  const table = new Array(4).fill().map((_) => new Array(4).fill(0));
  const visit = new Array(4).fill().map((_) => new Array(4).fill(false));

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  queue.push([sy, sx]);
  visit[sy][sx] = true;

  while (queue.length) {
    const [y, x] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];

      if (isMovable(ny, nx)) {
        if (!visit[ny][nx]) {
          visit[ny][nx] = true;
          table[ny][nx] = table[y][x] + 1;

          if (ny === ey && nx === ex) return [ny, nx, table[ny][nx] + 1];

          queue.push([ny, nx]);
        }
      }

      [ny, nx] = ctrl_move(y, x, dy[i], dx[i], board);

      if (!visit[ny][nx]) {
        visit[ny][nx] = true;
        table[ny][nx] = table[y][x] + 1;

        if (ny === ey && nx === ex) return [ny, nx, table[ny][nx] + 1];

        queue.push([ny, nx]);
      }
    }
  }

  return [sy, sx, Infinity];
};

const remove = (card, board, card_pos) => {
  for (const [y, x] of card_pos.get(card)) board[y][x] = 0;
};

const restore = (card, board, card_pos) => {
  for (const [y, x] of card_pos.get(card)) board[y][x] = card;
};

const searchMin_backtrack = (
  sy,
  sx,
  k,
  m,
  count,
  board,
  card_pos,
  permutation
) => {
  if (k === [...card_pos.keys()].length) {
    answer = Math.min(answer, count);
    return;
  }

  const card = permutation[m][k];
  const [ly, lx] = [card_pos.get(card)[0][0], card_pos.get(card)[0][1]];
  const [ry, rx] = [card_pos.get(card)[1][0], card_pos.get(card)[1][1]];

  let [ny1, nx1, res1] = searchCard_bfs(sy, sx, ly, lx, board);
  let [ny2, nx2, res2] = searchCard_bfs(ny1, nx1, ry, rx, board);

  remove(card, board, card_pos);
  searchMin_backtrack(
    ny2,
    nx2,
    k + 1,
    m,
    count + res1 + res2,
    board,
    card_pos,
    permutation
  );
  restore(card, board, card_pos);

  [ny1, nx1, res1] = searchCard_bfs(sy, sx, ry, rx, board);
  [ny2, nx2, res2] = searchCard_bfs(ny1, nx1, ly, lx, board);

  remove(card, board, card_pos);
  searchMin_backtrack(
    ny2,
    nx2,
    k + 1,
    m,
    count + res1 + res2,
    board,
    card_pos,
    permutation
  );
  restore(card, board, card_pos);
};

const getPermutation = (arr, n) => {
  if (n === 1) return arr.map((el) => [el]);
  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = [...origin.slice(0, idx), ...origin.slice(idx + 1)];
    const perms = getPermutation(rest, n - 1);
    const attached = perms.map((perm) => [fixed, ...perm]);
    result.push(...attached);
  });

  return result;
};

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
