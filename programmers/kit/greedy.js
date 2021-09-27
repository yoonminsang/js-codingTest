// https://programmers.co.kr/learn/courses/30/lessons/42862
function solution(n, lost, reserve) {
  const arr = Array(n).fill(0);
  for (let i of lost) {
    arr[i - 1] -= 1;
  }
  for (let i of reserve) {
    arr[i - 1] += 1;
  }
  for (let i = 0; i < n; i++) {
    if (arr[i] + arr[i + 1] === 0) {
      arr[i] = 0;
      arr[i + 1] = 0;
    }
  }
  return arr.filter((v) => v !== -1).length;
}

function solution(n, lost, reserve) {
  const arr = Array(n).fill(1);
  for (let i of lost) {
    arr[i - 1] -= 1;
  }
  for (let i of reserve) {
    arr[i - 1] += 1;
  }
  for (let i = 0; i < n; i++) {
    if (arr[i] + arr[i + 1] === 2) {
      arr[i] = 1;
      arr[i + 1] = 1;
    }
  }
  return arr.filter((v) => v !== 0).length;
}
