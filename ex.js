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
  console.log(y, frame);
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
    .every((v) => isValidateGi(x, y, frame));
  const noEffectBo = bo
    .filter((v) => v.x >= 0 && x <= n && v.y <= n && frame[v.y][v.x].bo)
    .every((v) => isValidateBo(x, y, n, frame));
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
  console.log(frameToArr(frame, n));
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
