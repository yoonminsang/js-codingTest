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
// function solution(genres, plays) {
//   const obj = genres.reduce((acc, genre, index) => {
//     const play = plays[index];
//     const pushArr = [play, index];
//     if (!acc[genre]) acc[genre] = [pushArr];
//     else acc[genre].push(pushArr);
//     return acc;
//   }, {});
//   for (let key in obj) {
//     obj[key].sort((a, b) => {
//       if (a[0] === b[0]) return a[1] - b[1];
//       return b[0] - a[0];
//     });
//   }
//   const orderArr = [];
//   const objValues = Object.values(obj);
//   objValues.map((v, index) => {
//     orderArr.push([v.reduce((acc, [play]) => acc + play, 0), index]);
//   });
//   orderArr.sort((a, b) => b[0] - a[0]);
//   const answer = [];
//   orderArr.forEach(([_, index]) => {
//     const temp = [];
//     for (let i = 0; i < 2; i++) {
//       if (!objValues[index][i]) break;
//       temp.push(objValues[index][i][1]);
//     }
//     answer.push(...temp);
//   });
//   return answer;
// }
function solution(genres, plays) {
  const genresToSet = [...new Set(genres)];
  const genresPlayObj = genresToSet.reduce((acc, cur) => {
    acc[cur] = [];
    return acc;
  }, {});

  for (let i = 0; i < genres.length; i++) {
    const [genre, play] = [genres[i], plays[i]];
    genresPlayObj[genre].push([play, i]);
  }
  for (const value of Object.values(genresPlayObj)) {
    value.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return b[0] - a[0];
    });
  }

  const accGenresPlay = [];
  for (const [key, value] of Object.entries(genresPlayObj)) {
    const accPlay = value.reduce((acc, cur) => acc + cur[0], 0);
    accGenresPlay.push([key, accPlay]);
  }
  accGenresPlay.sort((a, b) => b[1] - a[1]);

  const answer = [];
  accGenresPlay.forEach(([genre]) => {
    const indexArr = genresPlayObj[genre].slice(0, 2).map(([play, index]) => index);
    answer.push(...indexArr);
  });
  return answer;
}
