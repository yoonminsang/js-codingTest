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
