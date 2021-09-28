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
