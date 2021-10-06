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

// https://programmers.co.kr/learn/courses/30/lessons/42746
function solution(numbers) {
  const answer = numbers
    .map((number) => String(number))
    .sort((a, b) => b + a - (a + b))
    .join('');
  return answer[0] === '0' ? '0' : answer;
}

// https://programmers.co.kr/learn/courses/30/lessons/42747
function solution(citations) {
  citations.sort((a, b) => b - a);
  for (let h = citations.length; h >= 0; h--) {
    let count = 0;
    for (count = 0; count < citations.length; count++) {
      if (citations[count] < h) break;
    }
    if (count >= h) return h;
  }
}
