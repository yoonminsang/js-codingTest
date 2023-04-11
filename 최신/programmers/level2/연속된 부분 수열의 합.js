// https://school.programmers.co.kr/learn/courses/30/lessons/178870
// https://www.youtube.com/watch?v=uifOTqMOVrE&ab_channel=%EC%9C%A4%EC%9C%A4

// 첫번째 시도는 n^2이라서 실패. 누적합 알고리즘이 필요하다고 느꼈음.
function solution(sequence, k) {
  const answerList = [];
  for (let startIndex = 0; startIndex < sequence.length; startIndex++) {
    let count = 0;
    for (let i = startIndex; i < sequence.length; i++) {
      count += sequence[i];
      if (count === k) {
        answerList.push([startIndex, i]);
        break;
      }
      if (count > k) break;
    }
  }
  answerList.sort((a, b) => {
    // 길이가 같은 경우
    if (a[1] - a[0] === b[1] - b[0]) {
      return a[0] - b[0];
    }
    return a[1] - a[0] - (b[1] - b[0]);
  });
  return answerList[0];
}

// 두번째 시도 실패. 누적합 알고리즘을 짜도 결국 시간 복잡도는 n^2임. 다른 방법이 필요함.
function getCumulativeSum(arr) {
  const result = [];
  let sum = 0;
  arr.forEach((v) => {
    sum += v;
    result.push(sum);
  });
  return result;
}

// 챗gpt한테 물어봄.
// 투포인터 알고리즘을 사용하라는 얘기를 함.(그 밑에 설명은 안봄)
// 투포인터면 포인터 두개를 이용하라는 얘긴데... 그래도 n^2아닌가?
// 생각해보니 투포인터와 누적합을 같이 이용하면 될것같다.
// 아니 그래도 n^2인데..

// 투포인터를 다시 생각해보니 O(n)으로 풀 수 있음. 성공!!
// 근데 힐끔힐끔 gpt 코드의 도움을 받았음. 마치 예전에 수학4번문제 풀때처럼 ㅎㅎ..
// 부분합 문제는 예전에 코테에서 헌 번 본적이 있는데 그때도 실패했던 문제였다. 이번에 풀게되서 좋았다.
function solution(sequence, k) {
  let [start, end] = [0, 0];
  let sum = sequence[start];
  let minLength = Infinity;
  let result = [];
  while (start < sequence.length && end < sequence.length) {
    if (sum < k) {
      end += 1;
      sum += sequence[end];
    } else if (sum > k) {
      sum -= sequence[start];
      start += 1;
    } else {
      const length = end - start;
      if (length < minLength) {
        minLength = length;
        result = [start, end];
      }
      sum -= sequence[start];
      start += 1;
    }
  }
  return result;
}
