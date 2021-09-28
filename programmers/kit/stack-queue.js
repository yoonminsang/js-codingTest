// https://programmers.co.kr/learn/courses/30/lessons/42586
function solution(progresses, speeds) {
  const days = progresses.map((progress, idx) =>
    Math.ceil((100 - progress) / speeds[idx])
  );
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
