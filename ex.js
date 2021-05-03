function solution(n, results) {
  const graph = Array(n)
    .fill()
    .map(() => [[], []]);
  results.forEach(([win, lose]) => {
    graph[win - 1][0].push(lose);
    graph[lose - 1][1].push(win);
  });
  console.log(graph);
  graph.forEach((a) => {
    a[0].forEach(
      (v) => (graph[v - 1][1] = [...new Set(graph[v - 1][1].concat(...a[1]))])
    );
    a[1].forEach(
      (v) => (graph[v - 1][0] = [...new Set(graph[v - 1][0].concat(...a[0]))])
    );
  });
  console.log(graph);
  return graph.reduce((acc, cur) => {
    if (cur.flat().length === n - 1) return acc + 1;
    return acc;
  }, 0);
}
console.log(
  solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
  ])
);
