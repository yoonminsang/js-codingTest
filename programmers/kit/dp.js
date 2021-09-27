function solution(N, number) {
  const setArr = Array(9)
    .fill()
    .map(() => new Set());
  for (let i = 1; i <= 8; i++) {
    const set = setArr[i];
    set.add(+String(N).repeat(i));
    for (let j = 1; j < i; j++) {
      for (let a of setArr[j]) {
        for (let b of setArr[i - j]) {
          set.add(a + b);
          set.add(a - b);
          set.add(a * b);
          set.add(Math.floor(a / b));
        }
      }
    }
    if (set.has(number)) return i;
  }
  return -1;
}
