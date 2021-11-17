// https://programmers.co.kr/learn/courses/30/lessons/81301
// 1.숫자 문자열과 영단어
function solution(s) {
  const numbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
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
