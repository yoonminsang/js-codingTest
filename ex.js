function solution(begin, target, words) {
  const queue = [[begin, 0]];
  const wordLength = words[0].length;
  const visited = Array(wordLength).fill(false);
  while (queue.length) {
    console.log(queue);
    const [lastWord, lastCount] = queue.shift();
    for (let i = 0; i < words.length; i++) {
      console.log(words[i]);
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

console.log(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']));
