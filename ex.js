function solution(board, r, c) {
  const getPermutations = (arr, selectNumber) => {
    if (selectNumber === 1) return arr.map((v) => [v]);
    const result = [];
    arr.forEach((v, i) => {
      const rest = arr.slice(0, i).concat(arr.slice(i + 1));
      const permutations = getPermutations(rest, selectNumber - 1);
      const attached = permutations.map((permutation) => [v, ...permutation]);
      result.push(...attached);
    });
    return result;
  };

  const cursorMove = (from, to) => {
    let count = 0;

    return count;
  };

  const card_num = Math.max(...board.flat());
  const card = Array(card_num)
    .fill()
    .map((v, i) => i + 1);
  const card_permu = getPermutations(card, card.length);
  const card_obj = card.reduce((acc, cur) => {
    acc[cur] = [];
    return acc;
  }, {});
  board.forEach((v1, i1) =>
    v1.forEach((v2, i2) => {
      if (v2 !== 0) card_obj[v2].push([i1, i2]);
    })
  );
  console.log(card_permu);
  console.log(card_obj);
  const current = [r, c];
  const answer = [];
  card_permu.forEach((v1) => {
    const dfs = (board, current, permu, count) => {
      if (permu_index === card_num) answer.push(count);
      else {
        cursorMove(board, current, permu);
      }
    };
    dfs(
      Array.from({ length: board.length }, (v, i) => board[i]),
      current.slice(),
      [v1[0], 0],
      0
    );
    dfs(
      Array.from({ length: board.length }, (v, i) => board[i]),
      current.slice(),
      [v1[0], 1],
      0
    );
  });
}
console.log(
  solution(
    [
      [1, 0, 0, 3],
      [2, 0, 0, 0],
      [0, 0, 0, 2],
      [3, 0, 1, 0],
    ],
    1,
    0
  )
);
