// https://school.programmers.co.kr/learn/courses/30/lessons/42627
// 디스크 컨트롤러
function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]);
  let time = 0;
  const minSpendTimeArr = [];
  while (jobs.length) {
    if (time < jobs[0][0]) time = jobs[0][0];
    let [minTimeIndex, minTime, minSpendTime] = [0, time + jobs[0][1] - jobs[0][0], jobs[0][1]];
    for (let i = 0; i < jobs.length; i++) {
      const [startTime, spendTime] = jobs[i];
      if (time < startTime) break;
      if (minSpendTime > spendTime)
        [minTimeIndex, minTime, minSpendTime] = [i, time + spendTime - startTime, spendTime];
    }
    jobs.splice(minTimeIndex, 1);
    time += minSpendTime;
    minSpendTimeArr.push(minTime);
  }
  return Math.floor(minSpendTimeArr.reduce((acc, cur) => acc + cur, 0) / minSpendTimeArr.length);
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42628
// 이중우선순위큐
const 최댓값_삭제 = 'D 1';
const 최솟값_삭제 = 'D -1';
function solution(operations) {
  const arr = [];
  operations.forEach((operation) => {
    switch (operation) {
      case 최댓값_삭제:
        arr.pop();
        break;
      case 최솟값_삭제:
        arr.shift();
        break;
      default:
        const [, number] = operation.split(' ');
        arr.push(Number(number));
    }
    arr.sort((a, b) => a - b);
  });
  if (arr.length === 0) {
    return [0, 0];
  }
  return [arr[arr.length - 1], arr[0]];
}
