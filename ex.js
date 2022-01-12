// // 5과목, 각과목은 4개의 분반, 분반은 서로다른 교수 강의. 시간 겹칠수도 아닐수도
// // 철수는 5개 과목 모두 듣게 각과목마다 하나의 분반 선택
// // 올바른 시간표 개수구하기
// // 시간이 하나만 연속으로 3시간, 두개면 1시간반
// const timeToMinute = (time) => {
//   const [hour, minute] = time.split(':');
//   return hour * 60 + minute * 1;
// };

// const isDuplicate = (schedule1, schedule2) => {
//   if (schedule1.length === 0 || schedule2.length === 0) return false;
//   const [day1, start1, end1] = schedule1;
//   const [day2, start2, end2] = schedule2;
//   if (day1 !== day2) return false;
//   if (start1 <= start2 && start2 <= end1) return false;
//   if (start2 <= start1 && start1 <= end2) return false;
//   return true;
// };

// function solution(schedule) {
//   const subjectArr = [];
//   schedule.forEach((v, i) => {
//     const temp = [];
//     v.forEach((v2) => {
//       const [day1, time1, day2, time2] = v2.split(' ');
//       const timetoMinute1 = timeToMinute(time1);
//       if (day2) {
//         const timetoMinute2 = timeToMinute(time2);
//         temp.push([day1, timetoMinute1, timetoMinute1 + 90]);
//         temp.push([day2, timetoMinute2, timetoMinute2 + 90]);
//       } else {
//         temp.push([day1, timetoMinute1, timetoMinute1 + 180]);
//       }
//     });
//     subjectArr.push(temp);
//   });
//   console.log(subjectArr);
//   // for (let i = 0; i < subjectArr[0].length; i++) { // 첫번째 과목에서 하나씩 선택
//   //   const arr = [subjectArr[0][i]];
//   const arr = [];
//   for (let j = 0; j < 5; j++) {
//     // 과목 5개 선택
//     const temp = [];
//     for (let k = 0; k < subjectArr[j].length; k++) {
//       // 과목당 수업 선택(4개이지만 요일이 두개인 경우가 있어서)
//       let duplicate = false;
//       let nextArr = subjectArr[j][k];
//       for (let l = 0; l < arr.length; l++) {
//         // 중복확인할려고
//         if (isDuplicate(arr[l], subjectArr[j][k])) {
//           duplicate = true;
//           break;
//         }
//       }
//       if (!duplicate) temp.push(nextArr);
//     }
//     console.log('temp', temp);
//     // }
//     // console.log(arr);
//   }
// }

// console.log(
//   solution([
//     ['MO 12:00 WE 14:30', 'MO 12:00', 'MO 15:00', 'MO 18:00'],
//     ['TU 09:00', 'TU 10:00', 'TU 15:00', 'TU 18:00'],
//     ['WE 09:00', 'WE 12:00', 'WE 15:00', 'WE 18:00'],
//     ['TH 09:30', 'TH 11:30', 'TH 15:00', 'TH 18:00'],
//     ['FR 15:00', 'FR 15:00', 'FR 15:00', 'FR 15:00'],
//   ]),
// );

// ---------------------

// const getCombinations = (arr, selectNumber) => {
//   if (selectNumber === 1) return arr.map((i) => [i]);
//   const result = [];
//   arr.forEach((fixed, index) => {
//     const rest = arr.slice(index + 1);
//     const combinations = getCombinations(rest, selectNumber - 1);
//     const attached = combinations.map((combination) => [fixed, ...combination]);
//     result.push(...attached);
//   });
//   return result;
// };

// const isPalindrome = (str) => {
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] !== str[str.length - 1 - i]) return false;
//   }
//   return true;
// };

// const removeArr = (arr, answer, value) => {
//   // if (arr.length === 0) return true;
//   if (arr.length === 0) {
//     answer.add(value);
//     return;
//   }
//   const combinations = getCombinations(arr, 2);
//   combinations.forEach((combination) => {
//     if (isPalindrome(combination[0] + combination[1]) || isPalindrome(combination[1] + combination[0])) {
//       // const indexArr=[];
//       // indexArr.push(arr.indexOf(combination[0]), arr.indexOf(combination[1]));
//       // indexArr.sort((a,b)=>b-a);
//       // const copy=arr.slice();
//       // copy.splice(indexArr[0],1);
//       // copy.splice(indexArr[1],1);
//       // removeArr(copy)
//       const copy = arr.slice();
//       // console.log('copy 0', copy);
//       copy.splice(copy.indexOf(combination[0]), 1);
//       // console.log('copy 1', copy);
//       // console.log('---------------------------------', copy.indexOf(combination[1]), 1);
//       copy.splice(copy.indexOf(combination[1]), 1);
//       removeArr(copy, answer, value);
//     }
//   });
// };

// function solution(P) {
//   const firstElement = P[0];
//   // const answer = [];
//   const answer = new Set();
//   for (let i = 1; i < P.length; i++) {
//     if (!isPalindrome(firstElement + P[i]) && !isPalindrome(P[i] + firstElement)) continue;
//     const copy = P.slice();
//     copy.splice(i, 1);
//     copy.shift();
//     if (removeArr(copy, answer, P[i])) {
//       answer.push(P[i]);
//     } // const combinations = getCombinations(copy, 2);
//     // let palindrome = true;
//     // for (let j = 0; j < combinations.length; j++) {
//     //   if (
//     //     !isPalindrome(combinations[j][0] + combinations[j][1]) &&
//     //     !isPalindrome(combinations[j][1] + combinations[j][0])
//     //   ) {
//     //     palindrome = false;
//     //     break;
//     //   }
//     // }
//     // if (palindrome) answer.push(P[i]);
//   }
//   return [...answer];
// }

// console.log(solution(['21', '123', '111', '11', '1111', '1111']));

// 5과목, 각과목은 4개의 분반, 분반은 서로다른 교수 강의. 시간 겹칠수도 아닐수도
// 철수는 5개 과목 모두 듣게 각과목마다 하나의 분반 선택
// 올바른 시간표 개수구하기
// 시간이 하나만 연속으로 3시간, 두개면 1시간반
// const timeToMinute = (time) => {
//   const [hour, minute] = time.split(':');
//   return hour * 60 + minute * 1;
// };

// const isDuplicate = (schedule1, schedule2) => {
//   const [day1, start1, end1] = schedule1;
//   const [day2, start2, end2] = schedule2;
//   if (day1 !== day2) return false;
//   if (start1 <= start2 && start2 <= end1) return false;
//   if (start2 <= start1 && start1 <= end2) return false;
//   return true;
// };

// function solution(schedule) {
//   const scheduleArr = [];
//   schedule.forEach((v, i) => {
//     const temp = [];
//     v.forEach((v2) => {
//       const [day1, time1, day2, time2] = v2.split(' ');
//       const timetoMinute1 = timeToMinute(time1);
//       if (day2) {
//         const timetoMinute2 = timeToMinute(time2);
//         temp.push([day1, timetoMinute1, timetoMinute1 + 90]);
//         temp.push([day2, timetoMinute2, timetoMinute2 + 90]);
//       } else {
//         temp.push([day1, timetoMinute1, timetoMinute1 + 180]);
//       }
//     });
//     scheduleArr.push(temp);
//   });
//   console.log(scheduleArr);

//   const arr = [scheduleArr[0][i]];
//   for (let j = 0; j < 5; j++) {
//     // 과목 5개 선택
//     for (let i = 0; i < scheduleArr[j].length; i++) {
//       // j번째 과목에서 하나씩 선택
//       for (let k = 0; k < scheduleArr[j].length; k++) {
//         // 과목당 수업 선택(4개이지만 요일이 두개인 경우가 있어서)
//         let duplicate = false;
//         let nextArr;
//         for (let l = 0; l < arr.length; l++) {
//           // 중복확인할려고
//           nextArr = scheduleArr[j][k];
//           if (isDuplicate(arr[l], scheduleArr[j][k])) {
//             duplicate = true;
//             break;
//           }
//         }
//         if (!duplicate) arr.push(nextArr);
//       }
//     }
//     console.log(arr);
//   }
// }

// console.log(
//   solution([
//     ['MO 12:00 WE 14:30', 'MO 12:00', 'MO 15:00', 'MO 18:00'],
//     ['TU 09:00', 'TU 10:00', 'TU 15:00', 'TU 18:00'],
//     ['WE 09:00', 'WE 12:00', 'WE 15:00', 'WE 18:00'],
//     ['TH 09:30', 'TH 11:30', 'TH 15:00', 'TH 18:00'],
//     ['FR 15:00', 'FR 15:00', 'FR 15:00', 'FR 15:00'],
//   ]),
// );

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

const isPalindrome = (str) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[str.length - 1 - i]) return false;
  }
  return true;
};

const removeArr = (P, answer, value) => {
  if (P.length === 0) {
    answer.add(value);
    return;
  }
  const firstElement = P[0];
  for (let i = 1; i < P.length; i++) {
    if (!isPalindrome(firstElement + P[i]) && !isPalindrome(P[i] + firstElement)) continue;
    const copy = P.slice();
    copy.splice(i, 1);
    copy.shift();
    removeArr(copy, answer, P[i]);
  }
};

function solution(P) {
  const answer = new Set();

  const firstElement = P[0];
  for (let i = 1; i < P.length; i++) {
    if (!isPalindrome(firstElement + P[i]) && !isPalindrome(P[i] + firstElement)) continue;
    const copy = P.slice();
    copy.splice(i, 1);
    copy.shift();
    removeArr(copy, answer, P[i]);
  }
  // removeArr(P, answer);
  return [...answer];
}
console.log(solution(['11', '111', '11', '211']));
