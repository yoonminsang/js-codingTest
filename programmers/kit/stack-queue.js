// https://programmers.co.kr/learn/courses/30/lessons/42586
function solution(progresses, speeds) {
  const days = progresses.map((progress, idx) => Math.ceil((100 - progress) / speeds[idx]));
  const answer = [];
  while (days.length) {
    const standard = days.shift();
    let count = 1;
    while (days.length && days[0] <= standard) {
      days.shift();
      count++;
    }
    answer.push(count);
  }
  return answer;
}

// 다른풀이
function solution(progresses, speeds) {
  const completeDays = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
  const answer = [];
  let [prev, count] = [completeDays[0], 1];
  for (let i = 1; i < completeDays.length; i++) {
    const next = completeDays[i];
    if (prev < completeDays[i]) {
      answer.push(count);
      [prev, count] = [next, 1];
    } else {
      count++;
    }
  }
  if (count) {
    answer.push(count);
  }
  return answer;
}

// https://programmers.co.kr/learn/courses/30/lessons/42587
function solution(priorities, location) {
  const priorityArr = priorities.map((priority, idx) => [priority, idx]);
  let count = 0;
  while (true) {
    const max = Math.max(...priorityArr.map((v) => v[0]));
    if (priorityArr[0][0] === max) {
      count++;
      if (priorityArr[0][1] === location) return count;
      priorityArr.shift();
    } else {
      priorityArr.push(priorityArr.shift());
    }
  }
}

// https://programmers.co.kr/learn/courses/30/lessons/42583
function solution(bridge_length, weight, truck_weights) {
  const queue = [[0, 0]]; //무게, 지나는 시간
  let time = 0;
  let bridgeWeight = 0;
  while (queue.length) {
    if (queue[0][1] === time) {
      bridgeWeight -= queue.shift()[0];
    }
    if (bridgeWeight + truck_weights[0] <= weight) {
      bridgeWeight += truck_weights[0];
      queue.push([truck_weights.shift(), time + bridge_length]);
    } else {
      if (queue[0]) time = queue[0][1] - 1;
    }
    time++;
  }
  return time;
}
