// 1
function solution(s) {
  const result = [];
  for (let i = 1; i <= s.length; i++) {
    let arr = [];
    for (let j = 0; j < s.length; j += i) {
      const temp = s.slice(j, j + i);
      if (arr.length && temp === arr[arr.length - 1][1]) {
        arr[arr.length - 1][0]++;
      } else {
        arr.push([1, temp]);
      }
    }
    arr = arr.map(([count, str]) => {
      if (count === 1) return [, str];
      return [count, str];
    });
    result.push(arr.flat().join('').length);
  }
  return Math.min(...result);
}

// 2
function solution(p) {
  if (!p) return '';
  let count = 0;
  let balance = true;
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') count++;
    else count--;
    if (count < 0) balance = false;
    if (count === 0) {
      if (balance) {
        return p.slice(0, i + 1) + solution(p.slice(i + 1));
      } else {
        let answer = '(' + solution(p.slice(i + 1)) + ')';
        for (let j = 1; j < i; j++) {
          answer += p[j] === '(' ? ')' : '(';
        }
        return answer;
      }
    }
  }
}

//3
const rotate = (key) => {
  const arr = Array(key.length)
    .fill()
    .map(() => Array(key.length).fill(null));
  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < key.length; j++) {
      arr[j][key.length - 1 - i] = key[i][j];
    }
  }
  return arr;
};

const expand = (key, keyLen, lockLen) => {
  const arr = [];
  for (let i = 0; i < lockLen; i++) {
    arr.push(Array(keyLen + 2 * lockLen).fill(0));
  }
  for (let i = lockLen; i < lockLen + keyLen; i++) {
    arr.push(
      Array(lockLen)
        .fill(0)
        .concat(key[i - lockLen])
        .concat(Array(lockLen).fill(0))
    );
  }
  for (let i = 0; i < lockLen; i++) {
    arr.push(Array(keyLen + 2 * lockLen).fill(0));
  }
  return arr;
};

const compare = (arr1, arr2, len) => {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (!(arr1[i][j] ^ arr2[i][j])) return false;
    }
  }
  return true;
};

function solution(key, lock) {
  const keyLen = key.length;
  const lockLen = lock.length;
  for (let i = 0; i < 4; i++) {
    key = rotate(key);
    const expandKey = expand(key, keyLen, lockLen);
    const expandKeyLen = expandKey.length;
    for (let i = 0; i < expandKeyLen - lockLen; i++) {
      for (let j = 0; j < expandKeyLen - lockLen; j++) {
        const realKey = [];
        for (let k = i; k < i + lockLen; k++) {
          realKey.push(expandKey[k].slice(j, j + lockLen));
        }
        if (compare(realKey, lock, lockLen)) return true;
      }
    }
  }
  return false;
}

// 4
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
