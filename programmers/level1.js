// 2021.03.30~

// 두 개 뽑아서 더하기
// https://programmers.co.kr/learn/courses/30/lessons/68644
function solution(numbers) {
  const arr = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      arr.push(numbers[i] + numbers[j]);
    }
  }
  return [...new Set(arr)].sort((a, b) => a - b);
}

// 완주하지 못한 선수
// https://programmers.co.kr/learn/courses/30/lessons/42576?language=javascript
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      return participant[i];
    }
  }
}

// 모의고사
// https://programmers.co.kr/learn/courses/30/lessons/42840
// 생각 조금 필요
function solution(answers) {
  const correct = [0, 0, 0];
  const check = [];
  check[0] = [1, 2, 3, 4, 5];
  check[1] = [2, 1, 2, 3, 2, 4, 2, 5];
  check[2] = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (check[j][i % check[j].length] === answers[i]) {
        correct[j] = correct[j] + 1;
      }
    }
  }
  const max = Math.max(...correct);
  const answer = [];
  for (let i = 0; i < 3; i++) {
    if (correct[i] === max) answer.push(i + 1);
  }
  return answer;
}

// K번째수
// https://programmers.co.kr/learn/courses/30/lessons/42748
function solution(array, commands) {
  return commands.map(
    (command) =>
      array.slice(command[0] - 1, command[1]).sort((a, b) => a - b)[
        command[2] - 1
      ]
  );
}

// 체육복
// https://programmers.co.kr/learn/courses/30/lessons/42862
// 생각 필요
function solution(n, lost, reserve) {
  const arr = Array(n).fill(1);
  for (let i of lost) {
    arr[i - 1] = 0;
  }
  for (let i of reserve) {
    arr[i - 1] += 1;
  }
  for (let i = 0; i < n; i++) {
    if (arr[i - 1] === 2 && arr[i] === 0) {
      arr[i - 1] = 1;
      arr[i] = 1;
    } else if (arr[i] === 0 && arr[i + 1] === 2) {
      arr[i] = 1;
      arr[i + 1] = 1;
    }
  }
  return arr.filter((v) => v > 0).length;
}

// 2016년
// https://programmers.co.kr/learn/courses/30/lessons/12901
// date 객체는 코테가 아니더라도 알아야 돼
function solution(a, b) {
  const arr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return arr[new Date(2016, a - 1, b).getDay()];
}

// 3진법 뒤집기
// https://programmers.co.kr/learn/courses/30/lessons/68935
// parseInt(a,n) : n진법 => 10진법, a.toString(n) :  10진법 => n진법
function solution(n) {
  return parseInt(n.toString(3).split('').reverse().join(''), 3);
}

// 가운데 글자 가져오기
// https://programmers.co.kr/learn/courses/30/lessons/12903
//substr, substring, slice 구분하자
function solution(s) {
  if (s.length % 2 === 0) {
    return s.substr(s.length / 2 - 1, 2);
  } else {
    return s[Math.floor(s.length / 2)];
  }
}

// 같은 숫자는 싫어
// https://programmers.co.kr/learn/courses/30/lessons/12906
// for if문이 있다면 filter를 생각해보자
function solution(arr) {
  return arr.filter((v, i) => v !== arr[i + 1]);
  // let answer=[];
  // for(let i of arr){
  //     if(answer[answer.length-1]!==i){
  //         answer.push(i);
  //     }
  // }
  // return answer;
}

// 나누어 떨어지는 숫자 배열
// https://programmers.co.kr/learn/courses/30/lessons/12910
function solution(arr, divisor) {
  const answer = arr.filter((v) => v % divisor === 0).sort((a, b) => a - b);
  return answer.length === 0 ? [-1] : answer;
}

// 두 정수 사이의 합
// https://programmers.co.kr/learn/courses/30/lessons/12912
function solution(a, b) {
  let answer = 0;
  for (let i = Math.min(a, b); i <= Math.max(a, b); i++) {
    answer += i;
  }
  return answer;
}

// 문자열 내 마음대로 정렬하기
// https://programmers.co.kr/learn/courses/30/lessons/12915
// localeComapre도 가능. sort와 boolean연산 기억.
function solution(strings, n) {
  return strings.sort((a, b) =>
    a[n] === b[n] ? (a > b) - (a < b) : (a[n] > b[n]) - (a[n] < b[n])
  );
  // return strings.sort((a, b) =>
  //   a[n] === b[n] ? a.localeCompare(b) : a[n].localeCompare(b[n])
  // );
}

// 폰켓몬
// https://programmers.co.kr/learn/courses/30/lessons/1845
function solution(nums) {
  const len = [...new Set(nums)].length;
  return len > nums.length / 2 ? nums.length / 2 : len;
}

// 문자열 내 p와 y의 개수
// https://programmers.co.kr/learn/courses/30/lessons/12916
function solution(s) {
  return s.replace(/p/gi, '').length == s.replace(/y/gi, '').length;
  // return s.match(/p/ig).length===s.match(/y/ig).length;
  // s=s.toUpperCase();
  // let pNum=0;
  // let yNum=0;
  // for(let i=0;i<s.length;i++){
  //     if(s[i]==='P') pNum++;
  //     else if(s[i]==='Y') yNum++;
  // }
  // return pNum===yNum;
}

// 문자열 내림차순으로 정렬하기
// https://programmers.co.kr/learn/courses/30/lessons/12917
function solution(s) {
  return s.split('').sort().reverse().join('');
  // return s
  //   .split('')
  //   .sort((a, b) => (b > a) - (a > b))
  //   .join('');
}

// 문자열 다루기 기본
// https://programmers.co.kr/learn/courses/30/lessons/12918
// isNaN 함수 사용했을 때 테케 실패. 왜지??
function solution(s) {
  return [4, 6].includes(s.length) && parseInt(s) == s;
  // return [4,6].includes(s.length) && !Number.isNaN(Number(s));
}

// 서울에서 김서방 찾기
// https://programmers.co.kr/learn/courses/30/lessons/12919
function solution(seoul) {
  return '김서방은 ' + seoul.indexOf('Kim') + '에 있다';
}

// 소수찾기
// https://programmers.co.kr/learn/courses/30/lessons/12921
// 이거는 1단계라도 생각해볼만한 문제
function solution(n) {
  const arr = Array(n + 1).fill(1);
  (arr[0] = 0), (arr[1] = 0);
  for (let i = 2; i <= n; i++) {
    if (arr[i] !== 0) {
      for (let j = i * 2; j <= n; j += i) {
        arr[j] = 0;
      }
    }
  }
  return arr.reduce((a, b) => a + b);
}

// 수박수박수박수박수박수?
// https://programmers.co.kr/learn/courses/30/lessons/12922
function solution(n) {
  return '수박'.repeat(Math.floor(n / 2)) + (n % 2 === 1 ? '수' : '');
}

// 문자열을 정수로 바꾸기
// https://programmers.co.kr/learn/courses/30/lessons/12925
function solution(s) {
  return +s;
}

// 시저 암호
// https://programmers.co.kr/learn/courses/30/lessons/12926
// 아스키 코드 문제. 조금 생각을 해야한다.
function solution(s, n) {
  let answer = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') answer += ' ';
    else {
      if (s.charCodeAt(i) >= 97) {
        answer += String.fromCharCode(((s.charCodeAt(i) + n - 97) % 26) + 97);
      } else {
        answer += String.fromCharCode(((s.charCodeAt(i) + n - 65) % 26) + 65);
      }
    }
  }
  return answer;
}

// 내적
// https://programmers.co.kr/learn/courses/30/lessons/70128
function solution(a, b) {
  return a.reduce((acc, cur, idx) => acc + cur * b[idx], 0);
}

// 약수의 합
// https://programmers.co.kr/learn/courses/30/lessons/12928
// Array().fill().map().reduce는 자주 사용할 수 있는 패턴이다.
function solution(n) {
  return Array(n)
    .fill()
    .map((v, i) => i + 1)
    .reduce((acc, cur) => {
      if (n % cur === 0) return acc + cur;
      else return acc;
    }, 0);
}

// 이상한 문자 만들기
// https://programmers.co.kr/learn/courses/30/lessons/12930
// 문제는 쉬운데 split, map, join을 많이 사용하지 않았다면 이 방식으로 코드를 짜기 힘들다.
function solution(s) {
  return s
    .split(' ')
    .map((v) =>
      v
        .split('')
        .map((v, i) => (i % 2 === 0 ? v.toUpperCase() : v.toLowerCase()))
        .join('')
    )
    .join(' ');
}

// 자릿수 더하기
// https://programmers.co.kr/learn/courses/30/lessons/12931
function solution(n) {
  return String(n)
    .split('')
    .map((v) => v * 1)
    .reduce((acc, cur) => acc + cur, 0);
}

// 자연수 뒤집어 배열로 만들기
// https://programmers.co.kr/learn/courses/30/lessons/12932
function solution(n) {
  return String(n)
    .split('')
    .map((v) => +v)
    .reverse();
}

// 정수 내림차순으로 정렬하기
// https://programmers.co.kr/learn/courses/30/lessons/12933
function solution(n) {
  return +String(n)
    .split('')
    .map((v) => +v)
    .sort((a, b) => b - a)
    .join('');
}

// 정수 제곱근 판별
// https://programmers.co.kr/learn/courses/30/lessons/12934
// sqrt나 isInteger는 자주 쓰는 메서드가 아니지만 구글링 하면 쉽게 알 수 있다.
function solution(n) {
  const sqrt = Math.sqrt(n);
  return Number.isInteger(sqrt) ? (sqrt + 1) ** 2 : -1;
}

// 제일 작은 수 제거하기
// https://programmers.co.kr/learn/courses/30/lessons/12935
function solution(arr) {
  if (arr.length === 1) return [-1];
  const min = Math.min(...arr);
  return arr.filter((v) => v !== min);
}

// 짝수와 홀수
// https://programmers.co.kr/learn/courses/30/lessons/12937
function solution(num) {
  return num % 2 === 0 ? 'Even' : 'Odd';
}

// 최대공약수와 최소공배수
// https://programmers.co.kr/learn/courses/30/lessons/12940
// 유클리드 알고리즘을 알아야 한다. 대수학에서 나오는건데... 모르면 구글링
// 최소공배수=최대공약수*a*b

function solution(n, m) {
  const gcd = GCD(n, m);
  return [gcd, (n * m) / gcd];
}

function GCD(a, b) {
  return b ? GCD(b, a % b) : a;
}

// 콜라즈 추측
// https://programmers.co.kr/learn/courses/30/lessons/12943
function solution(num) {
  let count = 0;
  while (num !== 1) {
    count++;
    if (num % 2 === 0) num /= 2;
    else num = num * 3 + 1;
    if (count === 500) return -1;
  }
  return count;
}

// 평균 구하기
// https://programmers.co.kr/learn/courses/30/lessons/12944
function solution(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
}

// 하샤드 수
// https://programmers.co.kr/learn/courses/30/lessons/12947
function solution(x) {
  return Number.isInteger(
    x /
      String(x)
        .split('')
        .reduce((acc, cur) => acc + cur * 1, 0)
  );
}

// 핸드폰 번호 가리기
// https://programmers.co.kr/learn/courses/30/lessons/12948
function solution(phone_number) {
  return '*'.repeat(phone_number.length - 4) + phone_number.slice(-4);
}

// 행렬의 덧셈
// https://programmers.co.kr/learn/courses/30/lessons/12950
function solution(arr1, arr2) {
  return arr1.map((v1, i) => v1.map((v2, j) => v2 + arr2[i][j]));
}

// x만큼 간격이 있는 n개의 숫자
// https://programmers.co.kr/learn/courses/30/lessons/12954
function solution(x, n) {
  return Array(n)
    .fill()
    .map((v, i) => x * (i + 1));
}

// 직사각형 별찍기
// https://programmers.co.kr/learn/courses/30/lessons/12969
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  const n = data.split(' ');
  const a = Number(n[0]),
    b = Number(n[1]);
  const star = '*'.repeat(a);
  console.log(
    Array(b)
      .fill()
      .map(() => star)
      .join('\n')
  );
});
