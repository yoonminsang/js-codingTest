// 다리를 지나느 트럭 스택큐
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

// 프린터 스택큐
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

// 기능개발 스택큐
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

// 삼각달팽이
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

// 가장 큰 수 정렬
// https://programmers.co.kr/learn/courses/30/lessons/42746
// 예외 항상 생각 차분하게 천천히 문제다 일기
function solution(numbers) {
  const answer = numbers
    .map((v) => v + '')
    .sort((a, b) => Number(b + a - (a + b)))
    .join('');
  return answer[0] === '0' ? '0' : answer;
}

// 큰수 만들기 탐욕법
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

// 조이스탁 탕욕법
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

// 소수 찾기 완전탐색
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
