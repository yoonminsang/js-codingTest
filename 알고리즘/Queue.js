class Queue {
  constructor(arr) {
    if (arr) this.arr = arr;
    else this.arr = [];
  }
  getBuffer() {
    return this.arr.slice();
  }
  isEmpty() {
    return this.arr.length === 0;
  }
  enqueue(value) {
    this.arr.push(value);
  }
  dequeue() {
    return this.arr.shift();
  }
  peek() {
    return this.arr[0];
  }
}
var queue1 = new Queue();
queue1.enqueue(1);
queue1.enqueue(2);
queue1.enqueue(3);
console.log(queue1); // {array: [1,2,3]}
queue1.dequeue();
console.log(queue1); // {array: [2,3]}
queue1.dequeue();
console.log(queue1); // {array: [3]}

// 접근
function queueAccessNthBottomNode(queue, n) {
  let buffer = queue.getBuffer();
  let bufferQueue = new Queue(buffer);
  while (--n !== 0) {
    bufferQueue.dequeue();
  }
  return bufferQueue.dequeue();
}
var queue2 = new Queue();
queue2.enqueue(10);
queue2.enqueue(20);
queue2.enqueue(30);
queue2.enqueue(40);
console.log(queueAccessNthBottomNode(queue2, 3));

// 검색
function queueSearch(queue, element) {
  let buffer = queue.getBuffer();
  let bufferQueue = new Queue(buffer);
  while (!bufferQueue.isEmpty()) {
    if (bufferQueue.dequeue() === element) return true;
  }
  return false;
}
var queue3 = new Queue();
queue3.enqueue(1);
queue3.enqueue(2);
queue3.enqueue(3);
console.log(queueSearch(queue3, 3)); // true
