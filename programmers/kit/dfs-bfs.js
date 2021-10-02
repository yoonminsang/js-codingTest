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

// https://programmers.co.kr/learn/courses/30/lessons/43162
function solution(n, computers) {
  const result = [];
  const visited = Array(n).fill(false);
  const dfs = (arr, n) => {
    for (let i = 0; i < computers.length; i++) {
      if (i === n) visited[i] = true;
      else if (!arr.includes(i) && computers[n][i] === 1) {
        arr.push(i);
        visited[i] = true;
        dfs(arr, i);
      }
    }
    return arr;
  };
  for (let i = 0; i < computers.length; i++) {
    if (!visited[i]) result.push(dfs([i], i));
  }
  return result.length;
}
