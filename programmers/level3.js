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

// 섬 연결하기 / 탐욕법(Greedy) ★
// https://programmers.co.kr/learn/courses/30/lessons/42861
// prime 알고리즘과 union find 알고리즘을 알아야 한다.
// prime 알고리즘은 그래프에서 비용이 적은 것부터 정렬해서 추가하는 알고리즘이다.
// 이 때 사이클을 만들면 안된다.
// 사이클이 만들어지는지 확인하는 알고리즘이 union find 알고리즘이다.
// 사이클이 만들어지는지 확인하기 위해서 부모 배열을 만든다.
// 부모 배열은 처음에 각각의 그래프 점(문제에서는 숫자)으로 할당한다.
// 부모를 작은 인덱스로 만든다면 0과 1이 연결됬을때 [0,0,~~] 이런 형태가 된다.
// 부모를 구하는 함수는 재귀로 만드는게 편하다.
// unionParent 함수로 부모를 합치고 findParent 함수로 부모가 같은지 확인한다.
const getParent = (parent, v) => {
  if (parent[v] === v) return v;
  return getParent(parent, parent[v]);
};

const unionParent = (parent, a, b) => {
  a = getParent(parent, a);
  b = getParent(parent, b);
  a < b ? (parent[b] = a) : (parent[a] = b);
};

const findParent = (parent, a, b) => {
  return getParent(parent, a) === getParent(parent, b);
};

function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);
  const arr = [];
  const parent = Array(n)
    .fill()
    .map((v, i) => i);
  let i = 0;
  while (arr.length !== n - 1) {
    if (!findParent(parent, costs[i][0], costs[i][1])) {
      unionParent(parent, costs[i][0], costs[i][1]);
      arr.push(costs[i]);
    }
    i++;
  }
  return arr.reduce((acc, cur) => acc + cur[2], 0);
}

// 가장 먼 노드 그래프
// 복잡하게 생각하지 말자. 자료구조 알고리즘 기본을 생각
// 당연히 그래프 문제니 그래프를 만들어서 푸는게 직관적이고 헷갈리지 않다.
// reduce나 foreach문에 배열을 인자로 넣을수도 있다. 귀찮게 안에서 작업하지 말자
// 2차원 배열을 그래프로 만드는 방법은 여러 방법이 있다.
// 주석 부분은 점이 n부터 m까지처럼 정해지지 않았을때 유용하다.
// 시간은 주석을 치지 않은 부분이 빠르다.
// 단방향, 양방향 등등 다양하게 만들 수 있다.
function solution(n, edge) {
  // const graph = edge.reduce((acc, [from, to]) => {
  //     acc[from] = (acc[from] || []).concat(to);
  //     acc[to] = (acc[to] || []).concat(from);
  //     return acc;
  // }, {});
  const graph = Array(n)
    .fill()
    .reduce((acc, cur, idx) => {
      acc[idx + 1] = [];
      return acc;
    }, {});
  edge.forEach(([from, to]) => {
    graph[from].push(to);
    graph[to].push(from);
  });
  const visit = { 1: true };
  const dist = { 1: 0 };
  const queue = [1];
  while (queue.length) {
    const currentNode = queue.shift();
    graph[currentNode].forEach((v) => {
      if (!visit[v]) {
        visit[v] = true;
        queue.push(v);
        dist[v] = dist[currentNode] + 1;
      }
    });
  }
  const distValue = Object.values(dist);
  const max = Math.max(...distValue);
  return distValue.filter((v) => v === max).length;
}

// 여행경로 / 깊이/너비 우선 탐색(DFS/BFS)
// https://programmers.co.kr/learn/courses/30/lessons/43164
// 방향이 있고 중복을 허용하지 않는 그래프에서 dfs를 사용하는 문제다.
// 중복을 허용하지 않는다는 점때문에 객체로 그래프를 만들면 더 복잡해져서
// 2차원배열을 그대로 이용해서 풀었다.
function solution(tickets) {
  const answer = [];
  const dfs = (ticket, arr) => {
    if (ticket.length === 0) answer.push(arr);
    const currentNode = arr[arr.length - 1];
    ticket.forEach(([from, to], idx) => {
      if (from === currentNode) {
        dfs(
          ticket.filter((v, i) => i !== idx),
          arr.concat(to)
        );
      }
    });
  };
  dfs(tickets, ['ICN']);
  return answer.sort()[0];
}

// 순위 / 그래프
// https://programmers.co.kr/learn/courses/30/lessons/49191
// 쉬운 문젠데 조금 헷갈렸다...
// 먼저 그래프를 만들고 win<n<lose 에서 lose의 배열에 win 배열을 추가하고 win의 배열에 lose의 배열을 추가하면 된다.
function solution(n, results) {
  const graph = Array(n)
    .fill()
    .map(() => [[], []]);
  results.forEach(([win, lose]) => {
    graph[win - 1][0].push(lose);
    graph[lose - 1][1].push(win);
  });
  graph.forEach((a) => {
    a[0].forEach(
      (v) => (graph[v - 1][1] = [...new Set(graph[v - 1][1].concat(...a[1]))])
    );
    a[1].forEach(
      (v) => (graph[v - 1][0] = [...new Set(graph[v - 1][0].concat(...a[0]))])
    );
  });
  return graph.reduce((acc, cur) => {
    if (cur.flat().length === n - 1) return acc + 1;
    return acc;
  }, 0);
}

// 이중우선순위큐 /힙(Heap)
// https://programmers.co.kr/learn/courses/30/lessons/42628
function solution(operations) {
  const queue = [];
  operations.forEach((v) => {
    if (v === 'D -1') queue.pop();
    else if (v === 'D 1') queue.shift();
    else {
      queue.push(+v.slice(2));
      queue.sort((a, b) => b - a);
    }
  });
  if (queue.length === 0) return [0, 0];
  return [queue[0], queue[queue.length - 1]];
}

// 베스트앨범 / 해시
// https://programmers.co.kr/learn/courses/30/lessons/42579
// 더 간단하게 만들수있는데 그렇게 하면 오히려
// 가독성이 너무 떨어지고 어려워서 이정도로만..
function solution(genres, plays) {
  const obj = genres.reduce((acc, cur, idx) => {
    if (!acc[cur]) acc[cur] = [[plays[idx], idx]];
    else acc[cur].push([plays[idx], idx]);
    return acc;
  }, {});
  for (let key in obj) {
    obj[key].sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      else return b[0] - a[0];
    });
  }
  // console.log(obj);
  const keys = Object.keys(obj);
  let sum = keys
    .map((v) => obj[v].reduce((acc, cur) => acc + cur[0], 0))
    .map((v, i) => [v, keys[i]]);
  sum.sort((a, b) => b[0] - a[0]);
  // console.log(sum);
  const answer = [];
  sum.forEach(([sum, genre]) => {
    for (let i = 0; i < 2 && i < obj[genre].length; i++) {
      answer.push(obj[genre][i][1]);
    }
  });
  return answer;
}

// 입국심사 / 이분탐색
// https://programmers.co.kr/learn/courses/30/lessons/43238
function solution(n, times) {
  let l = 1,
    r = n * Math.max(...times);
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    const count = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);
    if (count >= n) r = mid - 1;
    else l = mid + 1;
  }
  return l;
}

// 단속카메라 / 탐욕법(Greedy)
// https://programmers.co.kr/learn/courses/30/lessons/42884
// 인덱스가 조금 헷갈릴 수 있는 문제다.
// 시험에서 한번 잘못생각하면 골치아플듯
function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]);
  let camera = -30001;
  let answer = 0;
  for (let route of routes) {
    if (camera < route[0]) {
      camera = route[1];
      answer++;
    }
  }
  return answer;
}

// 가장 긴 팰린드롬
// https://programmers.co.kr/learn/courses/30/lessons/12904
// 길이가 가장 긴것부터 시작해서 for문을 돌렸다.
// 주석 친 식이 편하긴 한데 효율성 실패한다.
// 그래서 앞이랑 뒤에서 하나씩 비교해줬다.
function solution(s) {
  const len = s.length;
  for (let n = len; n > 0; n--) {
    for (let l = 0; l <= len - n; l++) {
      // let r=l+n;
      // if(s.slice(l,r)===s.slice(l,r).split('').reverse().join('')) return n;
      let r = l + n - 1;
      let m = (l + r) / 2;
      let tf = true;
      for (let i = l; i <= m; i++, r--) {
        if (s[i] !== s[r]) {
          tf = false;
          break;
        }
      }
      if (tf) return n;
    }
  }
}

// 거스름돈 ★
// https://programmers.co.kr/learn/courses/30/lessons/12907
// dp 문제 너무 어렵다

// 멀리뛰기
// https://programmers.co.kr/learn/courses/30/lessons/12914
// dp문제. 이건 그나마 쉽다.
// dp[i-1]에서 한 칸을 더 뛴 값 + dp[i-2]에서 두 칸을 더 뛴 값이 dp[i]가 되므로
// dp[i]=dp[i-1]+dp[i-2]라는 식이 나온다.
function solution(n) {
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1234567;
  }
  return dp[n];
}

// 야근지수
// https://programmers.co.kr/learn/courses/30/lessons/12927
// 그냥 sort를 하거나 max를 찾으면 효율성 초과가 뜬다.
// 그래서 인덱스를 조절해주면서 작업을 해야한다.
function solution(n, works) {
  if (works.reduce((acc, cur) => acc + cur, 0) <= n) return 0;
  works.sort((a, b) => b - a);
  let index = 0;
  while (n) {
    if (works[index] < works[index + 1]) {
      index++;
      continue;
    } else if (works[index - 1] === works[index]) {
      index = 0;
      continue;
    }
    works[index] -= 1;
    n--;
  }
  const answer = works.reduce((acc, cur) => acc + cur ** 2, 0);
  return answer < 0 ? 0 : answer;
}

// 줄 서는 방법
// https://programmers.co.kr/learn/courses/30/lessons/12936
// permutation 사용하니 효율성 초과
// 아래 코드에서는 팩토리얼을 사용해서 해당 부분의 값들만 가져왔다.
const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((v, i) => {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    const permutations = getPermutations(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [v, ...permutation]);
    result.push(...attached);
  });
  return result;
};

function solution(n, k) {
  const arr = Array(n)
    .fill()
    .map((v, i) => i + 1);
  const permutation = getPermutations(arr, n);
  return permutation[k - 1];
}

// 수정버전
const getFactorial = (n) => {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
};

function solution(n, k) {
  const answer = [];
  const arr = Array(n)
    .fill()
    .map((v, i) => i + 1);
  let nn = n;
  while (answer.length !== n) {
    nn--;
    const facto = getFactorial(nn);
    const index = Math.ceil(k / facto) - 1;
    answer.push(arr.splice(index, 1));
    k -= facto * index;
  }
  return answer.flat();
}

// 최고의 집합
// https://programmers.co.kr/learn/courses/30/lessons/12938
function solution(n, s) {
  if (n > s) return [-1];
  const answer = [];
  for (n; n > 0; n--) {
    const num = Math.floor(s / n);
    answer.push(num);
    s -= num;
  }
  return answer;
}

// 하노이의 탑 ★
// https://programmers.co.kr/learn/courses/30/lessons/12946
// 너무 어렵다..

// N-Queen
// https://programmers.co.kr/learn/courses/30/lessons/12952
function solution(n) {
  let answer = 0;
  const isValidate = (arr, n, row, column) => {
    for (let i = 0; i < arr.length; i++) {
      const diff = row - i;
      if (
        arr[i] === column ||
        column === arr[i] + diff ||
        column === arr[i] - diff
      )
        return false;
    }
    return true;
  };
  const dfs = (arr, n, row) => {
    if (row === n - 1) answer++;
    for (let column = 0; column < n; column++) {
      if (isValidate(arr, n, row + 1, column))
        dfs(arr.concat(column), n, row + 1);
    }
  };
  for (let i = 0; i < n; i++) {
    dfs([i], n, 0);
  }
  return answer;
}
