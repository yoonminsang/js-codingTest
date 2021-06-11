// 1 문자열 압축
// https://programmers.co.kr/learn/courses/30/lessons/60057
function solution(s) {
  const answer = [];
  for (let i = 1; i <= s.length; i++) {
    const arr = [];
    for (let j = 0; j < s.length; j += i) {
      const str = s.slice(j, j + i);
      if (str === arr[arr.length - 1]) {
        if (typeof arr[arr.length - 2] === 'number') arr[arr.length - 2]++;
        else arr.splice(arr.length - 1, 0, 2);
      } else arr.push(str);
    }
    answer.push(arr.join('').length);
  }
  return Math.min(...answer);
}

// 2 괄호 변환
// https://programmers.co.kr/learn/courses/30/lessons/60058
function solution(p) {
  if (p.length === 0) return '';
  let count = 0,
    balance = true;
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') count++;
    else count--;
    if (count < 0) balance = false;
    else if (count === 0) {
      if (balance) {
        return p.slice(0, i + 1) + solution(p.slice(i + 1, p.length));
      } else {
        let answer = '(' + solution(p.slice(i + 1, p.length)) + ')';
        const u = p.slice(1, i);
        for (let i = 0; i < u.length; i++) {
          answer += u[i] === '(' ? ')' : '(';
        }
        return answer;
      }
    }
  }
}

// 3 자물쇠와 열쇠
// https://programmers.co.kr/learn/courses/30/lessons/60059
const rotate = (key, keyLen) => {
  const rotateArr = Array(keyLen)
    .fill()
    .map(() => Array(keyLen).fill(null));
  for (let i = 0; i < keyLen; i++) {
    for (let j = 0; j < keyLen; j++) {
      rotateArr[j][keyLen - 1 - i] = key[i][j];
    }
  }
  return rotateArr;
};

const expand = (arr, keyLen, lockLen) => {
  const expandArr = Array(lockLen)
    .fill()
    .map(() => Array(keyLen + 2 * lockLen).fill(0));
  for (let i = 0; i < keyLen; i++) {
    expandArr.push(
      Array(lockLen).fill(0).concat(arr[i]).concat(Array(lockLen).fill(0))
    );
  }
  for (let i = 0; i < lockLen; i++) {
    expandArr.push(Array(lockLen * 3).fill(0));
  }
  return expandArr;
};

const compare = (arr1, arr2, lockLen) => {
  for (let i = 0; i < lockLen; i++) {
    for (let j = 0; j < lockLen; j++) {
      if (arr1[i][j] + arr2[i][j] !== 1) return false;
    }
  }
  return true;
};

function solution(key, lock) {
  const keyLen = key.length;
  const lockLen = lock.length;
  for (let i = 0; i < 4; i++) {
    key = rotate(key, keyLen);
    const keyExpand = expand(key, keyLen, lockLen);
    const keyExpandLen = keyExpand.length;
    for (let i = 0; i < keyExpandLen - lockLen; i++) {
      for (let j = 0; j < keyExpandLen - lockLen; j++) {
        const realKey = [];
        for (let k = i; k < i + lockLen; k++) {
          realKey.push(keyExpand[k].slice(j, j + lockLen));
        }
        if (compare(realKey, lock, lockLen)) return true;
      }
    }
  }
  return false;
}

// 4 가사 검색
// https://programmers.co.kr/learn/courses/30/lessons/60060
// 효율성 실패
function solution(words, queries) {
  const answer = [];
  queries.forEach((query) => {
    let count = 0;
    words.forEach((word) => {
      if (word.length === query.length) {
        let same = true;
        for (let i = 0; i < word.length; i++) {
          if (query[i] === '?') continue;
          if (query[i] !== word[i]) {
            same = false;
            break;
          }
        }
        if (same) count++;
      }
    });
    answer.push(count);
  });
  return answer;
}

// 5 기둥과 보 설치
// https://programmers.co.kr/learn/courses/30/lessons/60061
// 진짜 그냥 구현이 말도안되게 어려운 문제..
// 개념이 어려운게 아니라 하나하나 실수하지 않고 코드짜는게 매우매우 힘들다.
const GI = 0,
  BO = 1,
  DELETE = 0,
  INSTALL = 1;
// 기둥은 바닥 위에 있거나 보의 한쪽 끝 부분 위에 있거나, 또는 다른 기둥 위에 있어야 합니다.
const isValidateGi = (x, y, frame) => {
  const onFloor = y === 0;
  const onBo = (x - 1 >= 0 && frame[y][x - 1].bo) || frame[y][x].bo;
  const onGi = y - 1 >= 0 && frame[y - 1][x].gi;
  return onFloor || onBo || onGi;
};
const installGi = (x, y, frame) => {
  frame[y][x].gi = true;
};

// 보는 한쪽 끝 부분이 기둥 위에 있거나, 또는 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 합니다.
const isValidateBo = (x, y, n, frame) => {
  const onGi =
    y - 1 >= 0 &&
    (frame[y - 1][x].gi || (x + 1 <= n && frame[y - 1][x + 1].gi));
  const connectBo =
    x - 1 >= 0 && x + 1 <= n && frame[y][x - 1].bo && frame[y][x + 1].bo;
  return onGi || connectBo;
};
const installBo = (x, y, frame) => {
  frame[y][x].bo = true;
};

const toggle = (x, y, frame, type) => {
  if (type === GI) frame[y][x].gi = !frame[y][x].gi;
  else frame[y][x].bo = !frame[y][x].bo;
};

const deleteGi = (x, y, n, frame) => {
  const gi = [{ x, y: y + 1 }];
  const bo = [
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
  ];
  toggle(x, y, frame, GI);
  const noEffectGi = gi
    .filter((v) => v.y <= n && frame[v.y][v.x].gi)
    .every((v) => isValidateGi(v.x, v.y, frame));
  const noEffectBo = bo
    .filter((v) => v.x >= 0 && v.y <= n && frame[v.y][v.x].bo)
    .every((v) => isValidateBo(v.x, v.y, n, frame));
  if (noEffectGi && noEffectBo) return;
  toggle(x, y, frame, GI);
};

const deleteBo = (x, y, n, frame) => {
  const gi = [
    { x, y },
    { x: x + 1, y },
  ];
  const bo = [
    { x: x - 1, y },
    { x: x + 1, y },
  ];
  toggle(x, y, frame, BO);
  const noEffectGi = gi
    .filter((v) => v.x <= n && frame[v.y][v.x].gi)
    .every((v) => isValidateGi(v.x, v.y, frame));
  const noEffectBo = bo
    .filter((v) => v.x >= 0 && x <= n && v.y <= n && frame[v.y][v.x].bo)
    .every((v) => isValidateBo(v.x, v.y, n, frame));
  if (noEffectGi && noEffectBo) return;
  toggle(x, y, frame, BO);
};

const frameToArr = (frame, n) => {
  const arr = [];
  for (let x = 0; x <= n; x++) {
    for (let y = 0; y <= n; y++) {
      if (frame[y][x].gi) arr.push([x, y, GI]);
      if (frame[y][x].bo) arr.push([x, y, BO]);
    }
  }
  return arr;
};

// build_frame : [x,y,a,b] (a는 기둥, 보, b는 설치 삭제)
function solution(n, build_frame) {
  const frame = Array(n + 1)
    .fill()
    .map(() =>
      Array(n + 1)
        .fill()
        .map(() => ({ gi: false, bo: false }))
    );
  build_frame.forEach(([x, y, a, b]) => {
    if (b === INSTALL) {
      if (a === GI) isValidateGi(x, y, frame) && installGi(x, y, frame);
      else isValidateBo(x, y, n, frame) && installBo(x, y, frame);
    } else {
      if (a === GI) deleteGi(x, y, n, frame);
      else deleteBo(x, y, n, frame);
    }
  });
  return frameToArr(frame, n);
}

// 6 외벽점검
// https://programmers.co.kr/learn/courses/30/lessons/60062
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

function solution(n, weak, dist) {
  const straightArr = [];
  for (let i = 0; i < weak.length; i++) {
    const arr = weak.slice(i);
    let index = 0;
    while (arr.length !== weak.length) {
      arr.push(weak[index++] + n);
    }
    straightArr.push(arr);
  }
  dist.sort((a, b) => b - a);
  // 친구가 i명일 때 성립하면 return i, 성립안하면 for문 밖에서 return -1
  for (let i = 1; i <= dist.length; i++) {
    const distArr = dist.slice(0, i);
    const distArrPermu = getPermutations(distArr, i);
    for (let straight of straightArr) {
      for (let permus of distArrPermu) {
        let straightCopy = straight.slice();
        for (let permu of permus) {
          const count = permu + straightCopy[0];
          straightCopy = straightCopy.filter((v) => v > count);
        }
        if (straightCopy.length === 0) return i;
      }
    }
  }
  return -1;
}
