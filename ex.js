const makeInfoObj = () => {
  const languageArr = ['cpp', 'java', 'python', '-'];
  const jobArr = ['backend', 'frontend', '-'];
  const carrerArr = ['junior', 'senior', '-'];
  const foodArr = ['chicken', 'pizza', '-'];
  const infoObj = {};
  languageArr.forEach((language) => {
    jobArr.forEach((job) => {
      carrerArr.forEach((carrer) => {
        foodArr.forEach((food) => {
          const key = [language, job, carrer, food].join(' ');
          infoObj[key] = [];
        });
      });
    });
  });
  return infoObj;
};

const insertInfo = (infoObj, infoArr) => {
  infoArr.forEach((v) => {
    const [language, job, carrer, food, score] = v.split(' ');
    const languageArr = [language, '-'];
    const jobArr = [job, '-'];
    const carrerArr = [carrer, '-'];
    const foodArr = [food, '-'];
    languageArr.forEach((language) => {
      jobArr.forEach((job) => {
        carrerArr.forEach((carrer) => {
          foodArr.forEach((food) => {
            const key = [language, job, carrer, food].join(' ');
            infoObj[key].push(+score);
          });
        });
      });
    });
  });
};

const countValidation = (query, infoObj, countArr) => {
  const [language, job, carrer, rest] = query.split(' and ');
  const [food, score] = rest.split(' ');
  const key = [language, job, carrer, food].join(' ');
  // console.log(infoObj[key],score);
  const arr = infoObj[key];
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] >= score) l = m + 1;
    else r = m - 1;
  }
  countArr.push(l);
};

function solution(info, query) {
  const answer = [];
  const infoObj = makeInfoObj();
  insertInfo(infoObj, info);
  for (const key in infoObj) {
    infoObj[key].sort((a, b) => b - a);
  }
  query.forEach((v) => {
    countValidation(v, infoObj, answer);
  });
  return answer;
}

console.log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ]
  )
);
