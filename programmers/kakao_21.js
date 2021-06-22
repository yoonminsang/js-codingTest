// 6 7 미완료

// 1 신규 아이디 추천
// https://programmers.co.kr/learn/courses/30/lessons/72410
// 정규식만 안다면 쉬운문제. 모른다면 조금 귀찮은 문제일수도..
function solution(new_id) {
  new_id =
    new_id
      .toLowerCase()
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '') || 'a';
  new_id = new_id.substring(0, 15).replace(/\.$/, '');
  while (new_id.length < 3) new_id += new_id[new_id.length - 1];
  return new_id;
}

// 2 메뉴 리뉴얼
// https://programmers.co.kr/learn/courses/30/lessons/72411
// combination 함수만드는게 거의 90퍼
// 해시테이블(객체) 이용. Object.entries 알면 더 쉽게 풀 수 있다.
const getCombinations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [v, ...combination]);
    result.push(...attached);
  });
  return result;
};

function solution(orders, course) {
  const answer = [];
  orders = orders.map((v) => v.split('').sort());
  course.forEach((n) => {
    const combi = [];
    orders.forEach((order) => {
      combi.push(...getCombinations(order, n));
    });
    const obj = {};
    combi.forEach((v) => {
      const str = v.join('');
      if (obj[str]) obj[str]++;
      else obj[str] = 1;
    });
    const arr = Object.entries(obj);
    arr.sort((a, b) => b[1] - a[1]);
    const max = arr[0] && arr[0][1];
    if (max !== 1) {
      for (let i = 0; i < arr.length; i++) {
        if (max !== arr[i][1]) break;
        answer.push(arr[i][0]);
      }
    }
  });
  answer.sort();
  return answer;
}

// 3 순위 검색
// https://programmers.co.kr/learn/courses/30/lessons/72412
// 시도 1. 효율성 실패
function solution(info, query) {
  const answer = [];
  info = info.map((v) => v.split(' '));
  query.forEach((q) => {
    const arr = q.replace(/\sand\s/g, ' ').split(' ');
    let count = 0;
    info.forEach((v) => {
      for (let i = 0; i < 5; i++) {
        if (i === 4 && +v[i] >= +arr[i]) count++;
        if (arr[i] === '-') continue;
        if (arr[i] !== v[i]) break;
      }
    });
    answer.push(count);
  });
  return answer;
}
// 시도 2. 효율성 실패
// 모든 경우의 객체를 만들어 놓고 filter함수로 개수를 가져왔다.
function solution(info, query) {
  const answer = [];
  const arr = [
    ['-', 'cpp', 'java', 'python'],
    ['-', 'backend', 'frontend'],
    ['-', 'junior', 'senior'],
    ['-', 'chicken', 'pizza'],
  ];
  const obj = {};
  for (let a = 0; a < arr[0].length; a++) {
    for (let b = 0; b < arr[1].length; b++) {
      for (let c = 0; c < arr[2].length; c++) {
        for (let d = 0; d < arr[3].length; d++) {
          const v =
            arr[0][a] + ' ' + arr[1][b] + ' ' + arr[2][c] + ' ' + arr[3][d];
          obj[v] = [];
        }
      }
    }
  }
  info.forEach((v) => {
    const index = v.lastIndexOf(' ');
    const arr = v.slice(0, index).split(' ');
    for (let a = 0; a <= 1; a++) {
      for (let b = 0; b <= 1; b++) {
        for (let c = 0; c <= 1; c++) {
          for (let d = 0; d <= 1; d++) {
            const temp = [];
            if (a) temp.push(arr[0]);
            else temp.push('-');
            if (b) temp.push(arr[1]);
            else temp.push('-');
            if (c) temp.push(arr[2]);
            else temp.push('-');
            if (d) temp.push(arr[3]);
            else temp.push('-');
            obj[temp.join(' ')].push(+v.slice(index + 1));
          }
        }
      }
    }
  });
  query.forEach((v) => {
    const full = v.replace(/\sand\s/g, ' ');
    const index = full.lastIndexOf(' ');
    const str = full.slice(0, index);
    const num = +full.slice(index + 1);
    console.log(full, index, str, num);
    answer.push(obj[str].filter((v) => v >= num).length);
  });
  return answer;
}
// 시도 3. 효율성 성공
// obj의 각 배열들을 정렬하고 이진탐색을 추가하니 효율성이 풀렸다.
// 이게 2단계라니 말도 안돼...
// for문, if문 떡칠했는데 아마 더 좋은 방법이 있을것같다.
function solution(info, query) {
  const answer = [];
  const arr = [
    ['-', 'cpp', 'java', 'python'],
    ['-', 'backend', 'frontend'],
    ['-', 'junior', 'senior'],
    ['-', 'chicken', 'pizza'],
  ];
  const obj = {};
  for (let a = 0; a < arr[0].length; a++) {
    for (let b = 0; b < arr[1].length; b++) {
      for (let c = 0; c < arr[2].length; c++) {
        for (let d = 0; d < arr[3].length; d++) {
          const v =
            arr[0][a] + ' ' + arr[1][b] + ' ' + arr[2][c] + ' ' + arr[3][d];
          obj[v] = [];
        }
      }
    }
  }
  // console.log(obj);
  info.forEach((v) => {
    const index = v.lastIndexOf(' ');
    const arr = v.slice(0, index).split(' ');
    for (let a = 0; a <= 1; a++) {
      for (let b = 0; b <= 1; b++) {
        for (let c = 0; c <= 1; c++) {
          for (let d = 0; d <= 1; d++) {
            const temp = [];
            if (a) temp.push(arr[0]);
            else temp.push('-');
            if (b) temp.push(arr[1]);
            else temp.push('-');
            if (c) temp.push(arr[2]);
            else temp.push('-');
            if (d) temp.push(arr[3]);
            else temp.push('-');
            obj[temp.join(' ')].push(+v.slice(index + 1));
          }
        }
      }
    }
  });
  Object.values(obj).map((v) => v.sort((a, b) => b - a));
  // console.log(obj);
  query.forEach((v) => {
    const full = v.replace(/\sand\s/g, ' ');
    const index = full.lastIndexOf(' ');
    const str = full.slice(0, index);
    const num = +full.slice(index + 1);
    // console.log(full, index, str, num);
    let l = 0,
      r = obj[str].length - 1;
    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      if (obj[str][mid] >= num) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    answer.push(l);
  });
  return answer;
}
console.log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ]
  )
);

// 4 합승 택시 요금
// 다익스트라 효율성 실패
class Graph {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = {};
  }
  addEdge(vertex1, vertex2, weight = 0) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }
  Dijkstra(start) {
    const extractMin = (Q, dist) => {
      let minDistNode = null,
        minDist = Infinity;
      for (let node in Q) {
        if (dist[node] <= minDist) {
          minDist = dist[node];
          minDistNode = node;
        }
      }
      return minDistNode;
    };
    const Q = { ...this.edges },
      dist = {};
    for (let vertex in this.edges) {
      dist[vertex] = Infinity;
    }
    dist[start] = 0;
    while (Object.keys(Q).length !== 0) {
      const u = extractMin(Q, dist);
      delete Q[u];
      for (let adj in this.edges[u]) {
        const alt = dist[u] + this.edges[u][adj];
        if (alt < dist[adj]) dist[adj] = alt;
      }
    }
    return dist;
  }
}

function solution(n, s, a, b, fares) {
  const graph = new Graph();
  for (let i = 1; i <= n; i++) {
    graph.addVertex(i);
  }
  fares.forEach(([from, to, weight]) => {
    graph.addEdge(from, to, weight);
  });
  const start = graph.Dijkstra(s);
  const arr = [];
  for (let i = 1; i <= n; i++) {
    const di = graph.Dijkstra(i);
    arr.push(start[i] + di[a] + di[b]);
  }
  return Math.min(...arr);
}

// 플로이드 워셜 성공
function solution(n, s, a, b, fares) {
  const path = Array.from({ length: n }, (v1, i) =>
    Array.from({ length: n }, (v2, j) => (i === j ? 0 : Infinity))
  );
  fares.forEach(([from, to, fee]) => {
    path[from - 1][to - 1] = fee;
    path[to - 1][from - 1] = fee;
  });
  for (let mid = 0; mid < n; mid++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        path[from][to] = Math.min(
          path[from][to],
          path[from][mid] + path[mid][to]
        );
      }
    }
  }
  let min = Infinity;
  for (let k = 0; k < n; k++) {
    min = Math.min(min, path[s - 1][k] + path[k][a - 1] + path[k][b - 1]);
  }
  return min;
}

// 5 광고 삽입
// 효율성 실패 + 실패
function solution(play_time, adv_time, logs) {
  const timeToSec = (time) =>
    time
      .split(':')
      .map((v) => +v)
      .reduce((acc, cur, idx) => acc + cur * 60 ** (2 - idx), 0);
  const secToTime = (s) => {
    let h = Math.floor(s / 3600);
    s %= 3600;
    let m = Math.floor(s / 60);
    s %= 60;
    const arr = [h, m, s];
    return arr.map((v) => (v < 10 ? '0' + String(v) : v)).join(':');
  };
  play_time = timeToSec(play_time);
  adv_time = timeToSec(adv_time);
  const logs_arr = [];
  logs.forEach((v) => {
    const start = timeToSec(v.slice(0, 8));
    const end = timeToSec(v.slice(9));
    logs_arr.push([start, end]);
  });
  const select_arr = [0, play_time - adv_time]
    .concat(logs_arr)
    .flat()
    .sort((a, b) => a - b)
    .filter((v) => v <= play_time - adv_time);
  // console.log(play_time, adv_time);
  // console.log(logs_arr, select_arr);
  const arr = [];
  select_arr.forEach((sel_start) => {
    // console.log(secToTime(sel_start), '갑니다');
    const sel_end = sel_start + adv_time;
    let time = 0;
    logs_arr.forEach(([log_start, log_end]) => {
      if (sel_start <= log_start && log_end <= sel_end) {
        // console.log('case1');
        time += log_end - log_start;
      } else if (log_start <= sel_start && sel_end <= log_end) {
        // console.log('case2');
        time += sel_end - sel_start;
      } else if (
        log_start <= sel_start &&
        sel_start <= log_end &&
        sel_start <= log_end
      ) {
        // console.log('case3');
        time += log_end - sel_start;
      } else if (
        log_start <= sel_end &&
        sel_end <= log_end &&
        log_start <= sel_end
      ) {
        // console.log('case4');
        time += sel_end - log_start;
      }
      // console.log(
      //   secToTime(sel_start),
      //   secToTime(sel_end),
      //   secToTime(log_start),
      //   secToTime(log_end),
      //   secToTime(time)
      // );
    });
    arr.push([secToTime(sel_start), time]);
  });
  arr.sort((a, b) => b[1] - a[1]);
  // console.log(arr);
  return arr[0][0];
}
// 성공
function solution(play_time, adv_time, logs) {
  const timeToSecond = (time) => {
    return time
      .split(':')
      .reduce((acc, cur, idx) => acc + cur * 60 ** (2 - idx), 0);
  };
  const secondToTime = (s) => {
    const h = Math.floor(s / 3600);
    s %= 3600;
    const m = Math.floor(s / 60);
    s %= 60;
    return [h, m, s].map((v) => (v < 10 ? '0' + String(v) : v)).join(':');
  };
  play_time = timeToSecond(play_time);
  adv_time = timeToSecond(adv_time);
  const logs_start = [],
    logs_end = [];
  logs.forEach((v) => {
    const arr = v.split('-');
    logs_start.push(timeToSecond(arr[0]));
    logs_end.push(timeToSecond(arr[1]));
  });
  const time = Array(play_time).fill(0);
  for (let i = 0; i < logs.length; i++) {
    time[logs_start[i]]++;
    time[logs_end[i]]--;
  }
  for (let i = 1; i < play_time; i++) {
    time[i] += time[i - 1];
  }
  for (let i = 1; i < play_time; i++) {
    time[i] += time[i - 1];
  }
  let max = time[adv_time - 1],
    start = 0;
  for (let i = adv_time; i < play_time; i++) {
    if (time[i] - time[i - adv_time] > max) {
      max = time[i] - time[i - adv_time];
      start = i - adv_time + 1;
    }
  }
  return secondToTime(start);
}

// 6 카드짝맞추기
// https://programmers.co.kr/learn/courses/30/lessons/72415

// 7 매출 하락 최소화
// https://programmers.co.kr/learn/courses/30/lessons/72416
