// https://programmers.co.kr/learn/courses/30/lessons/42576
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) return participant[i];
  }
}

// https://programmers.co.kr/learn/courses/30/lessons/42578
function solution(clothes) {
  const clothObj = clothes.reduce((obj, [cloth, name]) => {
    obj[name] ? obj[name]++ : (obj[name] = 1);
    return obj;
  }, {});
  let count = 1;
  Object.values(clothObj).forEach((v) => {
    count *= v + 1;
  });
  return count - 1;
}
