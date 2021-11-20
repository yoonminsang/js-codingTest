function solution(n, k, cmd) {
  const existArr = Array(n).fill('O');
  const prevObj = {};
  const nextObj = {};
  const removeArr = [];
  let cursor = k;
  for (let i = 0; i < n; i++) {
    if (i !== 0) prevObj[i] = i - 1;
    if (i !== n - 1) nextObj[i] = i + 1;
  }
  cmd.forEach((v) => {
    const [action, number] = v.split(' ');
    switch (action) {
      case 'U':
        for (let i = 0; i < number; i++) {
          cursor = prevObj[cursor];
        }
        break;
      case 'D':
        for (let i = 0; i < number; i++) {
          cursor = nextObj[cursor];
        }
        break;
      case 'C':
        removeArr.push(cursor);
        const prev = prevObj[cursor];
        const next = nextObj[cursor];
        if (prev === null) {
          prevObj[next] = null;
        } else if (next === null) {
          nextObj[prev] = null;
        } else {
          nextObj[prev] = next;
          prevObj[next] = prev;
        }
        existArr[cursor] = 'X';
        if (next) cursor = next;
        else cursor = prev;
        break;
      case 'Z':
        const pop = removeArr.pop();
        const prev2 = prevObj[pop];
        const next2 = nextObj[pop];
        if (prev2 !== null) nextObj[prev2] = pop;
        if (next2 !== null) prevObj[next2] = pop;
        existArr[pop] = 'O';
        break;
    }
  });
  return existArr.join('');
}

console.log(solution(4, 1, ['C', 'C', 'U 1']));
