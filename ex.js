function solution(info, query) {
  const answer = [];
  const arr = [
    ['-', 'cpp', 'java', 'python'],
    ['-', 'backend', 'frontend'],
    ['-', 'junior', 'senior'],
    ['-', 'chicken', 'pizza'],
  ];
  const obj = {};
  for (let a = 0; a < arr[0].length; a++) {
    for (let b = 0; b < arr[1].length; b++) {
      for (let c = 0; c < arr[2].length; c++) {
        for (let d = 0; d < arr[3].length; d++) {
          const v =
            arr[0][a] + ' ' + arr[1][b] + ' ' + arr[2][c] + ' ' + arr[3][d];
          obj[v] = [];
        }
      }
    }
  }
  info.forEach((v) => {
    const index = v.lastIndexOf(' ');
    const arr = v.slice(0, index).split(' ');
    for (let a = 0; a <= 1; a++) {
      for (let b = 0; b <= 1; b++) {
        for (let c = 0; c <= 1; c++) {
          for (let d = 0; d <= 1; d++) {
            const temp = [];
            if (a) temp.push(arr[0]);
            else temp.push('-');
            if (b) temp.push(arr[1]);
            else temp.push('-');
            if (c) temp.push(arr[2]);
            else temp.push('-');
            if (d) temp.push(arr[3]);
            else temp.push('-');
            obj[temp.join(' ')].push(+v.slice(index + 1));
          }
        }
      }
    }
  });
  query.forEach((v) => {
    const full = v.replace(/\sand\s/g, ' ');
    const index = full.lastIndexOf(' ');
    const str = full.slice(0, index);
    const num = +full.slice(index + 1);
    answer.push(obj[str].filter((v) => v >= num).length);
  });
  return answer;
}
console.log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ]
  )
);
