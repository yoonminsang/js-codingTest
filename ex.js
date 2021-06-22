function solution(food_times, k) {
  if (food_times.reduce((acc, cur) => acc + cur, 0) <= k) return -1;
  food_times = food_times.map((v, i) => [v, i + 1]);
  const sortTimes = [],
    orders = [];
  food_times
    .sort((a, b) => a[0] - b[0])
    .forEach(([v, i]) => {
      sortTimes.push(v);
      orders.push(i);
    });
  // console.log('sortTimes',sortTimes,'orders',orders);
  for (let i = 0; i < sortTimes.length; i++) {
    const time = sortTimes[i] * sortTimes.length - i;
    // console.log('time',time,'k',k)
    if (time > k) break;
    k -= time;
    const minusValue = sortTimes[i];
    for (let j = i; j < sortTimes.length; j++) {
      sortTimes[j] -= minusValue;
    }
  }
  // console.log('sortTimes',sortTimes);
  const backTimes = Array(sortTimes.length);
  orders.forEach((v, i) => {
    backTimes[v - 1] = sortTimes[i];
  });
  // console.log('backTimes',backTimes,'k',k);
  let pos = 0;
  while (k !== 0) {
    backTimes[pos]--;
    k--;
    if (pos === backTimes.length - 1) pos = 0;
    else pos++;
  }
  return backTimes[pos];
}
