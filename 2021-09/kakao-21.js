// 1
function solution(new_id) {
  const id = (
    new_id
      .toLowerCase()
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '') || 'a'
  )
    .slice(0, 15)
    .replace(/\.$/, '');
  return id.length <= 2 ? id + id[id.length - 1].repeat(3 - id.length) : id;
}

// 2
const getCombinations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((fixed, index) => {
    const rest = arr.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attach = combinations.map((combination) => [fixed, ...combination]);
    result.push(...attach);
  });
  return result;
};

function solution(orders, course) {
  const answer = [];
  course.forEach((num) => {
    const obj = {};
    orders.forEach((order) => {
      const combinations = getCombinations(order.split('').sort(), num);
      combinations.forEach((combination) => {
        const key = combination.join('');
        if (obj[key]) obj[key]++;
        else obj[key] = 1;
      });
    });
    const arr = Object.entries(obj);
    arr.sort((a, b) => b[1] - a[1]);
    const max = arr.length && arr[0][1];
    if (max >= 2)
      for (let i = 0; i < arr.length; i++) {
        const [key, value] = arr[i];
        if (value !== max) break;
        answer.push(key);
      }
  });
  answer.sort();
  return answer;
}

// 3
function solution(info, query) {
  const answer = [];
  const obj = {};
  const languageArr = ['cpp', 'java', 'python', '-'];
  const jobArr = ['backend', 'frontend', '-'];
  const carrerArr = ['junior', 'senior', '-'];
  const foodArr = ['chicken', 'pizza', '-'];
  languageArr.forEach((language) => {
    jobArr.forEach((job) => {
      carrerArr.forEach((carrer) => {
        foodArr.forEach((food) => {
          const key = `${language} ${job} ${carrer} ${food}`;
          obj[key] = [];
        });
      });
    });
  });
  info.forEach((v) => {
    const [language, job, carrer, food, score] = v.split(' ');
    for (let a = 0; a < 2; a++) {
      for (let b = 0; b < 2; b++) {
        for (let c = 0; c < 2; c++) {
          for (let d = 0; d < 2; d++) {
            const temp = [];
            if (a) temp.push(language);
            else temp.push('-');
            if (b) temp.push(job);
            else temp.push('-');
            if (c) temp.push(carrer);
            else temp.push('-');
            if (d) temp.push(food);
            else temp.push('-');
            const key = temp.join(' ');
            obj[key].push(+score);
          }
        }
      }
    }
  });
  for (let i in obj) {
    obj[i].sort((a, b) => b - a);
  }
  query.forEach((v) => {
    const [language, job, carrer, food, score] = v
      .replace(/( and )/g, ' ')
      .split(' ');
    const key = `${language} ${job} ${carrer} ${food}`;
    const arr = obj[key];
    let left = 0,
      right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] >= score) left = mid + 1;
      else right = mid - 1;
    }
    answer.push(left);
  });
  return answer;
}

// 4
function solution(n, s, a, b, fares) {
  const arr = Array(n)
    .fill()
    .map((_, i) =>
      Array(n)
        .fill()
        .map((_, j) => (i === j ? 0 : Infinity))
    );
  fares.forEach(([from, to, weight]) => {
    arr[from - 1][to - 1] = weight;
    arr[to - 1][from - 1] = weight;
  });
  for (let mid = 0; mid < n; mid++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        arr[from][to] = Math.min(arr[from][to], arr[from][mid] + arr[mid][to]);
      }
    }
  }
  const min = [];
  for (let i = 0; i < n; i++) {
    min.push(arr[s - 1][i] + arr[i][a - 1] + arr[i][b - 1]);
  }
  return Math.min(...min);
}
