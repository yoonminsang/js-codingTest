class TrieNode {
  constructor() {
    this.children = Array(26).fill(null);
    this.isEndOfWord = false;
    this.count = 0;
  }
}

function insert(key, root) {
  root.count++;
  for (let level = 0; level < key.length; ++level) {
    const index = key[level].charCodeAt(0) - 'a'.charCodeAt(0);
    if (root.children[index] === null) root.children[index] = new TrieNode();
    root.children[index].count++;
    root = root.children[index];
  }
  root.isEndOfWord = true;
}

function find(key, root) {
  for (let level = 0; level < key.length; ++level) {
    console.log(key, key[level]);
    if (key[level] === '?') return root.count;
    const index = key[level].charCodeAt(0) - 'a'.charCodeAt(0);
    if (root.children[index] === null) return 0;
    root = root.children[index];
  }
  return root.count;
}

function solution(words, queries) {
  const frontRoot = Array.from({ length: 10001 }, () => new TrieNode());
  const rearRoot = Array.from({ length: 10001 }, () => new TrieNode());

  for (let word of words) {
    insert(word, frontRoot[word.length]);
    insert(word.split('').reverse().join(''), rearRoot[word.length]);
  }
  const answer = [];
  for (let query of queries) {
    if (query[0] !== '?') {
      answer.push(find(query, frontRoot[query.length]));
    } else {
      answer.push(
        find(query.split('').reverse().join(''), rearRoot[query.length])
      );
    }
  }
  return answer;
}

console.log(
  solution(
    ['frodo', 'front', 'frost', 'frozen', 'frame', 'kakao'],
    ['fro??', '????o', 'fr???', 'fro???', 'pro?']
  )
);
