function solution(tickets) {
  const answer = [];
  const dfs = (ticket, arr) => {
    console.log(ticket, arr);
    if (ticket.length === 0) answer.push(arr);
    const currentNode = arr[arr.length - 1];
    ticket.forEach(([from, to], idx) => {
      if (from === currentNode) {
        dfs(
          ticket.filter((v, i) => i !== idx),
          arr.concat(to)
        );
      }
    });
  };
  dfs(tickets, ['ICN']);
  return answer.sort()[0];
}
console.log(
  solution([
    ['ICN', 'B'],
    ['B', 'ICN'],
    ['ICN', 'A'],
    ['A', 'D'],
    ['D', 'A'],
  ])
);

// ['ICN', 'B', 'ICN', 'A', 'D', 'A']
