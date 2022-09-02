// https://school.programmers.co.kr/learn/courses/30/lessons/12906
// 같은 숫자는 싫어
function solution(arr) {
  return arr.reduce((acc, cur) => {
    if (acc[acc.length - 1] !== cur) acc.push(cur);
    return acc;
  }, []);
}

// https://school.programmers.co.kr/learn/courses/30/lessons/12909
// 올바른 괄호
function solution(s) {
  let opendCount = 0;
  for (let i = 0; i < s.length; i++) {
    if (opendCount < 0) return false;
    if (s[i] === '(') opendCount++;
    else opendCount--;
  }
  return !opendCount;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42586
// 기능개발
function solution(progresses, speeds) {
  const needDays = progresses.map((progress, index) => {
    const speed = speeds[index];
    const remainProgress = 100 - progress;
    return Math.ceil(remainProgress / speed);
  });
  const answer = [];
  while (needDays.length) {
    const maxDay = needDays.shift();
    let count = 1;
    while (needDays.length && needDays[0] <= maxDay) {
      needDays.shift();
      count++;
    }
    answer.push(count);
  }
  return answer;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42587
// 프린터
function solution(priorities, location) {
  const priorityIndexArr = priorities.map((priority, index) => ({ priority, index }));
  while (true) {
    const max = Math.max(...priorityIndexArr.map(({ priority }) => priority));
    const { priority: currPriority, index: currIndex } = priorityIndexArr[0];
    if (max === currPriority) {
      priorityIndexArr.shift();
      if (currIndex === location) return priorities.length - priorityIndexArr.length;
    } else {
      priorityIndexArr.push(priorityIndexArr.shift());
    }
  }
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42583
// 다리를 지나는 트럭
function solution(bridge_length, weight, truck_weights) {
  const bridge = Array(bridge_length).fill(0);
  let time = 0;
  while (truck_weights.length) {
    bridge.shift();
    const sum = bridge.reduce((acc, cur) => acc + cur, 0);
    if (sum + truck_weights[0] <= weight) {
      bridge.push(truck_weights.shift());
    } else {
      bridge.push(0);
    }
    time++;
  }
  return time + bridge_length;
}

// reduce의 연산을 줄이기 위한 개선방법. but 코드가 지저분해짐.
function solution(bridge_length, weight, truck_weights) {
  const bridge = Array(bridge_length).fill(0);
  let time = 0;
  let bridgeWeight = bridge.reduce((acc, cur) => acc + cur, 0);
  while (truck_weights.length) {
    bridgeWeight -= bridge.shift();
    if (bridgeWeight + truck_weights[0] <= weight) {
      const firstTruckWeight = truck_weights.shift();
      bridge.push(firstTruckWeight);
      bridgeWeight += firstTruckWeight;
    } else {
      bridge.push(0);
    }
    time++;
  }
  return time + bridge_length;
}

// 시간을 기준으로 계산. 직관적이진 않지만 연산 시간이 많이 줄어듬
function solution(bridge_length, weight, truck_weights) {
  const queue = [{ weight: 0, time: 0 }];
  let bridgeWeight = 0;
  let time = 0;
  while (queue.length) {
    if (queue[0].time === time) {
      bridgeWeight -= queue.shift().weight;
    }
    if (bridgeWeight + truck_weights[0] <= weight) {
      const firstTruckWeight = truck_weights.shift();
      bridgeWeight += firstTruckWeight;
      queue.push({ weight: firstTruckWeight, time: time + bridge_length });
    } else if (queue[0]) {
      time = queue[0].time - 1;
    }
    time++;
  }
  return time;
}
