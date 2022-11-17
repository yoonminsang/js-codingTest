// https://school.programmers.co.kr/learn/courses/30/lessons/86491?language=javascript
// 최소직사각형
// reduce나 for문써서 한번에 끝낼수도 있는데 이게 제일 깔끔해보여서 이렇게만듬.
// 어차피 빅오관점에서 봤을 때 차이없음. 리팩토링책에서도 for문 한번에 해결할 코드를 두번쓴다고 잘못됬다고 하지 않음.
function solution(sizes) {
  sizes.forEach((size) => size.sort((a, b) => a - b));
  const [w, h] = [Math.max(...sizes.map(([w, h]) => w)), Math.max(...sizes.map(([w, h]) => h))];
  return w * h;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42840
// 모의고사
// 사실 필터를 쓸수도있다. 위에서는 성능 차이가 크지 않아서 for문을 두번사용했는데 여기서는 한번 사용했다.
// 약간 모순적이기도 하지만 이건 알고리즘이라 클린코드와는 상관이 없다.
// 지금 경우에는 함수 분리가 중요하지 filter써서 for문줄일지 for문 한방에 끝낼지가 중요하지는 않은 것 같다.
function solution(answers) {
  const person1Answers = [1, 2, 3, 4, 5];
  const person2Answers = [2, 1, 2, 3, 2, 4, 2, 5];
  const person3Answers = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let [person1Count, person2Count, person3Count] = [0, 0, 0];
  answers.forEach((answer, index) => {
    if (answer === person1Answers[index % person1Answers.length]) person1Count++;
    if (answer === person2Answers[index % person2Answers.length]) person2Count++;
    if (answer === person3Answers[index % person3Answers.length]) person3Count++;
  });
  const max = Math.max(person1Count, person2Count, person3Count);
  const answer = [];
  if (max === person1Count) answer.push(1);
  if (max === person2Count) answer.push(2);
  if (max === person3Count) answer.push(3);
  return answer;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42839
// 소수찾기
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((fixed, index) => {
    const permutations = getPermutations([...arr.slice(0, index), ...arr.slice(index + 1)], selectNumber - 1);
    const permutationsWithFixed = permutations.map((permutation) => [fixed, ...permutation]);
    result.push(...permutationsWithFixed);
  });
  return result;
};

function solution(numbers) {
  numbers = numbers.split('').map(Number);
  const set = new Set();
  for (let i = 1; i <= numbers.length; i++) {
    const permutations = getPermutations(numbers, i);
    permutations.forEach((permutation) => {
      set.add(Number(permutation.join('')));
    });
  }
  let count = 0;
  set.forEach((v) => {
    if (isPrime(v)) count++;
  });
  return count;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42842
// 카펫
// 이건 그냥 수학문제...
// yellow : n개
// for문 <=n/2까지비교.
// 노란색 row i
// 노란색 col n/i
// 전체 row i+2
// 전체 col = (n/i)+2
function solution(brown, yellow) {
  const totalCount = brown + yellow;
  for (let i = 1; i <= Math.ceil(yellow / 2); i++) {
    if (yellow % i !== 0) continue;
    const row = i + 2;
    const col = yellow / i + 2;
    if (row * col == totalCount) return [col, row];
  }
}

// https://school.programmers.co.kr/learn/courses/30/lessons/87946
// 피로도
// 처음에 visited를 그냥 dungeons를 제거해가는 방식으로 구현.
// count도 그냥 계산하는데 이러면 나중에 헷갈릴듯. 그냥 명시적으로 count인자를 넣어주는게 더 좋을듯.
// 아래는 visited라는 배열을 만들어서 구현.(일반적인 dfs가 아니라 완전탐색이기 때문에 visited를 토글해주는 코드로 구현)
function solution(k, dungeons) {
  const countArr = [0];
  const dfs = (현재_피로도, dungeonArr) => {
    if (dungeonArr.length === 0) return countArr.push(dungeons.length);
    for (let i = 0; i < dungeonArr.length; i++) {
      const [최소필요_소모도, 소모_피로도] = dungeonArr[i];
      if (최소필요_소모도 <= 현재_피로도) {
        dfs(현재_피로도 - 소모_피로도, [...dungeonArr.slice(0, i), ...dungeonArr.slice(i + 1)]);
      } else {
        countArr.push(dungeons.length - dungeonArr.length);
      }
    }
  };
  dfs(k, dungeons);
  return Math.max(...countArr);
}

function solution(k, dungeons) {
  let max = 0;
  const visited = Array(dungeons.length).fill(false);
  const dfs = (현재_피로도, count) => {
    max = Math.max(max, count);
    dungeons.forEach(([최소_필요_피로도, 소모_피로도], index) => {
      if (현재_피로도 >= 최소_필요_피로도 && !visited[index]) {
        visited[index] = true;
        dfs(현재_피로도 - 소모_피로도, count + 1);
        visited[index] = false;
      }
    });
  };
  dfs(k, 0);
  return max;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/86971
// 전력망을 둘로 나누기

const makeGraph = (n, arr) => {
  const graph = Array(n)
    .fill()
    .reduce((acc, cur, idx) => {
      acc[idx + 1] = [];
      return acc;
    }, {});
  arr.forEach(([from, to]) => {
    graph[from].push(to);
    graph[to].push(from);
  });
  return graph;
};

// dfs
const dfs = ({ node, visited, graph }) => {
  visited[node] = true;
  graph[node].forEach((adj) => {
    if (!visited[adj]) dfs({ node: adj, visited, graph });
  });
};

function solution(n, wires) {
  let min = Infinity;
  for (let i = 0; i < wires.length; i++) {
    const currentWires = [...wires.slice(0, i), ...wires.slice(i + 1)];
    const graph = makeGraph(n, currentWires);
    const visited = Array(n + 1).fill(false);
    dfs({ node: 1, visited, graph });
    const count = visited.filter((v) => v === true).length;
    const diff = Math.abs(n - count - count);
    min = Math.min(min, diff);
  }
  return min;
}

// bfs
const bfs = (root, graph) => {
  let count = 0;
  const queue = [root];
  const visited = [];
  visited[root] = true;
  while (queue.length) {
    const curr = queue.pop();
    graph[curr].map((next) => {
      if (!visited[next]) {
        visited[next] = true;
        queue.push(next);
      }
    });
    count++;
  }
  return count;
};

function solution(n, wires) {
  let min = Infinity;
  for (let i = 0; i < n; i++) {
    const currentWires = [...wires.slice(0, i), ...wires.slice(i + 1)];
    const graph = makeGraph(n, currentWires);
    const count = bfs(1, graph);
    const diff = Math.abs(n - count - count);
    min = Math.min(min, diff);
  }
  return min;
}
