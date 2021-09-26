// https://programmers.co.kr/learn/courses/30/lessons/42840
function solution(answers) {
  const corretCounts = [];
  const checkArr = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];
  checkArr.forEach((check, checkIdx) => {
    let count = 0;
    answers.forEach((answer, answerIdx) => {
      if (check[answerIdx % check.length] === answer) count++;
    });
    corretCounts.push([count, checkIdx + 1]);
  });
  corretCounts.sort((a, b) => b[0] - a[0]);
  const max = corretCounts[0][0];
  const answer = [];
  for (let i = 0; i < 3; i++) {
    const [count, idx] = corretCounts[i];
    if (count === max) answer.push(idx);
    else break;
  }
  return answer;
}
