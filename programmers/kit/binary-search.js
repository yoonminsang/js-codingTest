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

// https://programmers.co.kr/learn/courses/30/lessons/43236#
// 못풀었음
// https://gwang920.github.io/algorithm/progreammers-2-43236/
function solution(distance, rocks, n) {
  let answer = 0;
  rocks = [0, ...rocks.sort((a, b) => a - b), distance];

  const BinarySearch = () => {
    let start = 0;
    let end = rocks[rocks.length - 1];

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      let count = 0,
        now = 0;
      for (let i = 1; i < rocks.length; i++) {
        if (rocks[i] - now < mid) {
          count++;
          if (count > n) break;
        } else {
          now = rocks[i];
        }
      }

      if (count > n) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    answer = end;
  };

  BinarySearch();
  return answer;
}
