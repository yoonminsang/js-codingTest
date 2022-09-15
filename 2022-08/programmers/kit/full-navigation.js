// https://school.programmers.co.kr/learn/courses/30/lessons/86491?language=javascript
// 최소직사각형
// reduce나 for문써서 한번에 끝낼수도 있는데 이게 제일 깔끔해보여서 이렇게만듬.
// 어차피 빅오관점에서 봤을 때 차이없음. 리팩토링책에서도 for문 한번에 해결할 코드를 두번쓴다고 잘못됬다고 하지 않음.
function solution(sizes) {
  sizes.forEach((size) => size.sort((a, b) => a - b));
  const [w, h] = [Math.max(...sizes.map(([w, h]) => w)), Math.max(...sizes.map(([w, h]) => h))];
  return w * h;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42840
// 모의고사
// 사실 필터를 쓸수도있다. 위에서는 성능 차이가 크지 않아서 for문을 두번사용했는데 여기서는 한번 사용했다.
// 약간 모순적이기도 하지만 이건 알고리즘이라 클린코드와는 상관이 없다.
// 지금 경우에는 함수 분리가 중요하지 filter써서 for문줄일지 for문 한방에 끝낼지가 중요하지는 않은 것 같다.
function solution(answers) {
  const person1Answers = [1, 2, 3, 4, 5];
  const person2Answers = [2, 1, 2, 3, 2, 4, 2, 5];
  const person3Answers = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let [person1Count, person2Count, person3Count] = [0, 0, 0];
  answers.forEach((answer, index) => {
    if (answer === person1Answers[index % person1Answers.length]) person1Count++;
    if (answer === person2Answers[index % person2Answers.length]) person2Count++;
    if (answer === person3Answers[index % person3Answers.length]) person3Count++;
  });
  const max = Math.max(person1Count, person2Count, person3Count);
  const answer = [];
  if (max === person1Count) answer.push(1);
  if (max === person2Count) answer.push(2);
  if (max === person3Count) answer.push(3);
  return answer;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/42839
// 소수찾기
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const getPermutations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((fixed, index) => {
    const permutations = getPermutations([...arr.slice(0, index), ...arr.slice(index + 1)], selectNumber - 1);
    const permutationsWithFixed = permutations.map((permutation) => [fixed, ...permutation]);
    result.push(...permutationsWithFixed);
  });
  return result;
};

function solution(numbers) {
  numbers = numbers.split('').map(Number);
  const set = new Set();
  for (let i = 1; i <= numbers.length; i++) {
    const permutations = getPermutations(numbers, i);
    permutations.forEach((permutation) => {
      set.add(Number(permutation.join('')));
    });
  }
  let count = 0;
  set.forEach((v) => {
    if (isPrime(v)) count++;
  });
  return count;
}
