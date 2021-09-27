// https://programmers.co.kr/learn/courses/30/lessons/43165
function solution(numbers, target) {
  let count = 0;
  const dfs = (idx, sum) => {
    if (idx === numbers.length) {
      if (sum === target) count++;
    } else {
      dfs(idx + 1, sum + numbers[idx]);
      dfs(idx + 1, sum - numbers[idx]);
    }
  };
  dfs(0, 0);
  return count;
}
