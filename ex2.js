function solution(info, query) {
  const answer = [];
  const infoMultiArr = info.map((v) => v.split(' '));
  const queryMultiArr = query.map((v) => v.replace(/( and )/g, ' ').split(' '));
  console.log(infoMultiArr);
  console.log(queryMultiArr);

  for (const queryMultiArrIndex in queryMultiArr) {
    const queryArr = queryMultiArr[queryMultiArrIndex];
    let count = 0;
    outer: for (const infoMultiArrIndex in infoMultiArr) {
      const infoArr = infoMultiArr[infoMultiArrIndex];
      console.log('here', infoArr, queryArr);
      for (const queryIndex in queryArr) {
        const info = infoArr[queryIndex];
        const query = queryArr[queryIndex];
        if (queryIndex == 4) {
          if (info >= query) {
            console.log('plus', infoArr, queryArr);
            count++;
          }
        } else {
          if (query !== '-' && query !== info) continue outer;
        }
      }
    }
    answer.push(count);
  }
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
// [1,1,1,1,2,4]
