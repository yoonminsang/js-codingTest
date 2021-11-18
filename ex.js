// "U X": 현재 선택된 행에서 X칸 위에 있는 행을 선택합니다.
// "D X": 현재 선택된 행에서 X칸 아래에 있는 행을 선택합니다.
// "C" : 현재 선택된 행을 삭제한 후, 바로 아래 행을 선택합니다. 단, 삭제된 행이 가장 마지막 행인 경우 바로 윗 행을 선택합니다.
// "Z" : 가장 최근에 삭제된 행을 원래대로 복구합니다. 단, 현재 선택된 행은 바뀌지 않습니다.

function solution(n, k, cmd) {
  const arr = Array(n)
    .fill()
    .map((_, i) => [i, true]);
  const deleteArr = [];
  cmd.forEach((v) => {
    let [action, number] = v.split(' ');
    console.log(action, number);
    switch (action) {
      case 'U':
        while (number) {
          if (arr[k - 1][1]) {
            number--;
          }
          k--;
        }
        console.log(k, arr, deleteArr);
        break;
      case 'D':
        while (number) {
          if (arr[k + 1][1]) {
            number--;
          }
          k++;
        }
        console.log(k, arr, deleteArr);
        break;
      case 'C':
        arr[k][1] = false;
        deleteArr.push(k);
        let tf = true;
        for (let i = k + 1; i < n; i++) {
          if (arr[i][1]) {
            k++;
            tf = false;
            break;
          }
        }
        if (tf) k--;
        console.log(k, arr, deleteArr);
        break;
      case 'Z':
        arr[deleteArr.pop()][1] = true;
        console.log(k, arr, deleteArr);
        break;
      default:
        console.error('action 에러');
    }
  });
  console.log(arr);
  return arr.reduce((acc, cur) => {
    if (cur[1]) return acc + 'O';
    return acc + 'X';
  }, '');
}

console.log(solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']));
