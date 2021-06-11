// x y a(기둥보) b(삭제설치)
const GI = 0,
  BO = 1,
  DEL = 0,
  ADD = 1;

const isValidateAdd = (x, y, type, n, frame) => {
  if (y - 1 >= 0) console.log(x, y, frame[y - 1][x].gi);
  else console.log(x, y);
  if (type === GI) {
    if (y === 0) return true; // 바닥위
    if (x - 1 >= 0 && frame[y][x - 1].bo) return true; // 기둥위
    if (frame[y][x].bo || (x - 1 >= 0 && frame[y][x - 1].bo)) return true; //보의 한쪽 끝
  } else {
    if (
      (y - 1 >= 0 && frame[y - 1][x].gi) ||
      (y - 1 >= 0 && x + 1 <= n && frame[y - 1][x + 1])
    )
      return true; // 기둥위
    if (x - 1 >= 0 && frame[y][x - 1].bo && x + 1 <= n && frame[y][x + 1].bo)
      return true; // 양 옆 보
  }
  return false;
};

const add = (x, y, type, frame) => {
  if (type === GI) {
    frame[y][x].gi = true;
  } else {
    frame[y][x].bo = true;
  }
};

const toggle = (x, y, type, frame) => {
  if (type === GI) frame[y][x].gi = !frame[y][x].gi;
  else frame[y][x].bo = !frame[y][x].bo;
};

const isValidateDel = (x, y, type, n, frame) => {
  let noEffectGi, noEffectBo;
  if (type === GI) {
    const gi = [{ x, y: y + 1 }];
    const bo = [
      { x, y: y + 1 },
      { x: x - 1, y: y + 1 },
    ];
    toggle(x, y, type, frame);
    noEffectGi = gi
      .filter(({ x, y }) => x >= 0 && y <= n && frame[y][x].gi)
      .every(({ x, y }) => isValidateAdd(x, y, type, n, frame));
    noEffectBo = bo
      .filter(({ x, y }) => x >= 0 && y <= n && frame[y][x].bo)
      .every(({ x, y }) => isValidateAdd(x, y, type, n, frame));
  } else {
    const gi = [
      { x, y },
      { x: x + 1, y },
    ];
    const bo = [
      { x: x - 1, y },
      { x: x + 1, y },
    ];
    toggle(x, y, type, frame);
    noEffectGi = gi
      .filter(({ x, y }) => x <= n && frame[y][x].gi)
      .every(({ x, y }) => isValidateAdd(x, y, type, n, frame));
    noEffectBo = bo
      .filter(({ x, y }) => x - 1 >= 0 && x + 1 <= n && frame[y][x].bo)
      .every(({ x, y }) => isValidateAdd(x, y, type, n, frame));
  }
  if (noEffectGi || noEffectBo) return;
  toggle(x, y, type, frame);
};

const frameToAnswer = (frame) => {
  const arr = [];
  frame.forEach((v1, i) =>
    v1.forEach((v2, j) => {
      if (v2.gi) arr.push([j, i, 0]);
      if (v2.bo) arr.push([j, i, 1]);
    })
  );
  arr.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return a[2] - b[2];
      }
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
  return arr;
};

function solution(n, build_frame) {
  const frame = Array(n + 1)
    .fill()
    .map(() =>
      Array(n + 1)
        .fill()
        .map(() => ({ gi: false, bo: false }))
    );
  build_frame.forEach(([x, y, type, action]) => {
    if (action === ADD) {
      isValidateAdd(x, y, type, n, frame) && add(x, y, type, frame);
    } else {
      isValidateDel(x, y, type, n, frame);
    }
  });
  return frameToAnswer(frame);
}
console.log(
  solution(5, [
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [2, 1, 0, 1],
    [2, 2, 1, 1],
    [5, 0, 0, 1],
    [5, 1, 0, 1],
    [4, 2, 1, 1],
    [3, 2, 1, 1],
  ])
);
console.log(
  solution(5, [
    [0, 0, 0, 1],
    [2, 0, 0, 1],
    [4, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [2, 0, 0, 0],
    [1, 1, 1, 0],
    [2, 2, 0, 1],
  ])
);
