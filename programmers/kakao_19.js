// 1 오픈 채팅방
// https://programmers.co.kr/learn/courses/30/lessons/42888
function solution(record) {
  const ENTER = 'Enter';
  const CHANGE = 'Change';
  const LEAVE = 'Leave';
  const user = {};
  record = record.map((v) => v.split(' '));
  record.forEach(([state, id, name]) => {
    if (state === ENTER || state === CHANGE) user[id] = name;
  });
  const answer = [];
  record.forEach(([state, id]) => {
    const currentUser = user[id];
    if (state === ENTER) answer.push(`${currentUser}님이 들어왔습니다.`);
    else if (state === LEAVE) answer.push(`${currentUser}님이 나갔습니다.`);
  });
  return answer;
}

// 2 실패율
// https://programmers.co.kr/learn/courses/30/lessons/42889
function solution(N, stages) {
  const arrive = Array(N + 2).fill(0);
  stages.forEach((v) => {
    arrive[v]++;
  });
  const stageArrive = Array(N + 2).fill(0);
  arrive.forEach((v, idx) => {
    for (let i = 1; i <= idx; i++) {
      stageArrive[i] += v;
    }
  });
  const answer = [];
  arrive.forEach((v, i) => {
    answer.push([v / stageArrive[i], i]);
  });
  answer.shift();
  answer.pop();
  return answer.sort((a, b) => b[0] - a[0]).map(([_, idx]) => idx);
}

// 3 후보키
// https://programmers.co.kr/learn/courses/30/lessons/42890
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
const isValidate = (combination, relation, candidateKey) => {
  const isSuperset = (setA, subset) => {
    for (let elem of subset) {
      if (!setA.has(elem)) {
        return false;
      }
    }
    return true;
  };
  // 최소성
  for (let i = 0; i < candidateKey.length; i++) {
    const combiSet = new Set([...combination]);
    if (isSuperset(combiSet, candidateKey[i])) return false;
  }
  // 유일성
  const arr = [];
  for (let i = 0; i < relation.length; i++) {
    const temp = [];
    for (let j = 0; j < combination.length; j++) {
      temp.push(relation[i][combination[j]]);
    }
    for (let j = 0; j < arr.length; j++) {
      if (temp.toString() === arr[j].toString()) return false;
    }
    arr.push(temp);
  }
  return true;
};
function solution(relation) {
  const candidateKey = [];
  const forCombination = Array(relation[0].length)
    .fill()
    .map((_, i) => i);
  const combination = [];
  for (let i = 1; i <= forCombination.length; i++) {
    combination.push(getCombinations(forCombination, i));
  }
  combination.forEach((v1) =>
    v1.forEach((v2) => {
      if (isValidate(v2, relation, candidateKey)) candidateKey.push(v2);
    })
  );
  return candidateKey.length;
}

// 4 무지의 먹방 라이브
// https://programmers.co.kr/learn/courses/30/lessons/42891
// 정확도 o, 효율성 x
function solution(food_times, k) {
  if (food_times.reduce((acc, cur) => acc + cur, 0) <= k) return -1;
  const next = (food_times, pointer) => {
    food_times[pointer]--;
    do {
      if (pointer === food_times.length - 1) pointer = 0;
      else pointer++;
    } while (food_times[pointer] === 0);
    return pointer;
  };
  let pointer = 0;
  for (let i = 0; i < k; i++) {
    pointer = next(food_times, pointer);
  }
  while (food_times[pointer] === 0) {
    if (pointer === food_times.length - 1) pointer = 0;
    else pointer++;
  }
  return pointer + 1;
}

// 성공
function solution(food_times, k) {
  const len = food_times.length;
  const foodTimes = food_times.map((v, i) => ({ time: v, index: i + 1 }));
  foodTimes.sort((a, b) => a.time - b.time);
  for (let i = 0; i < len; i++) {
    const time =
      i === 0
        ? foodTimes[i].time * len
        : (foodTimes[i].time - foodTimes[i - 1].time) * (len - i);
    if (k < time)
      return foodTimes.slice(i).sort((a, b) => a.index - b.index)[k % (len - i)]
        .index;
    k -= time;
  }
  return -1;
}
