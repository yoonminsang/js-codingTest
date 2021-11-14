// 해설
// https://tech.kakao.com/2021/01/25/2021-kakao-recruitment-round-1/

// https://programmers.co.kr/learn/courses/30/lessons/72410
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
