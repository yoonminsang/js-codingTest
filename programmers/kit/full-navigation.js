// https://programmers.co.kr/learn/courses/30/lessons/42840
function solution(answers) {
  const corretCounts = [];
  const checkArr = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];
  checkArr.forEach((check, checkIdx) => {
    let count = 0;
    answers.forEach((answer, answerIdx) => {
      if (check[answerIdx % check.length] === answer) count++;
    });
    corretCounts.push([count, checkIdx + 1]);
  });
  corretCounts.sort((a, b) => b[0] - a[0]);
  const max = corretCounts[0][0];
  const answer = [];
  for (let i = 0; i < 3; i++) {
    const [count, idx] = corretCounts[i];
    if (count === max) answer.push(idx);
    else break;
  }
  return answer;
}

const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((v, i) => {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    const permutations = getPermutations(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [v, ...permutation]);
    result.push(...attached);
  });
  return result;
};

const isPrime = (number) => {
  if (number < 2) return false;
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }
  return true;
};

// https://programmers.co.kr/learn/courses/30/lessons/42839
function solution(numbers) {
  let permutations = [];
  const numbersArr = numbers.split('');
  for (let i = 1; i <= numbers.length; i++) {
    permutations.push(...getPermutations(numbersArr, i));
  }
  permutations = permutations.map((v) => +v.join(''));
  permutations = [...new Set(permutations)];
  return permutations.reduce((acc, cur) => (isPrime(cur) ? acc + 1 : acc), 0);
}
