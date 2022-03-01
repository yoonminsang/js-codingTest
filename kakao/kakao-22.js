// 1. 신고 결과 받기
// https://programmers.co.kr/learn/courses/30/lessons/92334

function solution(id_list, report, k) {
  const reportListObj = id_list.reduce((acc, cur) => {
    acc[cur] = [];
    return acc;
  }, {});
  const reportCountObj = id_list.reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
  }, {});
  report.forEach((v) => {
    const [from, to] = v.split(' ');
    if (!reportListObj[from].includes(to)) {
      reportListObj[from].push(to);
      reportCountObj[to] += 1;
    }
  });
  const banObj = {};
  Object.entries(reportCountObj).forEach(([key, value]) => {
    if (value >= k) banObj[key] = true;
  });
  return id_list.map((id) => {
    return reportListObj[id].reduce((acc, cur) => {
      if (banObj[cur]) return acc + 1;
      return acc;
    }, 0);
  });
}

// 2. k진수에서 소수 개수 구하기
// https://programmers.co.kr/learn/courses/30/lessons/92335

const isInteger = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

function solution(n, k) {
  const numberArr = n.toString(k).split('0');
  return numberArr.filter((number) => isInteger(number)).length;
}

// 3. 주차 요금 계산
// https://programmers.co.kr/learn/courses/30/lessons/92341

const timeToMinute = (time) => {
  const [hour, minute] = time.split(':');
  return hour * 60 + minute * 1;
};

const lastTime = timeToMinute('23:59');

const calculateFare = (fees, diffTime) => {
  const [basicTime, basicFare, unitTime, unitFare] = fees;
  if (diffTime <= basicTime) return basicFare;
  return basicFare + unitFare * Math.ceil((diffTime - basicTime) / unitTime);
};

function solution(fees, records) {
  const obj = {};
  records.forEach((record) => {
    const [time, carNumber, type] = record.split(' ');
    if (!obj[carNumber]) obj[carNumber] = 0;
    if (type === 'IN') obj[carNumber] += lastTime - timeToMinute(time);
    else obj[carNumber] -= lastTime - timeToMinute(time);
  });
  return Object.entries(obj)
    .map(([carNumber, diffTime]) => [carNumber, calculateFare(fees, diffTime)])
    .sort((a, b) => a[0] - b[0])
    .map(([carNumber, diffTime]) => diffTime);
}

// 4. 양궁대회
// https://programmers.co.kr/learn/courses/30/lessons/92342

function solution(n, info) {
  let answer = Array(11).fill(0);
  let max = 0;
  const dfs = (apeachScore, lionScore, shotCount, index, lionInfo) => {
    const reverseIndex = 10 - index;
    // 화살을 n보다 많이쏜 경우 return;
    if (n < shotCount) return;

    // 마지막 index인 경우
    if (index > 10) {
      let diffrentScore = lionScore - apeachScore;
      if (max < diffrentScore) {
        lionInfo[10] = n - shotCount;
        max = diffrentScore;
        answer = lionInfo;
      }
      return;
    }

    // 라이언이 이기는 경우
    if (n >= shotCount) {
      const nextLionInfo = lionInfo.slice();
      const apeachShotCount = info[reverseIndex];
      nextLionInfo[reverseIndex] = apeachShotCount + 1;
      dfs(apeachScore, lionScore + index, shotCount + apeachShotCount + 1, index + 1, nextLionInfo);
    }

    // 어파치가 이기는 경우
    if (info[reverseIndex] > 0) {
      dfs(apeachScore + index, lionScore, shotCount, index + 1, lionInfo);
    }
    // 둘다 점수를 못 얻는 경우
    else {
      dfs(apeachScore, lionScore, shotCount, index + 1, lionInfo);
    }
  };
  dfs(0, 0, 0, 0, answer);
  if (max > 0) return answer;
  return [-1];
}

// 4. 양과 늑대
// https://programmers.co.kr/learn/courses/30/lessons/92343
// 참고해서 품. 나는 바보

const makeTree = (info, edges) => {
  const tree = Array(info.length)
    .fill(null)
    .map(() => []);
  edges.forEach(([parent, child]) => {
    tree[parent].push(child);
  });
  return tree;
};

function solution(info, edges) {
  const tree = makeTree(info, edges);
  let max = 1;
  const dfs = (sheepCount, wolfCount, currentNode, nextNodes) => {
    info[currentNode] === 1 ? wolfCount++ : sheepCount++;

    if (sheepCount <= wolfCount) return;

    max = Math.max(max, sheepCount);

    const newNextNodes = [...nextNodes];
    const index = newNextNodes.indexOf(currentNode);
    newNextNodes.splice(index, 1);
    newNextNodes.push(...tree[currentNode]);
    for (const nextNode of newNextNodes) {
      dfs(sheepCount, wolfCount, nextNode, newNextNodes);
    }
  };
  dfs(0, 0, 0, [0]);
  return max;
}
