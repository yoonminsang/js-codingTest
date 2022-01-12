//다른 자료 구조와 달리 힙은 자식에 대한 포인터를 갖는 대신에 배열을 사용해 자료를 저장한다.
//배열에서 힙 노드의 자식 위치(인덱스)를 쉽게 계산할 수 있다.
//힙을 사용하면 부모와 자식 간의 관계를 쉽게 정의할 수 있기 때문이다.
// 최대 힙의 경우 부모가 자식보다 크고 최소 힙의 경우 부모가 자식보다 작다.
class Heap {
  constructor() {
    this.items = [];
  }
  swap(index1, index2) {
    const temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }
  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  leftChildIndex(index) {
    return index * 2 + 1;
  }
  rightChildIndex(index) {
    return index * 2 + 2;
  }
  parent(index) {
    return this.items[this.parentIndex(index)];
  }
  leftChild(index) {
    return this.items[this.leftChildIndex(index)];
  }
  rightChild(index) {
    return this.items[this.rightChildIndex(index)];
  }
  peek(item) {
    return this.items[0];
  }
  size() {
    return this.items.length;
  }
}

// 최소힙
class MinHeap extends Heap {
  constructor() {
    super();
  }
  add(item) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }
  // 루트(최소) 제거
  poll() {
    let item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }
  bubbleDown() {
    let index = 0;
    while (this.leftChild(index) && this.leftChild(index) < this.items[index]) {
      let smallerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) &&
        this.rightChild(index) < this.items[smallerIndex]
      ) {
        // if right is smaller, right swaps
        smallerIndex = this.rightChildIndex(index);
      }
      this.swap(smallerIndex, index);
      index = smallerIndex;
    }
  }
  bubbleUp() {
    let index = this.items.length - 1;
    while (this.parent(index) && this.parent(index) > this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }
}
var mh1 = new MinHeap();
mh1.add(1);
mh1.add(10);
mh1.add(5);
mh1.add(100);
mh1.add(8);
console.log(mh1.poll()); // 1
console.log(mh1.poll()); // 5
console.log(mh1.poll()); // 8
console.log(mh1.poll()); // 10
console.log(mh1.poll()); // 100

// 최대힙
class MaxHeap extends Heap {
  constructor() {
    super();
  }
  add(item) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }
  poll() {
    let item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }
  bubbleDown() {
    let index = 0;
    while (this.leftChild(index) && this.leftChild(index) > this.items[index]) {
      let biggerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) &&
        this.rightChild(index) > this.items[biggerIndex]
      ) {
        // if right is smaller, right swaps
        biggerIndex = this.rightChildIndex(index);
      }
      this.swap(biggerIndex, index);
      index = biggerIndex;
    }
  }
  bubbleUp() {
    let index = this.items.length - 1;
    while (this.parent(index) && this.parent(index) < this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }
}
var mh2 = new MaxHeap();
mh2.add(1);
mh2.add(10);
mh2.add(5);
mh2.add(100);
mh2.add(8);

console.log(mh2.poll()); // 100
console.log(mh2.poll()); // 10
console.log(mh2.poll()); // 8
console.log(mh2.poll()); // 5
console.log(mh2.poll()); // 1

// 힙 정렬 O(log(2)n)
// 오름차순 정렬(최소힙)
var minHeapExample = new MinHeap();
minHeapExample.add(12);
minHeapExample.add(2);
minHeapExample.add(23);
minHeapExample.add(4);
minHeapExample.add(13);
console.log(minHeapExample.items, minHeapExample.size()); // [2, 4, 23, 12, 13]
var minHeapSort = new MinHeap();
while (minHeapExample.size() > 0) {
  minHeapSort.add(minHeapExample.poll());
}
console.log(minHeapSort);

// 내림차순 정렬(최대힙)
var maxHeapExample = new MaxHeap();
maxHeapExample.add(12);
maxHeapExample.add(2);
maxHeapExample.add(23);
maxHeapExample.add(4);
maxHeapExample.add(13);
console.log(maxHeapExample.items, maxHeapExample.size()); // [23, 13, 12, 2, 4]
var maxHeapSort = new MaxHeap();
while (maxHeapExample.size() > 0) {
  maxHeapSort.add(maxHeapExample.poll());
}
console.log(maxHeapSort);
