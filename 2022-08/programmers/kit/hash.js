// https://school.programmers.co.kr/learn/courses/30/lessons/1845
// 폰켓몬
function solution(nums) {
  return Math.min(new Set(nums).size, nums.length / 2);
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42576
// 완주하지 못한 선수
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) return participant[i];
  }
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42578
// 위장
function solution(clothes) {
  const obj = clothes.reduce((acc, [cloth, type]) => {
    if (!acc[type]) acc[type] = [cloth];
    else acc[type].push(cloth);
    return acc;
  }, {});
  return (
    Object.values(obj).reduce((acc, cur) => {
      return acc * (cur.length + 1);
    }, 1) - 1
  );
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42579
// 베스트앨범
// 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
// 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
// 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
function solution(genres, plays) {
  const genresSumObj = genres.reduce((acc, genre, index) => {
    const play = plays[index];
    if (!acc[genre]) acc[genre] = play;
    else acc[genre] += play;
    return acc;
  }, {});
  const genresSumArr = Object.entries(genresSumObj).sort((a, b) => b[1] - a[1]);
  const priorityGenres = genresSumArr.reduce((acc, [genre], index) => {
    acc[genre] = index;
    return acc;
  }, {});
  // console.log(genresSumObj,genresSumArr,priorityGenres)

  // [play회수, index, 우선순위]
  const dataArr = plays.map((play, index) => [play, index, priorityGenres[genres[index]]]);
  dataArr.sort((a, b) => {
    if (a[2] === b[2]) {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return b[0] - a[0];
    }
    return a[2] - b[2];
  });
  const dataObj = dataArr.reduce((acc, [play, index, priority]) => {
    if (!acc[priority]) acc[priority] = [index];
    else acc[priority].push(index);
    return acc;
  }, {});
  // console.log(dataArr, dataObj);

  return Object.values(dataObj).reduce((acc, cur) => {
    acc.push(...cur.slice(0, 2));
    return acc;
  }, []);
}

// 배열에서 객체로 변경. 가독성때문. 간단한거라면 상관없지만 실제 시험에서 배열 디버깅하다보면 오히려 시간이 더 걸릴수도 있음.
function solution(genres, plays) {
  const genresSumObj = genres.reduce((acc, genre, index) => {
    const play = plays[index];
    if (!acc[genre]) acc[genre] = play;
    else acc[genre] += play;
    return acc;
  }, {});
  const genresSumArr = Object.entries(genresSumObj).sort((a, b) => b[1] - a[1]);
  const priorityGenres = genresSumArr.reduce((acc, [genre], index) => {
    acc[genre] = index;
    return acc;
  }, {});
  console.log(genresSumObj, genresSumArr, priorityGenres);

  // [play회수, index, 우선순위]
  const dataArr = plays.map((play, index) => ({ play, index, priority: priorityGenres[genres[index]] }));
  dataArr.sort((a, b) => {
    if (a.priority === b.priority) {
      if (a.play === b.play) {
        return a.index - b.index;
      }
      return b.play - a.play;
    }
    return a.priority - b.priority;
  });
  const dataObj = dataArr.reduce((acc, { play, index, priority }) => {
    if (!acc[priority]) acc[priority] = [index];
    else acc[priority].push(index);
    return acc;
  }, {});
  console.log(dataArr, dataObj);

  return Object.values(dataObj).reduce((acc, cur) => {
    acc.push(...cur.slice(0, 2));
    return acc;
  }, []);
}
