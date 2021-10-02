// https://programmers.co.kr/learn/courses/30/lessons/49189
function solution(n, edge) {
  const graph = edge.reduce((G, [from, to]) => {
    G[from] = (G[from] || []).concat(to);
    G[to] = (G[to] || []).concat(from);
    return G;
  }, {});
  const queue = [1];
  const dist = { 1: 0 };
  while (queue.length) {
    const vertex = queue.shift();
    if (graph[vertex]) {
      graph[vertex].forEach((v) => {
        if (dist[v] === undefined) {
          queue.push(v);
          dist[v] = dist[vertex] + 1;
        }
      });
    }
  }
  const distArr = Object.values(dist);
  const max = Math.max(...distArr);
  return distArr.filter((v) => v === max).length;
}

// https://programmers.co.kr/learn/courses/30/lessons/42860
function solution(name) {
  let count = 0;
  let completeHead = 0,
    completeTail = 0,
    complete = 0;
  let index = 0;
  let direction = true;
  while (name.length !== complete) {
    const aski = name.charCodeAt(index);
    if (aski <= 78) count += aski - 65;
    else count += 91 - aski;
    direction ? completeHead++ : completeTail++;
    complete++;
    const plusOrMinus = direction ? 1 : -1;
    let nextA = 0;
    let tempIndex = index + plusOrMinus;
    while (name.charCodeAt(tempIndex) === 65) {
      tempIndex += plusOrMinus;
      nextA++;
    }
    if (nextA + complete === name.length) break;
    if (nextA >= complete) {
      index = direction ? name.length - completeTail - 1 : completeHead;
      count += complete;
      direction = !direction;
    } else {
      index += plusOrMinus;
      count++;
    }
  }
  return count;
}
