class Stack {
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
  push(value) {
    this.arr.push(value);
  }
  pop() {
    return this.arr.pop();
  }
  peek() {
    return this.arr[this.arr.length - 1];
  }
}

var stack1 = new Stack();
console.log(stack1); // Stack { arr: [] }
console.log(stack1.isEmpty()); // true
stack1.push(10);
console.log(stack1.peek()); // 10
stack1.push(5);
console.log(stack1.peek()); // 5
console.log(stack1.pop()); // 5
console.log(stack1.peek()); // 10

// 접근
function stackAccessNthTopNode(stack, n) {
  let buffer = stack.getBuffer();
  let bufferStack = new Stack(buffer);
  while (--n !== 0) {
    bufferStack.pop();
  }
  return bufferStack.pop();
}
var stack2 = new Stack();
stack2.push(10);
stack2.push(20);
stack2.push(30);
stack2.push(40);
console.log(stackAccessNthTopNode(stack2, 2)); // 30

// 검색
function stackSearch(stack, element) {
  let buffer = stack.getBuffer();
  let bufferStack = new Stack(buffer);
  while (!bufferStack.isEmpty()) {
    if (bufferStack.pop() === element) return true;
  }
  return false;
}
var stack3 = new Stack();
stack3.push(1);
stack3.push(2);
stack3.push(3);
console.log(stackSearch(stack3, 3)); // true
