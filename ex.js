function solution(bridge_length, weight, truck_weights) {
  const queue = [[0, 0]]; //무게, 지나는 시간
  let time = 0;
  let bridgeWeight = 0;
  while (queue.length > 0 || truck_weights.length > 0) {
    console.log(queue, truck_weights, time, bridgeWeight);
    if (queue[0][1] === time) {
      bridgeWeight -= queue.shift()[0];
    }
    if (bridgeWeight + truck_weights[0] <= weight) {
      bridgeWeight += truck_weights[0];
      queue.push([truck_weights.shift(), time + bridge_length]);
    } else {
      if (queue[0]) time = queue[0][1] - 1;
    }
    time++;
  }
  return time;
}

console.log(solution(2, 10, [7, 4, 5, 6]));
