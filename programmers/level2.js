// 어렵거나 중요한 문제는 ★ ctl+f 로 찾기

// 다리를 지나느 트럭 / 스택큐 ★
// https://programmers.co.kr/learn/courses/30/lessons/42583
// 괜찮은 큐문제
function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  const queue = Array(bridge_length).fill(0);
  while (truck_weights.length > 0) {
    queue.shift();
    const sum = queue.reduce((acc, cur) => acc + cur, 0);
    if (truck_weights[0] + sum <= weight) queue.push(truck_weights.shift());
    else queue.push(0);
    time++;
  }
  return time + bridge_length;
}

// 프린터 / 스택큐
// https://programmers.co.kr/learn/courses/30/lessons/42587
function solution(priorities, location) {
  const obj = priorities.map((v, i) => [i, v]);
  let count = 0;
  while (true) {
    const max = Math.max(...obj.map((v) => v[1]));
    if (obj[0][1] === max) {
      count++;
      if (obj[0][0] === location) return count;
      obj.shift();
    } else {
      obj.push(obj.shift());
    }
  }
}

// 기능개발 / 스택큐
// https://programmers.co.kr/learn/courses/30/lessons/42586
function solution(progresses, speeds) {
  let need_day = progresses.map((v, i) => Math.ceil((100 - v) / speeds[i]));
  const answer = [0];
  const last_day = need_day[0];
  for (let i = 0; i < need_day.length; i++) {
    if (last_day < need_day[i]) {
      answer.push(1);
      last_day = need_day[i];
    } else {
      answer[answer.length - 1]++;
    }
  }
  return answer;
}

// 124나라의 숫자
// https://programmers.co.kr/learn/courses/30/lessons/12899
// 인덱스가 삼진법과 1다른게 조금 헷갈리는 문제다. 처음에 틀려서 당황...
function solution(n) {
  const arr = [4, 1, 2];
  let answer = '';
  while (n > 0) {
    answer = arr[n % 3] + answer;
    n = Math.floor((n - 1) / 3);
  }
  return answer;
}

// 삼각달팽이 ★
// https://programmers.co.kr/learn/courses/30/lessons/68645
// 흔한 문제. 인덱스에 대해 이해하고 있다면 식만 길지 간단하게 풀린다.
function solution(n) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(Array(i).fill(0));
  }
  let num = 1;
  let top = 0,
    bottom = n - 1,
    left = 0,
    right = n - 1,
    up; // up은 위로 올라갈때 필요
  while (num <= (n * (n + 1)) / 2) {
    // 아래로
    for (let i = top; i <= bottom; i++) {
      arr[i][left] = num++;
    }
    top++;
    left++;
    // 오른쪽으로
    for (let i = left; i <= right; i++) {
      arr[bottom][i] = num++;
    }
    bottom--;
    right--;
    // 위로
    up = bottom;
    for (let i = right; i >= left; i--) {
      arr[up--][i] = num++;
    }
    top++;
    right--;
  }
  return arr.flat();
}

// 가장 큰 수 / 정렬
// https://programmers.co.kr/learn/courses/30/lessons/42746
// 예외 항상 생각 차분하게 천천히 문제다 일기
function solution(numbers) {
  const answer = numbers
    .map((v) => v + '')
    .sort((a, b) => Number(b + a - (a + b)))
    .join('');
  return answer[0] === '0' ? '0' : answer;
}

// 큰수 만들기 / 탐욕법 ★
// https://programmers.co.kr/learn/courses/30/lessons/42883
// 좀 많이 어려운 문제.. 게다가 예외처리도 있다.
// 예외는 99999~~가 나오는 경우
function solution(number, k) {
  let head = 0;
  let del = k;
  const answer = [];
  while (head < number.length) {
    if (del > 0 && answer[answer.length - 1] < number[head]) {
      answer.pop();
      del--;
    } else {
      answer.push(number[head++]);
    }
  }
  return answer.join('').slice(0, number.length - k);
}

// 조이스탁 / 탕욕법 ★
// https://programmers.co.kr/learn/courses/30/lessons/42860
// 이것도 좀 머리를 써야되는 문제다. 탐욕법이 좀 어렵네...
function solution(name) {
  let count = 0;
  let completeH = 0;
  let completeT = 0;
  let complete = 0;
  let index = 0;
  let direction = true;
  while (name.length !== complete) {
    // 현재 인덱스 문자 변환
    const aski = name.charCodeAt(index);
    if (aski <= 77) count += aski - 65;
    else count += 91 - aski;
    direction ? completeH++ : completeT++;
    complete++;

    // 다음에 A가 몇 개 오는지 확인
    const P_OR_M = direction ? 1 : -1;
    let tempIndex = index + P_OR_M;
    let aCount = 0;
    while (name.charCodeAt(tempIndex) === 65) {
      aCount++;
      tempIndex += P_OR_M;
    }

    // A가 오는 개수와 완성되지 않은 문자의 개수가 같다면 break
    if (aCount === name.length - complete) break;

    // 방향 정하기 if 방향 그대로 else 방향 반대로
    if (aCount < complete) {
      direction ? index++ : index--;
      count++;
    } else {
      direction ? (index = name.length - 1 - completeT) : completeH;
      count += complete;
      direction = !direction;
    }
  }
  return count;
}

// 소수 찾기 / 완전탐색 ★
// https://programmers.co.kr/learn/courses/30/lessons/42839
// 순열 조합을 구하는 건 조금 어렵다.
// 코드량을 줄이기보다는 가독성이 좋은 코드를 짤려고 노력했다.
const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((i) => [i]); // 1개씩 선택한다면 모든 배열의 원소를 return한다.
  const results = [];
  arr.forEach((fixed, index) => {
    const rest = arr.slice(0, index).concat(arr.slice(index + 1)); // fixed를 제외한 나머지 배열(순열)
    const permutations = getPermutations(rest, selectNumber - 1); // rest에 대한 순열을 구한다.
    const attached = permutations.map((permutation) => [fixed, ...permutation]); // fixed와 rest에 대한 조합을 붙인다.
    results.push(...attached); // result 배열에 push
  });
  return results;
};

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

function solution(numbers) {
  let permutation = [];
  for (let i = 1; i <= numbers.length; i++) {
    permutation.push(...getPermutations(numbers.split(''), i));
  }
  permutation = permutation.map((v) => +v.join(''));
  permutation = [...new Set(permutation)];
  return permutation.reduce((acc, cur) => {
    return isPrime(cur) ? acc + 1 : acc;
  }, 0);
}

// H-Index
// https://programmers.co.kr/learn/courses/30/lessons/42747
// 배열안에 값이 없을 수도 있다고 생각해야 한다.
function solution(citations) {
  citations.sort((a, b) => b - a);
  for (let i = citations.length; i >= 0; i--) {
    let count = 0;
    for (let j = 0; j < citations.length; j++) {
      if (citations[j] < i) break;
      count++;
    }
    if (count >= i) return i;
  }
  return citations.length;
}

// 구명보트 / 탐욕법
// https://programmers.co.kr/learn/courses/30/lessons/42885
function solution(people, limit) {
  people.sort((a, b) => b - a);
  let count = 0;
  let completeL = 0,
    completeR = 0;
  while (completeL + completeR < people.length) {
    if (people[completeL] + people[people.length - 1 - completeR] <= limit)
      completeR++;
    completeL++;
    count++;
  }
  return count;
}

// 위장 / 해시
// https://programmers.co.kr/learn/courses/30/lessons/42578
// 좋은 코드는 가독성이 좋은 코드다.
// 마지막에 -1은 아무것도 안입는 경우를 제외해야 해서
function solution(clothes) {
  let answer = 1;
  let obj = {};
  clothes.forEach((v) => {
    if (obj[v[1]]) obj[v[1]]++;
    else obj[v[1]] = 1;
  });
  for (let key in obj) {
    answer *= obj[key] + 1;
  }
  return answer - 1;
}

// 카펫 / 완전탐색
// https://programmers.co.kr/learn/courses/30/lessons/42842
function solution(brown, yellow) {
  for (let yellow_y = 1; yellow_y <= yellow; yellow_y++) {
    if (yellow % yellow_y !== 0) continue;
    const yellow_x = yellow / yellow_y;
    if (yellow_y * 2 + (yellow_x + 2) * 2 === brown)
      return [yellow_x + 2, yellow_y + 2];
  }
}

// 타겟 넘버 / 깊이/너비 우선 탐색(DFS/BFS)
// https://programmers.co.kr/learn/courses/30/lessons/43165
// 간단한 dfs 문제
function solution(numbers, target) {
  let answer = 0;
  function dfs(index, sum) {
    if (index === numbers.length) {
      if (sum === target) answer++;
      return;
    }
    dfs(index + 1, sum + numbers[index]);
    dfs(index + 1, sum - numbers[index]);
  }
  dfs(0, 0);
  return answer;
}

// 쿼드압축 후 개수 세기 / 월간 코드 챌린지 시즌1 ★
// https://programmers.co.kr/learn/courses/30/lessons/68936
// 그냥 풀었는데 풀렸다..
function solution(arr) {
  const answer = [0, 0];
  const divide = (arr, rowStart, colStart, len, answer) => {
    let count = 0;
    for (let i = rowStart; i < rowStart + len; i++) {
      for (let j = colStart; j < colStart + len; j++) {
        count += arr[i][j];
      }
    }
    if (count === len * len) answer[1]++;
    else if (count === 0) answer[0]++;
    else {
      len /= 2;
      divide(arr, rowStart, colStart, len, answer);
      divide(arr, rowStart, colStart + len, len, answer);
      divide(arr, rowStart + len, colStart, len, answer);
      divide(arr, rowStart + len, colStart + len, len, answer);
    }
  };
  divide(arr, 0, 0, arr.length, answer);
  return answer;
}

// 가장 큰 정사각형 찾기 ★
// https://programmers.co.kr/learn/courses/30/lessons/12905
// 어려워서 못품
// 그냥 생각을 잘 해야 풀수있다...
// 효율성이 애매해서 flat으로 max쓰면 실패하고 map 두번쓰면 성공한다.
// 그래서 그냥 if문을 추가했는데 1부터 시작하는 거라서 길이가 1인경우에 예외처리를 해야한다.
function solution(board) {
  let answer = 0;
  if (board[0][0] === 1) answer = 1;
  for (let i = 1; i < board.length; i++) {
    for (let j = 1; j < board[0].length; j++) {
      if (board[i][j] > 0) {
        board[i][j] =
          Math.min(board[i - 1][j - 1], board[i - 1][j], board[i][j - 1]) + 1;
        if (answer < board[i][j]) answer = board[i][j];
      }
    }
  }
  return answer ** 2;
  // return Math.max(...board.flat()) ** 2;
  // return Math.max(...board.map(v=>Math.max(...v)))**2;
}

// 올바른 괄호
// https://programmers.co.kr/learn/courses/30/lessons/12909
// 위는 단순 비교, 아래는 스택 사용
function solution(s) {
  let count = 0;
  let i = 0;
  do {
    if (s[i] === '(') count++;
    else count--;
    i++;
  } while (count >= 0 && i < s.length);
  return count === 0;
}

function solution(s) {
  const arr = [];
  for (let i = 0; i < s.length; i++) {
    if (arr[arr.length - 1] === '(' && s[i] === ')') {
      arr.pop();
    } else {
      arr.push(s[i]);
    }
  }
  return arr.length === 0;
}

// 다음 큰 숫자
// https://programmers.co.kr/learn/courses/30/lessons/12911
// 정규식 기억. filter.length도 가능하다.
function solution(n) {
  let biLen = n.toString(2).match(/1/g).length;
  while (n++) {
    if (biLen === n.toString(2).match(/1/g).length) return n;
  }
}

// 땅따먹기 ★
// https://programmers.co.kr/learn/courses/30/lessons/12913
// 일단 직관적으로 처음부터 최댓값을 계속 찾아가면 어떨까 하는 생각을 하게된다.
// 그런데 인접한 행에서 최댓값의 열이 같다면 문제가 발생한다.
// 결국 모든 경우를 다 따져야 하는데 그러면 시간복잡도가 너무 커진다. 대충 O(n^2)
// 잘 생각해보면 현재 행의 열 + 이전까지 행의 최댓값(현재 행의 열 제외)을 계속해서 더해나가면
// 시간복자도를 줄이면서 최댓값을 구할 수 있다.
// 코드로보면 이해가 빠르다. 설명하기 어려운 부분이라
function solution(land) {
  return Math.max(
    ...land.reduce(
      (acc, cur) => [
        cur[0] + Math.max(acc[1], acc[2], acc[3]),
        cur[1] + Math.max(acc[0], acc[2], acc[3]),
        cur[2] + Math.max(acc[0], acc[1], acc[3]),
        cur[3] + Math.max(acc[0], acc[1], acc[2]),
      ],
      [0, 0, 0, 0]
    )
  );
}

// 게임 맴 최단거리 ★
// https://programmers.co.kr/learn/courses/30/lessons/1844
// 이거 풀수있는데 어려워 bfs
// momveY, X로 코드 가독성, 단순화. 이거안하면 코드가 4배 더 생겨
function solution(maps) {
  const queue = [[0, 0, 1]];
  const moveY = [-1, 0, 0, 1],
    moveX = [0, -1, 1, 0]; // 좌 상 하 우
  while (queue.length) {
    const y = queue[0][0],
      x = queue[0][1],
      count = queue[0][2];
    queue.shift();
    if (y === maps.length - 1 && x === maps[0].length - 1) return count;
    for (let i = 0; i < 4; i++) {
      const yy = moveY[i] + y,
        xx = moveX[i] + x;
      if (yy < 0 || xx < 0 || yy >= maps.length || xx >= maps[0].length)
        continue;
      if (maps[yy][xx] === 2) continue;
      if (maps[yy][xx] === 0) continue;
      maps[yy][xx] = 2;
      queue.push([yy, xx, count + 1]);
    }
  }
  return -1;
}

// 숫자의 표현
// https://programmers.co.kr/learn/courses/30/lessons/12924#
function solution(n) {
  let answer = 1;
  for (let i = 1; i < n / 2; i++) {
    let temp = i;
    let sum = temp;
    while (sum < n) {
      temp++;
      sum += temp;
    }
    if (sum === n) answer++;
  }
  return answer;
}

// 이진 변환 반복하기
// https://programmers.co.kr/learn/courses/30/lessons/70129
function solution(s) {
  let answer = [0, 0];
  while (s !== '1') {
    const z = s.match(/0/g);
    const zero = z ? z.length : 0;
    const one = s.length - zero;
    answer[1] += zero;
    s = '1'.repeat(one);
    s = s.length.toString(2);
    answer[0]++;
  }
  return answer;
}

// 최댓값과 최솟값
// https://programmers.co.kr/learn/courses/30/lessons/12939
function solution(s) {
  s = s.split(' ').map((v) => +v);
  return Math.min(...s) + ' ' + Math.max(...s);
}

// 최솟값 만들기
// https://programmers.co.kr/learn/courses/30/lessons/12941
function solution(A, B) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);
  return A.reduce((acc, cur, idx) => acc + cur * B[idx], 0);
}

// 피보나치 수 ★
// https://programmers.co.kr/learn/courses/30/lessons/12945
// 재귀로 풀면 효율성 실패
function solution(n) {
  const fibo = (n) => {
    if (n <= 1) return n;
    return (fibo(n - 1) % 1234567) + (fibo(n - 2) % 1234567);
  };
  return fibo(n);
}
function solution(n) {
  const arr = [];
  for (let i = 0; i <= n; i++) {
    if (i <= 1) arr.push(i);
    else arr.push((arr[arr.length - 1] + arr[arr.length - 2]) % 1234567);
  }
  return arr[arr.length - 1];
}

// 행렬의 곱셈
// https://programmers.co.kr/learn/courses/30/lessons/12949
// 조금 복잡하다.. reduce, map을 활용해도 좋지만 그러면 코드 짜기가 너무 복잡해서 힘들다
function solution(arr1, arr2) {
  // a*b, b*c
  const arr = [];
  for (let a = 0; a < arr1.length; a++) {
    const row = [];
    for (let c = 0; c < arr2[0].length; c++) {
      let temp = 0;
      for (let b = 0; b < arr1[0].length; b++) {
        temp += arr1[a][b] * arr2[b][c];
      }
      row.push(temp);
    }
    arr.push(row);
  }
  return arr;
}

// JadenCase 문자열 만들기
// https://programmers.co.kr/learn/courses/30/lessons/12951
// charAt 대신 [0]은 런타임 에러가 뜬다. 왠지 모르겠다
function solution(s) {
  return s
    .split(' ')
    .map((v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase())
    .join(' ');
}

// N개의 최소공배수 ★
// https://programmers.co.kr/learn/courses/30/lessons/12953
const gcd = (a, b) => {
  return b ? gcd(b, a % b) : a;
};
function solution(arr) {
  return arr.reduce((acc, cur) => (acc * cur) / gcd(acc, cur));
}

// 짝지어 제거하기
// https://programmers.co.kr/learn/courses/30/lessons/12973
function solution(s) {
  const arr = [];
  for (let i = 0; i < s.length; i++) {
    if (arr[arr.length - 1] === s[i]) {
      arr.pop();
    } else {
      arr.push(s[i]);
    }
  }
  return arr.length === 0 ? 1 : 0;
}

// 예상 대진표
// https://programmers.co.kr/learn/courses/30/lessons/12985
function solution(n, a, b) {
  let answer = 0;
  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    answer++;
  }
  return answer;
}

// 괄호 회전하기 ★
// https://programmers.co.kr/learn/courses/30/lessons/76502
// 이런 종류의 스택문제가 많다. 이건 그 중에서 조금 더 복잡한 문제
// 변수 a,b,c를 놓고 풀면 안되는게 여기서는 무조건 () 형태가 나와야 올바른 괄호다.
// ({)} 형태는 올바른 괄호가 아니야 이 문제에서는.. 다른 문제에서는 이게 올바른 괄호일 수도 있다
function solution(s) {
  let answer = 0;
  for (let i = 0; i < s.length; i++) {
    const arr = [];
    const temp = i === 0 ? s : s.slice(i) + s.slice(0, i);
    for (let j = 0; j < temp.length; j++) {
      if (
        (arr[arr.length - 1] === '(' && temp[j] === ')') ||
        (arr[arr.length - 1] === '[' && temp[j] === ']') ||
        (arr[arr.length - 1] === '{' && temp[j] === '}')
      )
        arr.pop();
      else arr.push(temp[j]);
    }
    if (arr.length === 0) answer++;
  }
  return answer;
}
