function solution(jobs) {
  const arr = [];
  let time = 0;
  jobs.sort((a, b) => a[0] - b[0]);
  while (jobs.length) {
    if (time < jobs[0][0]) {
      time = jobs[0][0];
    }
    let min = [0, time - jobs[0][0] + jobs[0][1], jobs[0][1]];
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i][0] > time) break;
      if (min[2] > jobs[i][1])
        min = [i, time - jobs[i][0] + jobs[i][1], jobs[i][1]];
    }
    time += jobs[min[0]][1];
    arr.push(min[1]);
    jobs.splice(min[0], 1);
  }
  return Math.floor(arr.reduce((acc, cur) => acc + cur, 0) / arr.length);
}

console.log(
  solution([
    [0, 3],
    [1, 9],
    [2, 6],
  ])
);
