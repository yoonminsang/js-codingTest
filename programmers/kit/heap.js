// https://programmers.co.kr/learn/courses/30/lessons/42627
function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]);
  const arr = [];
  let time = 0;
  while (jobs.length) {
    if (time < jobs[0][0]) time = jobs[0][0];
    let [minIdx, min, minEnd] = [0, time + jobs[0][1] - jobs[0][0], jobs[0][1]];
    // 인덱스, 소요시간, 끝나는시간
    for (let i = 0; i < jobs.length; i++) {
      const [start, end] = jobs[i];
      if (time < start) break;
      if (minEnd > end) {
        [minIdx, min, minEnd] = [i, time + end - start, end];
      }
    }
    time += minEnd;
    arr.push(min);
    jobs.splice(minIdx, 1);
  }
  return Math.floor(arr.reduce((acc, cur) => acc + cur, 0) / arr.length);
}
// 내일 큐로 바꾸기 그러면 더 효율적일듯
