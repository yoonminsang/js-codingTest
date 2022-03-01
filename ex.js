// const removeArrayByIndex = (arr, index) => {
//   const copyArr = arr.slice();
//   copyArr.splice(index, 1);
//   return copyArr;
// };

// const isIncludeArr = (arr1, arr2) => {
//   for (let i = 0; i < arr1.length; i++) {
//     for (let j = 0; j < arr2.length; j++) {
//       if (arr1[i] === arr2[i]) return true;
//     }
//   }
//   return false;
// };

// function solution(info, edges) {
//   let max = 1;
//   const dfs = (count, visited, remainEdges) => {
//     if (count <= 0) return;
//     if (count > max) max = count;
//     for (let i = 0; i < remainEdges.length; i++) {
//       if (isIncludeArr(visited, remainEdges[i])) {
//         const nextVisited = visited.slice();
//         nextVisited[i] = true;
//         if (info[i] === 1) dfs(count - 1);
//       }
//     }
//   };
//   // const firstVisited=[true,...Array(info.length-1).fill(false)];
//   const firstVisited = Array(info.length)
//     .fill(null)
//     .reduce((acc, cur, index) => {
//       index === 0 ? (acc[index] = true) : (acc[index] = false);
//       return acc;
//     }, {});
//   for (let i = 0; i < info.length; i++) {
//     if (edges[i].includes(0)) dfs(1, { ...firstVisited }, removeArrayByIndex(edges, i));
//   }
//   return max;
// }

// // 다음 방문할 node 하나만 결정. edge는 그냥 삭제만. visited도 필요없을듯

const makeTree = (info, edges) => {
  const tree = Array(info.length)
    .fill(null)
    .map(() => []);
  edges.forEach(([parent, child]) => {
    tree[parent].push(child);
  });
  return tree;
};

function solution(info, edges) {
  const tree = makeTree(info, edges);
  let max = 1;
  const dfs = (sheepCount, wolfCount, currentNode, nextNodes) => {
    info[currentNode] === 1 ? wolfCount++ : sheepCount++;

    if (sheepCount <= wolfCount) return;

    max = Math.max(max, sheepCount);

    const newNextNodes = [...nextNodes];
    const index = newNextNodes.indexOf(currentNode);
    newNextNodes.splice(index, 1);
    newNextNodes.push(...tree[currentNode]);
    for (const nextNode of newNextNodes) {
      dfs(sheepCount, wolfCount, nextNode, newNextNodes);
    }
  };
  dfs(0, 0, 0, [0]);
  return max;
}

// 5
console.log(
  solution(
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 8],
      [8, 7],
      [9, 10],
      [9, 11],
      [4, 3],
      [6, 5],
      [4, 6],
      [8, 9],
    ],
  ),
);
