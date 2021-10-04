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

// https://programmers.co.kr/learn/courses/30/lessons/49191
function solution(n, results) {
  const graph = Array(n)
    .fill()
    .map(() => [[], []]);
  results.forEach(([win, lose]) => {
    graph[win - 1][0].push(lose);
    graph[lose - 1][1].push(win);
  });
  graph.forEach(([winArr, loseArr]) => {
    winArr.forEach((v) => {
      graph[v - 1][1] = [...new Set([...graph[v - 1][1], ...loseArr])];
    });
    loseArr.forEach((v) => {
      graph[v - 1][0] = [...new Set([...graph[v - 1][0], ...winArr])];
    });
  });
  return graph.reduce((acc, cur) => {
    if (cur.flat().length === n - 1) return acc + 1;
    return acc;
  }, 0);
}
