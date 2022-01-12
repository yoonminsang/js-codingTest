function swap(arr, idx1, idx2) {
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

// 버블 정렬 O(n^2)
// 가장 간단한 정렬 알고리즘. 인접한 두 개의 값을 비교하며 정렬
function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[j + 1]) swap(arr, i, j);
    }
  }
  return arr;
}
console.log(bubbleSort([6, 1, 2, 3, 4, 5])); // [1,2,3,4,5,6]

// 선택 정렬 O(n^2)
// 가장 작은 항목을 찾아서 해당 항목을 배열의 현 위치에 삽입하는 방식으로 동작하는 정렬
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) min = j;
    }
    if (i !== min) swap(arr, i, min);
  }
  return arr;
}
console.log(selectionSort([6, 1, 23, 4, 2, 3])); // [1,2,3,4,6,23]

// 삽입 정렬 O(n^2)
// 배열을 순차적으로 검색하면서 정렬되지 않은 항목들을 배열의 왼쪽의 정렬된 부분으로 이동시키며 정렬
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = temp;
  }
  return arr;
}
console.log(insertionSort([6, 1, 23, 4, 2, 3])); // [1,2,3,4,6,23]

// 병합 정렬 O(nlog(2)n)
// 분할 정복이라는 알고리즘에 근거하여 만들어진 정렬
/*
  분할 : 해결이 용이한 단계까지 문제를 분할
  정복 : 해결이 용이한 수준까지 분할된 문제를 해결
  결합 : 분할해서 해결한 결과를 결합하여 마무리한다.
*/
function merge(leftArr, rightArr) {
  let result = [],
    leftIdx = 0,
    rightIdx = 0;
  while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
    if (leftArr[leftIdx] < rightArr[rightIdx]) result.push(leftArr[leftIdx++]);
    else result.push(rightArr[rightIdx++]);
  }
  return result.concat(leftArr.slice(leftIdx), rightArr.slice(rightIdx));
}
function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2),
    leftArr = arr.slice(0, mid),
    rightArr = arr.slice(mid);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}
console.log(mergeSort([6, 1, 23, 4, 2, 3])); // [1,2,3,4,6,23]

// 빠른 정렬 O(nlog(2)n)
// 기준점을 획득한 다음 해당 기준점을 기준으로 배열을 나눈다.
/*
  1. 배열의 중간 지점에 위치한 원소(피봇)을 선택
  2. 2개의 포인터를 생성. 피봇보다 더 큰 원소가 나올 때까지 좌측 포인터를 움직이고,
    피봇보다 더 작은 원소가 나올 때까지 우측 포인터를 움직인 다음, 두 포인터에 해당하는 원소를 서로 교환한다.
    이 과정을 좌측 포인터가 우측 포인터보다 더 커질 때까지 반복
    이로써 피봇보다 작은 원소는 좌측에, 큰 원소는 우측에 나열
    이걸 파티션이라 한다.
  3. 피봇을 중심으로 나뉜 두 서브배열에 대해 정렬이 끝날 때까지 위 과정을 재귀적으로 반복
*/
function quickSort(arr) {
  return quickSortHelper(arr, 0, arr.length - 1);
}
function quickSortHelper(arr, left, right) {
  if (arr.length > 1) {
    const index = partition(arr, left, right);
    if (left < index - 1) quickSortHelper(arr, left, index - 1);
    if (index < right) quickSortHelper(arr, index, right);
  }
  return arr;
}
function partition(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)];
  while (left <= right) {
    while (pivot > arr[left]) {
      left++;
    }
    while (pivot < arr[right]) {
      right--;
    }
    if (left <= right) {
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  }
  return left;
}
console.log(quickSort([6, 1, 23, 4, 2, 3])); // [1, 2, 3, 4, 6, 23]

// 계수 정렬 O(k+n)
// 계수 정렬은 숫자에 대해서만 동작, 특정 범위도 주어져야 한다. 각 항목의 등장 횟수를 센다.
function countSort(arr) {
  let hash = {};
  arr.forEach((v) => {
    if (hash[v]) hash[v]++;
    else hash[v] = 1;
  });
  const result = [];
  for (let key in hash) {
    result.push(Array(hash[key]).fill(Math.floor(key)));
  }
  return result.flat();
}
console.log(
  countSort([6, 1, 23, 2, 3, 2, 1, 2, 2, 3, 3, 1, 123, 123, 4, 2, 3])
);
// [1,1,1,2,2,2,2,2,3,3,3,3,4,6,23,123,123]

// 몇 개 더 있기는 해. 일단은 기본만
