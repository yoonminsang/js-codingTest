// https://school.programmers.co.kr/learn/courses/30/lessons/42748
// K번째수
// 한줄로 만들수도 있는데 너무 가독성이 떨어져보여서 체이닝을 사용하지 않음
function solution(array, commands) {
  return commands.map(([start, end, index]) => {
    const slice = array.slice(start - 1, end);
    slice.sort((a, b) => a - b);
    return slice[index - 1];
  });
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42746
// 가장 큰 수
function solution(numbers) {
  const max = numbers
    .map((number) => String(number))
    .sort((a, b) => Number(b + a) - Number(a + b))
    .join('');
  if (max[0] === '0') return '0';
  return max;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42747
// H-Index
function solution(citations) {
  citations.sort((a, b) => b - a);
  for (let h = citations.length; h >= 0; h--) {
    let count;
    for (count = 0; count < citations.length; count++) {
      if (h > citations[count]) break;
    }
    if (count >= h) return h;
  }
}
