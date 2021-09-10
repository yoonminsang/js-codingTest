const answer = [];

const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((fixed, index) => {
    const rest = arr.slice(0, index).concat(arr.slice(index + 1));
    const permutations = getPermutations(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    result.push(...attached);
  });
  return result;
};

// 이동하려는 좌표가 공간 내부인지 점검하는 함수
// 내부에 있다면 true, 벗어나는 경우 false 반환
const isMovable = (y, x) => {
  if (-1 < y && y < 4 && -1 < x && x < 4) return true;
  else return false;
};

// ctrl + 방향키 이동
// 입력된 방향과 가장 가까이 있는 카드 좌표 반환
const ctrlMove = (y, x, dy, dx, board) => {
  // x, y는 현재 카드의 좌표, dx, dy는 이동 방향
  let ny = y,
    nx = x;
  while (true) {
    // 따라서 nnx, nny는 이동방향이 적용된 후 좌표
    const nny = ny + dy;
    const nnx = nx + dx;
    // 해당 이동방향으로 갈 수 없다면 현재 좌표 반환
    if (!isMovable(nny, nnx)) return [ny, nx];
    // 이동 방향 좌표에 카드가 있다면 해당 좌표 반환
    if (board[nny][nnx]) return [nny, nnx];
    // 카드가 없는 경우 동일한 방향으로 계속 진행해야 하므로
    // 현재 좌표값을 이동방향이 적용된 좌표로 갱신 후
    // 다음 계산에 이용하며 계속 진행
    ny = nny;
    nx = nnx;
  }
};

const searchCardBfs = (startY, startX, endY, endX, board) => {
  if (startY === endY && startX === endX) return [startY, startX, 1];

  const queue = [];
  // 조작 횟수를 저장할 table 선언, board의 크기와 동일
  // 따라서 table[y][x] 값으로 현재 카드값에 접근 가능
  // 다음에 이동할 좌표에 현재 좌표 값 + 1 을 통해
  // 조작 횟수 저장 가능
  const table = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  // 방문 여부 체크를 위한 배열 선언
  const visit = Array(4)
    .fill()
    .map(() => Array(4).fill(false));

  // 상하좌우 이동방향 좌표값
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  queue.push([startY, startX]);
  visit[startY][startX] = true;
  while (queue.length) {
    const [y, x] = queue.shift();
    // dx, dy 값에 따라 상하좌우 이동을 위한 반복
    for (let i = 0; i < 4; i++) {
      // ny, nx는 매 반복마다 상하좌우로 이동한 후 좌표
      let ny = y + dy[i];
      let nx = x + dx[i];
      // 해당 좌표로 이동이 가능하고
      if (isMovable(ny, nx)) {
        // 아직 해당 좌표에 방문을 하지 않았다면
        if (!visit[ny][nx]) {
          // 해당 좌표 방문체크 후
          visit[ny][nx] = true;
          // 해당 좌표 값을 이전 좌표 값+1로 갱신
          // 이는 이전 좌표에서 해당 좌표로 이동하는데 소요된 1번의 조작횟수를 의미
          table[ny][nx] = table[y][x] + 1;

          // 만약 이동한 좌표가 도착지점과 같다면
          if (ny === endY && nx === endX)
            // 좌표값과 해당좌표까지의 조작횟수+1을 반환 후 종료
            // +1을 하는 이유는 엔터를 눌러 뒤집기 때문
            return [ny, nx, table[ny][nx] + 1];

          // 조건에 만족하지 않는 다면 계속 BFS 탐색
          queue.push([ny, nx]);
        }
      }

      // 위에서는 상하좌우 1칸씩 이동하는 경우를 체크
      // 이번엔 ctrl + 방향키 좌표를 적용
      [ny, nx] = ctrlMove(y, x, dy[i], dx[i], board);

      // ctrlMove는 항상 공간 범위를 벗어나지 않으니
      // 별도로 이동이 가능한지 isMovable로 체크할 필요 없음
      // 나머지 로직은 위와 동일
      if (!visit[ny][nx]) {
        visit[ny][nx] = true;
        table[ny][nx] = table[y][x] + 1;

        if (ny === endY && nx === endX) return [ny, nx, table[ny][nx] + 1];

        queue.push([ny, nx]);
      }
    }
  }
};

const remove = (card, board, cardPos) => {
  for (const [y, x] of cardPos.get(card)) {
    board[y][x] = 0;
  }
};

const restore = (card, board, cardPos) => {
  for (const [y, x] of cardPos.get(card)) {
    board[y][x] = card;
  }
};

const searchMinBacktrack = (
  startY,
  startX,

  permutationIdx,
  count,
  board,
  cardPos,
  permutation
) => {
  // if (permutationIdx === [...cardPos.keys()].length) {
  if (permutationIdx === cardPos.size) {
    // answer = Math.min(answer, count);
    answer.push(count);
    return;
  }
  const card = permutation[permutationIdx]; // 현재 선택한 카드
  const [ly, lx] = [cardPos.get(card)[0][0], cardPos.get(card)[0][1]];
  const [ry, rx] = [cardPos.get(card)[1][0], cardPos.get(card)[1][1]];

  // 현재 커서 (startY, startX)에서 카드의 (ly, lx) 좌표 선 방문 후 해당 위치에서 다시 (ry, rx) 좌표 방문
  // 이때 res1 + res2가 최소 조작 횟수가 됨
  let [ny1, nx1, res1] = searchCardBfs(startY, startX, ly, lx, board);
  let [ny2, nx2, res2] = searchCardBfs(ny1, nx1, ry, rx, board);

  // 위에서 선택한 카드를 뒤집고
  remove(card, board, cardPos);
  // 위에서 방문을 마친 좌표(ny2, nx2)를 커서의 위치로 하여 재귀호출
  // deps가 1만큼 깊어지므로 permutationIdx + 1, 횟수는 count += res1 + res2
  searchMinBacktrack(
    ny2,
    nx2,

    permutationIdx + 1,
    count + res1 + res2,
    board,
    cardPos,
    permutation
  );
  // 재귀 호출이 끝나면 원상 복구
  // 호출이 끝나는 시점은 현재 차례의 순열의 모든 원소를 방문 완료한 시점
  restore(card, board, cardPos);

  // 현재 커서 (startY, startX)에서 카드의 (ry, rx) 좌표 방문 후 해당 위치에서 다시 (ly, lx) 좌표 방문
  [ny1, nx1, res1] = searchCardBfs(startY, startX, ry, rx, board);
  [ny2, nx2, res2] = searchCardBfs(ny1, nx1, ly, lx, board);

  // 위의 로직과 동일
  remove(card, board, cardPos);
  searchMinBacktrack(
    ny2,
    nx2,

    permutationIdx + 1,
    count + res1 + res2,
    board,
    cardPos,
    permutation
  );
  restore(card, board, cardPos);
};

function solution(board, r, c) {
  const copyBoard = board.map((v1) => v1.map((v2) => v2));
  const cardPos = new Map();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const card = board[i][j];
      if (card) {
        if (cardPos.has(card)) {
          const prevCard = cardPos.get(card);
          cardPos.set(card, [...prevCard, [i, j]]);
        } else {
          cardPos.set(card, [[i, j]]);
        }
      }
    }
  }
  const permutations = getPermutations([...cardPos.keys()], cardPos.size);
  permutations.forEach((permutation) => {
    searchMinBacktrack(r, c, 0, 0, copyBoard, cardPos, permutation);
  });
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
    0
  )
);
