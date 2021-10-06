// https://programmers.co.kr/learn/courses/30/lessons/43165
function solution(numbers, target) {
  let count = 0;
  const dfs = (idx, sum) => {
    if (idx === numbers.length) {
      if (sum === target) count++;
    } else {
      dfs(idx + 1, sum + numbers[idx]);
      dfs(idx + 1, sum - numbers[idx]);
    }
  };
  dfs(0, 0);
  return count;
}

// https://programmers.co.kr/learn/courses/30/lessons/43162
function solution(n, computers) {
  const result = [];
  const visited = Array(n).fill(false);
  const dfs = (arr, n) => {
    for (let i = 0; i < computers.length; i++) {
      if (i === n) visited[i] = true;
      else if (!arr.includes(i) && computers[n][i] === 1) {
        arr.push(i);
        visited[i] = true;
        dfs(arr, i);
      }
    }
    return arr;
  };
  for (let i = 0; i < computers.length; i++) {
    if (!visited[i]) result.push(dfs([i], i));
  }
  return result.length;
}

// https://programmers.co.kr/learn/courses/30/lessons/43163
function solution(begin, target, words) {
  const queue = [[begin, 0]];
  const wordLength = words[0].length;
  const visited = Array(wordLength).fill(false);
  while (queue.length) {
    const [lastWord, lastCount] = queue.shift();
    for (let i = 0; i < words.length; i++) {
      if (visited[i]) continue;
      const word = words[i];
      let wordCorrect = 0;
      for (let j = 0; j < word.length; j++) {
        if (word[j] === lastWord[j]) wordCorrect++;
      }
      if (wordCorrect === wordLength - 1) {
        if (word === target) return lastCount + 1;
        queue.push([word, lastCount + 1]);
        visited[i] = true;
      }
    }
  }
  return 0;
}
