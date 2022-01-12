const getFactorial = (n) => {
  let answer = 1;
  for (let i = n; i > 0; i--) {
    answer *= i;
  }
  return answer;
  // if (n == 0) return 1;
  // return n * getFactorial(n - 1);
};

function solution(n, k) {
  const isValidate = (arr, column) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === column) return false;
    }
    return true;
  };

  const dfs = (arr, n, k) => {
    if (arr.length === k) {
      count++;
      return;
    }
    for (let column = 0; column < n; column++) {
      if (isValidate(arr, column)) dfs(arr.concat(column), n, k);
    }
  };
  let count = 0;
  for (let i = 0; i < n; i++) {
    dfs([i], n, k, 0);
  }
  const combination = getFactorial(n) / (getFactorial(k) * getFactorial(n - k));
  return (count * combination) % 10007;
}

const getCombinations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((i) => [i]);
  const result = [];
  arr.forEach((fixed, index) => {
    const rest = arr.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    result.push(...attached);
  });
  return result;
};

function solution(n, k) {
  const isValidate = (arr, column) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === column) return false;
    }
    return true;
  };

  const dfs = (arr, n, k, combination) => {
    if (arr.length === k) {
      console.log(arr);
      answer++;
    }
    combination.forEach((value) => {
      if (isValidate(arr, value)) dfs(arr.concat(value), n, k, combination);
    });
    // for(let column=0;column<n;column++){
    //     if(isValidate(arr,column)) dfs(arr.concat(column),n,k);
    // }
  };
  let answer = 0;
  const nToArray = Array(n)
    .fill()
    .map((_, index) => index);
  const combinations = getCombinations(nToArray, k);
  combinations.forEach((combination) => {
    combination.forEach((value) => {
      dfs([value], n, k, combination);
    });
  });
  // dfs([i],n,k,0);
  return answer;
}
console.log(solution(2, 2));
