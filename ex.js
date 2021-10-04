function solution(n, results) {
  const graph = Array(5)
    .fill()
    .map(() => [[], []]);
  results.forEach(([win, lose]) => {
    graph[win - 1][0].push(lose);
    graph[lose - 1][1].push(win);
  });
  graph.forEach(([winArr, loseArr]) => {
    winArr.forEach((v) => {
      console.log(graph[v - 1]);
      graph[v - 1][1] = [...new Set([...graph[v - 1][1], ...loseArr])];
      // graph[v - 1][1] = [...new Set(graph[v - 1][1].concat(...loseArr))];
    });
    loseArr.forEach((v) => {
      graph[v - 1][0] = [...new Set([...graph[v - 1][0], ...winArr])];
      // graph[v - 1][0] = [...new Set(graph[v - 1][0].concat(...winArr))];
    });
  });
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
