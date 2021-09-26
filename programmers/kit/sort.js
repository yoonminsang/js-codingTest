// https://programmers.co.kr/learn/courses/30/lessons/42748'
function solution(array, commands) {
  return commands.map(
    ([start, end, idx]) =>
      array.slice(start - 1, end).sort((a, b) => a - b)[idx - 1]
  );
}

function solution(array, commands) {
  const answer = [];
  commands.forEach((v) => {
    const [start, end, idx] = [v[0] - 1, v[1], v[2] - 1];
    answer.push(array.slice(start, end).sort((a, b) => a - b)[idx]);
  });
  return answer;
}
