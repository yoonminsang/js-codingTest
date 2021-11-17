// 1
function solution(new_id) {
  const id = (
    new_id
      .toLowerCase()
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '') || 'a'
  )
    .slice(0, 15)
    .replace(/\.$/, '');
  return id.length <= 2 ? id + id[id.length - 1].repeat(3 - id.length) : id;
}

// 2
const getCombinations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((fixed, index) => {
    const rest = arr.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    result.push(...attached);
  });
  return result;
};

function solution(orders, course) {
  const answer = [];
  course.forEach((num) => {
    const obj = {};
    orders.forEach((order) => {
      const combinations = getCombinations(order.split('').sort(), num);
      combinations.forEach((combination) => {
        const key = combination.join('');
        if (obj[key]) obj[key]++;
        else obj[key] = 1;
      });
    });
    const arr = Object.entries(obj);
    arr.sort((a, b) => b[1] - a[1]);
    const max = arr.length && arr[0][1];
    if (max >= 2)
      for (let i = 0; i < arr.length; i++) {
        const [key, value] = arr[i];
        if (value !== max) break;
        answer.push(key);
      }
  });
  answer.sort();
  return answer;
}

// 3
function solution(info, query) {
  const answer = [];
  const obj = {};
  const languageArr = ['cpp', 'java', 'python', '-'];
  const jobArr = ['backend', 'frontend', '-'];
  const carrerArr = ['junior', 'senior', '-'];
  const foodArr = ['chicken', 'pizza', '-'];
  languageArr.forEach((language) => {
    jobArr.forEach((job) => {
      carrerArr.forEach((carrer) => {
        foodArr.forEach((food) => {
          const key = `${language} ${job} ${carrer} ${food}`;
          obj[key] = [];
        });
      });
    });
  });
  info.forEach((v) => {
    const [language, job, carrer, food, score] = v.split(' ');
    for (let a = 0; a < 2; a++) {
      for (let b = 0; b < 2; b++) {
        for (let c = 0; c < 2; c++) {
          for (let d = 0; d < 2; d++) {
            const temp = [];
            if (a) temp.push(language);
            else temp.push('-');
            if (b) temp.push(job);
            else temp.push('-');
            if (c) temp.push(carrer);
            else temp.push('-');
            if (d) temp.push(food);
            else temp.push('-');
            const key = temp.join(' ');
            obj[key].push(+score);
          }
        }
      }
    }
  });
  for (let i in obj) {
    obj[i].sort((a, b) => b - a);
  }
  query.forEach((v) => {
    const [language, job, carrer, food, score] = v
      .replace(/( and )/g, ' ')
      .split(' ');
    const key = `${language} ${job} ${carrer} ${food}`;
    const arr = obj[key];
    let left = 0,
      right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] >= score) left = mid + 1;
      else right = mid - 1;
    }
    answer.push(left);
  });
  return answer;
}

// 4
function solution(n, s, a, b, fares) {
  const arr = Array(n)
    .fill()
    .map((_, i) =>
      Array(n)
        .fill()
        .map((_, j) => (i === j ? 0 : Infinity))
    );
  fares.forEach(([from, to, weight]) => {
    arr[from - 1][to - 1] = weight;
    arr[to - 1][from - 1] = weight;
  });
  for (let mid = 0; mid < n; mid++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        arr[from][to] = Math.min(arr[from][to], arr[from][mid] + arr[mid][to]);
      }
    }
  }
  const min = [];
  for (let i = 0; i < n; i++) {
    min.push(arr[s - 1][i] + arr[i][a - 1] + arr[i][b - 1]);
  }
  return Math.min(...min);
}

// 5
const timeToSecond = (time) => {
  const [hour, minute, second] = time.split(':');
  return hour * 3600 + minute * 60 + second * 1;
};

const secondToTime = (second) => {
  const hour = Math.floor(second / 3600);
  second %= 3600;
  const minute = Math.floor(second / 60);
  second %= 60;
  return [hour, minute, second]
    .map((time) => (time < 10 ? '0' + String(time) : time))
    .join(':');
};

function solution(play_time, adv_time, logs) {
  const playTime = timeToSecond(play_time);
  const advTime = timeToSecond(adv_time);
  const startLogs = [];
  const endLogs = [];
  logs.forEach((log) => {
    const [start, end] = log.split('-');
    startLogs.push(timeToSecond(start));
    endLogs.push(timeToSecond(end));
  });
  const arr = Array(playTime).fill(0);
  startLogs.forEach((start, idx) => {
    const end = endLogs[idx];
    arr[start] += 1;
    arr[end] -= 1;
  });
  for (let i = 0; i < 2; i++) {
    for (let i = 1; i < playTime; i++) {
      arr[i] += arr[i - 1];
    }
  }
  let max = arr[advTime];
  let start = 0;
  for (let i = 0; i < playTime - advTime; i++) {
    const temp = arr[advTime + i] - arr[i];
    if (temp > max) {
      max = temp;
      start = i + 1;
    }
  }
  return secondToTime(start);
}

// 6
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
