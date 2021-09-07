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
  course.forEach((count) => {
    const orderObj = {};
    orders.forEach((order) => {
      order = order.split('');
      const combinations = getCombinations(order, count);
      combinations.forEach((combination) => {
        combination = combination.join('');
        if (orderObj[combination]) orderObj[combination]++;
        else orderObj[combination] = 1;
      });
    });
    const orderArr = Object.entries(orderObj);
    orderArr.sort((a, b) => b[1] - a[1]);
    console.log(orderArr);
    const max = orderArr[0] && orderArr[0][1];
    if (max)
      for (let i = 0; i < orderArr.lenght; i++) {
        const [order, count] = orderArr[i];
        if (max !== count) break;
        answer.push(order);
      }
  });
  answer.sort();
  return answer;
}
console.log(
  solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4])
);
console.log(
  solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5])
);
console.log(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4]));
