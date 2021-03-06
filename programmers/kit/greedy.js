// https://programmers.co.kr/learn/courses/30/lessons/42862
function solution(n, lost, reserve) {
  const arr = Array(n).fill(0);
  for (let i of lost) {
    arr[i - 1] -= 1;
  }
  for (let i of reserve) {
    arr[i - 1] += 1;
  }
  for (let i = 0; i < n; i++) {
    if (arr[i] + arr[i + 1] === 0) {
      arr[i] = 0;
      arr[i + 1] = 0;
    }
  }
  return arr.filter((v) => v !== -1).length;
}

function solution(n, lost, reserve) {
  const arr = Array(n).fill(1);
  for (let i of lost) {
    arr[i - 1] -= 1;
  }
  for (let i of reserve) {
    arr[i - 1] += 1;
  }
  for (let i = 0; i < n; i++) {
    if (arr[i] + arr[i + 1] === 2) {
      arr[i] = 1;
      arr[i + 1] = 1;
    }
  }
  return arr.filter((v) => v !== 0).length;
}

// https://programmers.co.kr/learn/courses/30/lessons/42860
function solution(name) {
  let count = 0;
  let completeHead = 0,
    completeTail = 0,
    complete = 0;
  let index = 0;
  let direction = true;
  while (name.length !== complete) {
    const aski = name.charCodeAt(index);
    if (aski <= 78) count += aski - 65;
    else count += 91 - aski;
    direction ? completeHead++ : completeTail++;
    complete++;
    const plusOrMinus = direction ? 1 : -1;
    let nextA = 0;
    let tempIndex = index + plusOrMinus;
    while (name.charCodeAt(tempIndex) === 65) {
      tempIndex += plusOrMinus;
      nextA++;
    }
    if (nextA + complete === name.length) break;
    if (nextA >= complete) {
      index = direction ? name.length - completeTail - 1 : completeHead;
      count += complete;
      direction = !direction;
    } else {
      index += plusOrMinus;
      count++;
    }
  }
  return count;
}

// https://programmers.co.kr/learn/courses/30/lessons/42883
function solution(number, k) {
  const stack = [];
  let head = 0;
  let deleteCount = k;
  while (head < number.length) {
    if (deleteCount && stack[stack.length - 1] < number[head]) {
      stack.pop();
      deleteCount--;
    } else {
      stack.push(number[head]);
      head++;
    }
  }
  return stack.join('').slice(0, number.length - k);
}

// https://programmers.co.kr/learn/courses/30/lessons/42885
function solution(people, limit) {
  people.sort((a, b) => a - b);
  let completeHead = 0;
  let completeTail = 0;
  let count = 0;
  while (completeHead + completeTail < people.length) {
    if (people[completeHead] + people[people.length - 1 - completeTail] <= limit) {
      completeHead++;
    }
    completeTail++;
    count++;
  }
  return count;
}

// https://programmers.co.kr/learn/courses/30/lessons/42884
function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]);
  let camera = -30001;
  let count = 0;
  routes.forEach(([from, to]) => {
    if (camera < from) {
      camera = to;
      count++;
    }
  });
  return count;
}
