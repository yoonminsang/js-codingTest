function solution(new_id) {
  let id =
    new_id
      .toLowerCase()
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '') || 'a';
  id = id.slice(0, 15).replace(/\.$/, '');
  if (id.length <= 2) return id + id[id.length - 1].repeat(3 - id.length);
  return id;
}

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
  orders = orders.map((order) => order.split('').sort());
  course.forEach((selectNumber) => {
    const obj = {};
    orders.forEach((order) => {
      const combinations = getCombinations(order, selectNumber);
      combinations.forEach((combination) => {
        combination = combination.join('');
        if (!obj[combination]) obj[combination] = 1;
        else obj[combination]++;
      });
    });
    const arr = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    const max = arr.length && arr[0][1];
    if (max >= 2) {
      for (let i = 0; i < arr.length; i++) {
        if (max !== arr[i][1]) break;
        answer.push(arr[i][0]);
      }
    }
  });
  return answer.sort();
}

function solution(info, query) {
  const languageArr = ['-', 'cpp', 'java', 'python'];
  const jobArr = ['-', 'backend', 'frontend'];
  const carrerArr = ['-', 'junior', 'senior'];
  const foodArr = ['-', 'chicken', 'pizza'];
  const obj = {};
  languageArr.forEach((language) => {
    jobArr.forEach((job) => {
      carrerArr.forEach((carrer) => {
        foodArr.forEach((food) => {
          const key = [language, job, carrer, food].join(' ');
          obj[key] = [];
        });
      });
    });
  });
  info.forEach((v) => {
    const [language, job, carrer, food, score] = v.split(' ');
    const languageArr = ['-', language];
    const jobArr = ['-', job];
    const carrerArr = ['-', carrer];
    const foodArr = ['-', food];
    languageArr.forEach((language) => {
      jobArr.forEach((job) => {
        carrerArr.forEach((carrer) => {
          foodArr.forEach((food) => {
            const key = [language, job, carrer, food].join(' ');
            obj[key].push(+score);
          });
        });
      });
    });
  });
  for (const key in obj) {
    obj[key].sort((a, b) => b - a);
  }
  const answer = [];
  query.forEach((v) => {
    const [language, job, carrer, rest] = v.split(' and ');
    const [food, score] = rest.split(' ');
    const key = [language, job, carrer, food].join(' ');
    const arr = obj[key];
    let left = 0,
      right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < score) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    answer.push(left);
  });
  return answer;
}

function solution(n, s, a, b, fares) {
  const distance = Array(n)
    .fill()
    .map((_, i) =>
      Array(n)
        .fill()
        .map((_, j) => (i === j ? 0 : Infinity))
    );
  fares.forEach(([from, to, weight]) => {
    distance[from - 1][to - 1] = weight;
    distance[to - 1][from - 1] = weight;
  });
  for (let mid = 0; mid < n; mid++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        distance[from][to] = Math.min(
          distance[from][to],
          distance[from][mid] + distance[mid][to]
        );
      }
    }
  }
  const arr = [];
  distance.forEach((v, i) => {
    arr.push(v[a - 1] + v[b - 1] + distance[s - 1][i]);
  });
  return Math.min(...arr);
}

const timeToSecond = (time) => {
  const [hour, minute, second] = time.split(':');
  return hour * 3600 + minute * 60 + second * 1;
};

const secondToTime = (second) => {
  const hour = Math.floor(second / 3600);
  second %= 3600;
  const minute = Math.floor(second / 60);
  second %= 60;
  return [hour, minute, second]
    .map((time) => (time < 10 ? '0' + String(time) : time))
    .join(':');
};

function solution(play_time, adv_time, logs) {
  const playTimeToSecond = timeToSecond(play_time);
  const advTimeToSecond = timeToSecond(adv_time);
  const logsToSecond = logs.map((log) => {
    const [from, to] = log.split('-');
    return [timeToSecond(from), timeToSecond(to)];
  });
  const arr = Array(playTimeToSecond).fill(0);
  logsToSecond.forEach(([from, to]) => {
    arr[from]++;
    arr[to]--;
  });
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i + 1] += arr[i];
  }
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i + 1] += arr[i];
  }
  let max = arr[advTimeToSecond];
  let start = 0;
  for (let i = 0; i < playTimeToSecond - advTimeToSecond; i++) {
    const temp = arr[i + advTimeToSecond] - arr[i];
    if (temp > max) {
      max = temp;
      start = i + 1;
    }
  }
  return secondToTime(start);
}
