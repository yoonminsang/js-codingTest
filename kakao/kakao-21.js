// 해설
// https://tech.kakao.com/2021/01/25/2021-kakao-recruitment-round-1/

// https://programmers.co.kr/learn/courses/30/lessons/72410
// 1. 신규 아이디 추천
// 정규식
function solution(new_id) {
  let replaceId =
    new_id
      .toLowerCase()
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '')
      .slice(0, 15)
      .replace(/\.$/, '') || 'a';
  if (replaceId.length <= 2)
    replaceId += replaceId[replaceId.length - 1].repeat(3 - replaceId.length);
  return replaceId;
}

// https://programmers.co.kr/learn/courses/30/lessons/72411
// 2. 메뉴 리뉴얼
// 순열 조합, sort
const getCombinations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((fixed, index) => {
    const rest = arr.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    result.push(...attached);
  });
  return result;
};

function solution(orders, course) {
  const answer = [];
  orders = orders.map((v) => v.split('').sort());
  course.forEach((selectNumber) => {
    const orderObj = {};
    orders.forEach((order) => {
      const combinations = getCombinations(order, selectNumber);
      combinations.forEach((combination) => {
        const key = combination.join('');
        if (orderObj[key]) orderObj[key]++;
        else orderObj[key] = 1;
      });
    });
    const orderEntries = Object.entries(orderObj);
    orderEntries.sort((a, b) => b[1] - a[1]);
    const max = orderEntries.length && orderEntries[0][1];
    if (max > 1) {
      let i = 0;
      while (orderEntries[i][1] === max) {
        answer.push(orderEntries[i][0]);
        i++;
      }
    }
  });
  return answer.sort();
}

// https://programmers.co.kr/learn/courses/30/lessons/72412
// 3. 순위 검색
// 시간 복잡도를 줄이는 방법, 부가적으로 등장하는 이진탐색
const makeInfoObj = () => {
  const languageArr = ['cpp', 'java', 'python', '-'];
  const jobArr = ['backend', 'frontend', '-'];
  const carrerArr = ['junior', 'senior', '-'];
  const foodArr = ['chicken', 'pizza', '-'];
  const infoObj = {};
  languageArr.forEach((language) => {
    jobArr.forEach((job) => {
      carrerArr.forEach((carrer) => {
        foodArr.forEach((food) => {
          const key = [language, job, carrer, food].join(' ');
          infoObj[key] = [];
        });
      });
    });
  });
  return infoObj;
};

const insertInfo = (infoObj, infoArr) => {
  infoArr.forEach((v) => {
    const [language, job, carrer, food, score] = v.split(' ');
    const languageArr = [language, '-'];
    const jobArr = [job, '-'];
    const carrerArr = [carrer, '-'];
    const foodArr = [food, '-'];
    languageArr.forEach((language) => {
      jobArr.forEach((job) => {
        carrerArr.forEach((carrer) => {
          foodArr.forEach((food) => {
            const key = [language, job, carrer, food].join(' ');
            infoObj[key].push(+score);
          });
        });
      });
    });
  });
};

const countValidation = (query, infoObj, countArr) => {
  const [language, job, carrer, rest] = query.split(' and ');
  const [food, score] = rest.split(' ');
  const key = [language, job, carrer, food].join(' ');
  // console.log(infoObj[key],score);
  const arr = infoObj[key];
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] >= score) l = m + 1;
    else r = m - 1;
  }
  countArr.push(l);
};

function solution(info, query) {
  const answer = [];
  const infoObj = makeInfoObj();
  insertInfo(infoObj, info);
  for (const key in infoObj) {
    infoObj[key].sort((a, b) => b - a);
  }
  query.forEach((v) => {
    countValidation(v, infoObj, answer);
  });
  return answer;
}

// 4. 합승택시요금
// https://programmers.co.kr/learn/courses/30/lessons/72413
// 다익스트라 응용문제
function solution(n, s, a, b, fares) {
  const distance = Array(n)
    .fill()
    .map((_, i) =>
      Array(n)
        .fill()
        .map((__, j) => (i === j ? 0 : Infinity))
    );
  fares.forEach((fare) => {
    const [from, to, weight] = fare;
    distance[from - 1][to - 1] = weight;
    distance[to - 1][from - 1] = weight;
  });
  for (let mid = 0; mid < n; mid++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        distance[from][to] = Math.min(
          distance[from][to],
          distance[from][mid] + distance[mid][to]
        );
      }
    }
  }
  const arr = [];
  for (let i = 0; i < n; i++) {
    const distFromS = distance[i][s - 1];
    const distFromA = distance[i][a - 1];
    const distFromB = distance[i][b - 1];
    const sum = distFromS + distFromA + distFromB;
    arr.push(sum);
  }
  return Math.min(...arr);
}
