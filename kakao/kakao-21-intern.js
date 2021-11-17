// https://programmers.co.kr/learn/courses/30/lessons/81301
// 1.숫자 문자열과 영단어
function solution(s) {
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  for (let i = 0; i < numbers.length; i++) {
    const reg = new RegExp(numbers[i], 'g');
    s = s.replace(reg, i);
  }
  return +s;
  // return +s
  //   .replace(/zero/g, '0')
  //   .replace(/one/g, '1')
  //   .replace(/two/g, '2')
  //   .replace(/three/g, '3')
  //   .replace(/four/g, '4')
  //   .replace(/five/g, '5')
  //   .replace(/six/g, '6')
  //   .replace(/seven/g, '7')
  //   .replace(/eight/g, '8')
  //   .replace(/nine/g, '9');
}

// https://programmers.co.kr/learn/courses/30/lessons/81302
// 2. 거리두기 확인하기
// P 응시자
// O 빈테이블
// X 파티션
// 거리 2이하면 거리두기 x, 2이하여도 사이에 파티션있으면 거리두기 성공
// 거리두기 지키면 1 아니면 0
const failDistance = (place, i, j) => {
  // 오른쪽, 아래 붙어있는 경우 무조건 실패
  if (place[i][j + 1] === 'P' || (place[i + 1] && place[i + 1][j] === 'P')) {
    return true;
  }
  // 오른쪽 2칸 떨어진 경우
  else if (place[i][j + 2] === 'P' && place[i][j + 1] !== 'X') {
    return true;
  }
  // 아래 2칸 떨어진 경우
  else if (place[i + 2] && place[i + 2][j] === 'P' && place[i + 1][j] !== 'X') {
    return true;
  }
  // 오른쪽 아래 대각선
  else if (place[i + 1] && place[i + 1][j + 1] === 'P' && !(place[i][j + 1] === 'X' && place[i + 1][j] === 'X')) {
    return true;
  }
  // 왼쪽 아래 대각선
  else if (place[i + 1] && place[i + 1][j - 1] === 'P' && !(place[i][j - 1] === 'X' && place[i + 1][j] === 'X')) {
    return true;
  }
  return false;
};

// 거리두기를 하고 있다면 1, 아니라면 0을 반환
const isDistance = (place) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (place[i][j] === 'P') {
        if (failDistance(place, i, j)) return 0;
      }
    }
  }
  return 1;
};

function solution(places) {
  const answer = [];
  places.forEach((place) => {
    answer.push(isDistance(place));
  });
  return answer;
}
