// const distance = [
//   [-1, 0],
//   [1, 0],
//   [0, -1],
//   [0, 1],
// ];

// const bfs = (board, cursor1, cursor2) => {
//   const visited = Array(4)
//     .fill()
//     .map(() => Array(4).fill(false));
//   const queue = [];
//   queue.push(cursor1);
//   while (queue.length) {
//     const current = queue.shift();
//     const current_row = current[0],
//       current_column = current[1],
//       current_count = current[2] || 0;
//     let next_row, next_column;
//     if (current[0] === cursor2[0] && current[1] === cursor2[1]) {
//       return current_count;
//     }
//     for (let i = 0; i < 4; i++) {
//       (next_row = current_row + distance[i][0]),
//         (next_column = current_column + distance[i][1]);
//       if (next_row < 0 || next_row >= 4 || next_column < 0 || next_column >= 4)
//         continue;
//       if (!visited[next_row][next_column]) {
//         visited[next_row][next_column] = true;
//         queue.push([next_row, next_column, current_count + 1]);
//       }
//       for (let j = 0; j < 2; j++) {
//         if (board[next_row][next_row] !== 0) break;
//         (next_row = current_row + distance[i][0]),
//           (next_column = current_column + distance[i][1]);
//         if (
//           next_row < 0 ||
//           next_row >= 4 ||
//           next_column < 0 ||
//           next_column >= 4
//         )
//           break;
//       }
//       if (!visited[next_row][next_column]) {
//         visited[next_row][next_column] = true;
//         queue.push([next_row, next_column, current_count + 1]);
//       }
//     }
//   }
//   return Infinity;
// };

// const permutation = (board, cursor) => {
//   let min = Infinity;
//   for (let num = 1; num <= 6; num++) {
//     const card = [];
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 4; j++) {
//         if (board[i][j] === num) {
//           card.push([i, j]);
//         }
//       }
//     }
//     if (card.length === 0) continue;
//     const one = bfs(board, cursor, card[0]) + bfs(board, card[0], card[1]) + 2;
//     const two = bfs(board, cursor, card[1]) + bfs(board, card[1], card[0]) + 2;
//     for (let i = 0; i < 2; i++) {
//       board[card[i][0]][card[i][1]] = 0;
//     }
//     min = Math.min(
//       min,
//       one + permutation(board, card[1]),
//       two + permutation(board, card[0])
//     );
//     for (let i = 0; i < 2; i++) {
//       board[card[i][0]][card[i][1]] = num;
//     }
//   }
//   if (min === Infinity) return 0;
//   return min;
// };

// function solution(board, r, c) {
//   return permutation(board, [r, c, 0]);
// }

const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  console.log(arr);
  arr.forEach((fixed, index) => {
    const rest = arr.slice(0, index).concat(arr.slice(index + 1));
    const permutations = getPermutations(rest, selectNumber - 1);
    const attach = permutations.map((permutation) => [fixed, ...permutation]);
    result.push(...attach);
  });
  return result;
};

function solution(board, r, c) {
  const set = new Set(board.flat());
  set.delete(0);
  const permutationArr = [...set];
  const permutations = getPermutations(permutationArr, permutationArr.length);
  // const result=[];
  // permutations.forEach(permutation=>{
  //     const copyBoard=board.map(v1=>v1.map(v2=>v2));
  //     console.log(copyBoard);
  // })
  // return Math.max(...result);
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
