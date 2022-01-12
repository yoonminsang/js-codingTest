// 선형 검색
// 앞에서 부터 차례대로 검색
function linsearySearch(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) return i;
  }
  return false;
}
console.log(linsearySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 6)); // 5
console.log(linsearySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 10)); // false

// 이진 검색
// 중간 인덱스 값을 확인해 절반씩 범위를 줄여가며 검색
function binarySearch(arr, n) {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (arr[mid] === n) return mid;
    else if (arr[mid] < n) l = mid + 1;
    else r = mid - 1;
  }
  return false;
}
console.log(binarySearch([1, 2, 3, 4], 4)); // 3
console.log(binarySearch([1, 2, 3, 4], 5)); // false
