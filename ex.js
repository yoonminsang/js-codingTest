const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((i) => [i]); // 1개씩 선택한다면 모든 배열의 원소를 return한다.
  const results = [];
  arr.forEach((fixed, index, array) => {
    const rest = arr.slice(0, index).concat(arr.slice(index + 1)); // fixed를 제외한 나머지 배열(순열)
    const permutations = getPermutations(rest, selectNumber - 1); // rest에 대한 순열을 구한다.
    const attached = permutations.map((permutation) => [fixed, ...permutation]); // fixed와 rest에 대한 조합을 붙인다.
    results.push(...attached); // result 배열에 push
  });
  return results;
};

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

function solution(numbers) {
  let permutation = [];
  for (let i = 1; i <= numbers.length; i++) {
    permutation.push(...getPermutations(numbers.split(''), i));
  }
  permutation = permutation.map((v) => +v.join(''));
  permutation = [...new Set(permutation)];
  return permutation.reduce((acc, cur) => {
    return isPrime(cur) ? acc + 1 : acc;
  }, 0);
}

console.log(solution('17')); //3
console.log(solution('011')); //2
