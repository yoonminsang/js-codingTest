function solution(jobs) {
  let arr = [];
  let time = 0;
  jobs.sort((a, b) => a[0] - b[0]);
  while (jobs.length) {
    if (time < jobs[0][0]) {
      time = jobs[0][0];
    }
    let min = [];
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i][0] > time) break;
      const ms = jobs[i][1] + time - jobs[i][0];
      if (min.length === 0) min = [i, ms, jobs[i][1]];
      if (jobs[i][1] < min[2]) min = [i, ms, jobs[i][1]];
    }
    time += jobs[min[0]][1];
    arr.push(min[1]);
    jobs.splice(min[0], 1);
  }
  return Math.floor(arr.reduce((acc, cur) => acc + cur, 0) / arr.length);
}

function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]);
  const arr = [];
  let time = 0;
  while (jobs.length) {
    if (time < jobs[0][0]) time = jobs[0][0];
    let min = [0, time - jobs[0][0] + jobs[0][1], jobs[0][1]];
    for (let i = 1; i < jobs.length; i++) {
      if (time < jobs[i][0]) break;
      if (min[2] > jobs[i][1])
        min = [i, time - jobs[i][0] + jobs[i][1], jobs[i][1]];
    }
    // time+=min[2]
    time += jobs[min[0]][1];
    arr.push(min[1]);
    jobs.splice(min[0], 1);
  }
  // console.log(arr);
  return arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
}
