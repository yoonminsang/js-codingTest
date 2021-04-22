// 어렵거나 중요한 문제는 ★ ctl+f 로 찾기

// N으로 표현 / 동적계획법(Dynamic Programming) ★
// https://programmers.co.kr/learn/courses/30/lessons/42895
// 이것도 조금 어렵다. 문자를 붙이는게 생각보다 어렵다.
// 더하기, 빼기, 곱셈, 나눗셈처럼 for문에서 ab로 표현을 하면 안된다.
// 왜냐하면 5/55를 생각했을 때 5/5=1, 15가 된다.
// 그래서 처음에 집합에 문자를 붙여서 넣어줘야 한다.(ex 5555)
// 중간에 문자를 붙이는 경우도 나올 수 있는 경우도 생각해야 한다.
// set[n]=시그마(i=1~n-1)set[n-i]+set[i] 식으로 표현할 수 있다.
function solution(N, number) {
  const set = Array(9)
    .fill()
    .map(() => new Set());
  for (let i = 1; i <= 8; i++) {
    set[i].add(+String(N).repeat(i));
    for (let j = 1; j < i; j++) {
      for (let a of set[j]) {
        for (let b of set[i - j]) {
          set[i].add(a + b);
          set[i].add(a - b);
          set[i].add(a * b);
          set[i].add(a / b);
        }
      }
    }
    if (set[i].has(number)) return i;
  }
  return -1;
}

// 2 x n 타일링 ★
// https://programmers.co.kr/learn/courses/30/lessons/12900
// 피보나치 수열인걸 찾는게 어렵다... 어떻게 찾지
// F(n)을 가로의 길이가 n인 바닥을 가득 채우려는 방법이라 하면
// F(n-1)에서 하나를 세로로 세우면 바닥이 완성된다. 1가지 경우
// F(n-2)에서 두 개를 세로로 세우거나 가로로 세우면 바닥이 완성된다. 그런데 세로로 세우는 경우는 F(n-1)에 포함된다.
// F(n-3)에서는 1. 세로로 세우거나, 2. 두 개 가로, 하나 세로, 3. 하 나 세로, 두개 가로를 세우면 바닥이 완성된다. 그런데 F(n-1)과 F(n-2)에 포함된다.
// 그 아래는 할 필요가 없다.
// 즉 F(n)=F(n-1)+F(n-2)인 피보나치 수열이다.
// F(n-3)은
function solution(n) {
  const arr = [1, 2];
  for (let i = 2; i < n; i++) {
    arr.push((arr[i - 2] + arr[i - 1]) % 1000000007);
  }
  return arr[n - 1];
}

// 네트워크 / 깊이/너비 우선 탐색(DFS/BFS)
// https://programmers.co.kr/learn/courses/30/lessons/43162
// 방문한 배열을 구해서 count하는 방법
function solution(n, computers) {
  const result = [];
  const visit = Array(n).fill(false);
  const dfs = (n, arr) => {
    for (let i = 0; i < computers.length; i++) {
      if (i === n) {
        visit[i] = true;
      } else if (!arr.includes(i) && computers[n][i] === 1) {
        visit[i] = true;
        arr.push(i);
        dfs(i, arr);
      }
    }
    return arr;
  };
  for (let i = 0; i < n; i++) {
    if (!visit[i]) result.push(dfs(i, [i]));
  }
  return result.length;
}
// 배열 없이 그냥 count만 하는 방법
function solution(n, computers) {
  let answer = 0;
  const visit = Array(n).fill(false);
  const dfs = (n, arr) => {
    for (let i = 0; i < computers.length; i++) {
      if (i === n) {
        visit[i] = true;
      } else if (!arr.includes(i) && computers[n][i] === 1) {
        visit[i] = true;
        arr.push(i);
        dfs(i, arr);
      }
    }
  };
  for (let i = 0; i < n; i++) {
    if (!visit[i]) {
      answer++;
      dfs(i, [i]);
    }
  }
  return answer;
}

// 단어 변환 / 깊이/너비 우선 탐색(DFS/BFS)
// https://programmers.co.kr/learn/courses/30/lessons/43163
// bfs문제. level2의 게임 맴 최단거리가 훨씬 어렵다
function solution(begin, target, words) {
  const queue = [[begin, 0]];
  const visit = Array(words.length).fill(false);
  const len = begin.length;
  while (queue.length) {
    const last = queue.shift();
    for (const i in words) {
      if (visit[i]) continue;
      let count = 0;
      for (let j = 0; j < len; j++) {
        if (last[0][j] === words[i][j]) count++;
      }
      if (count === len - 1) {
        visit[i] = true;
        if (words[i] === target) return last[1] + 1;
        queue.push([words[i], last[1] + 1]);
      }
    }
  }
  return 0;
}

// 디스크 컨트롤러 / 힙(Heap)
// https://programmers.co.kr/learn/courses/30/lessons/42627
// 생각보다 잘 안풀렸다.
// 제일 작은 것부터 처리를 하면 된다.
function solution(jobs) {
  const arr = [];
  let time = 0;
  jobs.sort((a, b) => a[0] - b[0]);
  while (jobs.length) {
    if (time < jobs[0][0]) time = jobs[0][0];
    let min = [0, time - jobs[0][0] + jobs[0][1], jobs[0][1]];
    for (let i = 0; i < jobs.length; i++) {
      if (time < jobs[i][0]) break;
      if (min[2] > jobs[i][1])
        min = [i, time - jobs[i][0] + jobs[i][1], jobs[i][1]];
    }
    time += min[2];
    arr.push(min[1]);
    jobs.splice(min[0], 1);
  }
  return Math.floor(arr.reduce((acc, cur) => acc + cur, 0) / arr.length);
}

// 섬 연결하기 / 탐욕법(Greedy)
// https://programmers.co.kr/learn/courses/30/lessons/42861
