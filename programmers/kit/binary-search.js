// https://programmers.co.kr/learn/courses/30/lessons/43238
function solution(n, times) {
  const maxTime = Math.max(...times);
  let l = 0,
    r = maxTime * n;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const count = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);
    if (count >= n) r = mid - 1;
    else l = mid + 1;
  }
  return l;
}
