// 해설
// https://tech.kakao.com/2021/01/25/2021-kakao-recruitment-round-1/

// https://programmers.co.kr/learn/courses/30/lessons/72410
// 1. 신규 아이디 추천
// 정규식
function solution(new_id) {
  let replaceId =
    new_id
      .toLowerCase()
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '')
      .slice(0, 15)
      .replace(/\.$/, '') || 'a';
  if (replaceId.length <= 2) replaceId += replaceId[replaceId.length - 1].repeat(3 - replaceId.length);
  return replaceId;
}

// https://programmers.co.kr/learn/courses/30/lessons/72411
// 2. 메뉴 리뉴얼
// 순열 조합, sort
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
  orders = orders.map((v) => v.split('').sort());
  course.forEach((selectNumber) => {
    const orderObj = {};
    orders.forEach((order) => {
      const combinations = getCombinations(order, selectNumber);
      combinations.forEach((combination) => {
        const key = combination.join('');
        if (orderObj[key]) orderObj[key]++;
        else orderObj[key] = 1;
      });
    });
    const orderEntries = Object.entries(orderObj);
    orderEntries.sort((a, b) => b[1] - a[1]);
    const max = orderEntries.length && orderEntries[0][1];
    if (max > 1) {
      let i = 0;
      while (orderEntries[i][1] === max) {
        answer.push(orderEntries[i][0]);
        i++;
      }
    }
  });
  return answer.sort();
}

// https://programmers.co.kr/learn/courses/30/lessons/72412
// 3. 순위 검색
// 시간 복잡도를 줄이는 방법, 부가적으로 등장하는 이진탐색
const makeInfoObj = () => {
  const languageArr = ['cpp', 'java', 'python', '-'];
  const jobArr = ['backend', 'frontend', '-'];
  const carrerArr = ['junior', 'senior', '-'];
  const foodArr = ['chicken', 'pizza', '-'];
  const infoObj = {};
  languageArr.forEach((language) => {
    jobArr.forEach((job) => {
      carrerArr.forEach((carrer) => {
        foodArr.forEach((food) => {
          const key = [language, job, carrer, food].join(' ');
          infoObj[key] = [];
        });
      });
    });
  });
  return infoObj;
};

const insertInfo = (infoObj, infoArr) => {
  infoArr.forEach((v) => {
    const [language, job, carrer, food, score] = v.split(' ');
    const languageArr = [language, '-'];
    const jobArr = [job, '-'];
    const carrerArr = [carrer, '-'];
    const foodArr = [food, '-'];
    languageArr.forEach((language) => {
      jobArr.forEach((job) => {
        carrerArr.forEach((carrer) => {
          foodArr.forEach((food) => {
            const key = [language, job, carrer, food].join(' ');
            infoObj[key].push(+score);
          });
        });
      });
    });
  });
};

const countValidation = (query, infoObj, countArr) => {
  const [language, job, carrer, rest] = query.split(' and ');
  const [food, score] = rest.split(' ');
  const key = [language, job, carrer, food].join(' ');
  // console.log(infoObj[key],score);
  const arr = infoObj[key];
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] >= score) l = m + 1;
    else r = m - 1;
  }
  countArr.push(l);
};

function solution(info, query) {
  const answer = [];
  const infoObj = makeInfoObj();
  insertInfo(infoObj, info);
  for (const key in infoObj) {
    infoObj[key].sort((a, b) => b - a);
  }
  query.forEach((v) => {
    countValidation(v, infoObj, answer);
  });
  return answer;
}

// 4. 합승택시요금
// https://programmers.co.kr/learn/courses/30/lessons/72413
// 다익스트라 응용문제
function solution(n, s, a, b, fares) {
  const distance = Array(n)
    .fill()
    .map((_, i) =>
      Array(n)
        .fill()
        .map((__, j) => (i === j ? 0 : Infinity)),
    );
  fares.forEach((fare) => {
    const [from, to, weight] = fare;
    distance[from - 1][to - 1] = weight;
    distance[to - 1][from - 1] = weight;
  });
  for (let mid = 0; mid < n; mid++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        distance[from][to] = Math.min(distance[from][to], distance[from][mid] + distance[mid][to]);
      }
    }
  }
  const arr = [];
  for (let i = 0; i < n; i++) {
    const distFromS = distance[i][s - 1];
    const distFromA = distance[i][a - 1];
    const distFromB = distance[i][b - 1];
    const sum = distFromS + distFromA + distFromB;
    arr.push(sum);
  }
  return Math.min(...arr);
}

// 5. 광고삽입
// https://programmers.co.kr/learn/courses/30/lessons/72414
const timeToSecond = (time) => {
  const [hour, minute, second] = time.split(':');
  return hour * 3600 + minute * 60 + second * 1;
};

const secondToTime = (second) => {
  const hour = Math.floor(second / 3600);
  second %= 3600;
  const minute = Math.floor(second / 60);
  second %= 60;
  return [hour, minute, second].map((v) => (v < 10 ? '0' + String(v) : v)).join(':');
};

function solution(play_time, adv_time, logs) {
  const playTimeToSecond = timeToSecond(play_time);
  const advTimeToSecond = timeToSecond(adv_time);
  const arr = Array(playTimeToSecond).fill(0);
  // 시작과 끝점에 +, -
  logs.forEach((log) => {
    const [from, to] = log.split('-');
    arr[timeToSecond(from)]++;
    arr[timeToSecond(to)]--;
  });
  // 각 초에 실행되는 광고 숫자
  for (let i = 1; i < arr.length; i++) {
    arr[i] += arr[i - 1];
  }
  // 누적된 광고 숫자
  for (let i = 1; i < arr.length; i++) {
    arr[i] += arr[i - 1];
  }
  let maxSecond = arr[advTimeToSecond];
  let maxStartSecond = 0;
  for (let i = 0; i < playTimeToSecond - advTimeToSecond; i++) {
    const accSecond = arr[i + advTimeToSecond] - arr[i];
    if (accSecond > maxSecond) {
      maxSecond = accSecond;
      maxStartSecond = i + 1;
    }
  }
  return secondToTime(maxStartSecond);
}

// 6. 카드 짝 맞추기
// https://programmers.co.kr/learn/courses/30/lessons/72415

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
  const queue = [[startY, startX]];
  visitArr[startY][startX] = true;
  while (queue.length) {
    const [y, x] = queue.shift();
    for (let i = 0; i < 4; i++) {
      // 1칸
      let [nextY, nextX] = [y + dy[i], x + dx[i]];
      if (isMovable(nextY, nextX)) {
        if (!visitArr[nextY][nextX]) {
          visitArr[nextY][nextX] = true;
          clickArr[nextY][nextX] = clickArr[y][x] + 1;
          if (nextY === endY && nextX === endX) return [nextY, nextX, clickArr[nextY][nextX] + 1];
          queue.push([nextY, nextX]);
        }
      }
      // ctrl
      [nextY, nextX] = ctrlMove(y, x, dy[i], dx[i], board);
      if (!visitArr[nextY][nextX]) {
        visitArr[nextY][nextX] = true;
        clickArr[nextY][nextX] = clickArr[y][x] + 1;
        if (nextY === endY && nextX === endX) return [nextY, nextX, clickArr[nextY][nextX] + 1];
        queue.push([nextY, nextX]);
      }
    }
  }
  return [startY, startX, Infinity];
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

const searchMinBackTracking = ({ startY, startX, permutationIndex, count, board, cardObj, permutation }) => {
  if (permutationIndex === Object.keys(cardObj).length) {
    answer.push(count);
    return;
  }

  const card = permutation[permutationIndex]; // 현재 선택한 카드
  const [y1, x1] = [cardObj[card][0][0], cardObj[card][0][1]]; // 현재 선택한 카드의 1번 좌표
  const [y2, x2] = [cardObj[card][1][0], cardObj[card][1][1]]; // 현재 선택한 카드의 2번 좌표

  let [nextY1, nextX1, count1] = searchCardBfs(startY, startX, y1, x1, board);
  let [nextY2, nextX2, count2] = searchCardBfs(nextY1, nextX1, y2, x2, board);

  remove(card, board, cardObj);
  searchMinBackTracking({
    startY: nextY2,
    startX: nextX2,
    permutationIndex: permutationIndex + 1,
    count: count + count1 + count2,
    board,
    cardObj,
    permutation,
  });
  restore(card, board, cardObj);

  [nextY1, nextX1, count1] = searchCardBfs(startY, startX, y2, x2, board);
  [nextY2, nextX2, count2] = searchCardBfs(nextY1, nextX1, y1, x1, board);

  remove(card, board, cardObj);
  searchMinBackTracking({
    startY: nextY2,
    startX: nextX2,

    permutationIndex: permutationIndex + 1,
    count: count + count1 + count2,
    board,
    cardObj,
    permutation,
  });
  restore(card, board, cardObj);
};

function solution(board, y, x) {
  const cardObj = makeCardObj(board);
  const cards = Object.keys(cardObj).map((v) => +v);
  const permutations = getPermutations(cards, cards.length);
  const copyBoard = board.map((boardRow) => boardRow.slice());
  permutations.forEach((permutation) => {
    searchMinBackTracking({
      startY: y,
      startX: x,
      permutationIndex: 0,
      count: 0,
      board: copyBoard,
      cardObj,
      permutation,
    });
  });
  return Math.min(...answer);
}
