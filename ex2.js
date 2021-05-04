function solution(n, s) {
  if (n > s) return [-1];
  const answer = [];
  while (answer.length !== n) {
    const num = Math.floor(s / n);
    answer.push(num);
    s -= num;
    n--;
    console.log(num, answer, s);
  }
  return answer;
}
console.log(solution(2, 8));
