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
