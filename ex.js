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
    console.log('info~~~~~~~~~~~~~~~~~~~', v);
    const [language, job, carrer, food, score] = v.split(' ');
    const languageArr = ['-', language];
    const jogArr = ['-', job];
    const carrerArr = ['-', carrer];
    const foodArr = ['-', food];
    languageArr.forEach((language) => {
      jobArr.forEach((job) => {
        carrerArr.forEach((carrer) => {
          foodArr.forEach((food) => {
            const key = [language, job, carrer, food].join(' ');
            console.log(key, score);
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
    //console.log(key,arr,score);
    answer.push(left);
  });
  //console.log(obj);
  return answer;
}
