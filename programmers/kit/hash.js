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

// https://programmers.co.kr/learn/courses/30/lessons/42579
function solution(genres, plays) {
  const obj = genres.reduce((acc, genre, index) => {
    const play = plays[index];
    const pushArr = [play, index];
    if (!acc[genre]) acc[genre] = [pushArr];
    else acc[genre].push(pushArr);
    return acc;
  }, {});
  for (let key in obj) {
    obj[key].sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      return b[0] - a[0];
    });
  }
  const orderArr = [];
  const objValues = Object.values(obj);
  objValues.map((v, index) => {
    orderArr.push([v.reduce((acc, [play]) => acc + play, 0), index]);
  });
  orderArr.sort((a, b) => b[0] - a[0]);
  const answer = [];
  orderArr.forEach(([_, index]) => {
    const temp = [];
    for (let i = 0; i < 2; i++) {
      if (!objValues[index][i]) break;
      temp.push(objValues[index][i][1]);
    }
    answer.push(...temp);
  });
  return answer;
}
