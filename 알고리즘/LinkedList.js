class SingleLinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// head에 추가하는 버전
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  isEmpty() {
    this.size === 0;
  }
  insert(value) {
    if (this.head === null) {
      this.head = new SingleLinkedListNode(value);
    } else {
      const temp = this.head;
      this.head = new SingleLinkedListNode(value);
      this.head.next = temp;
    }
    this.size++;
  }
  remove(value) {
    let currentHead = this.head;
    if (currentHead.data === value) {
      this.head = currentHead.next;
      this.size--;
    } else {
      let prev = currentHead;
      while (currentHead.next) {
        if (currentHead.data === value) {
          prev.next = currentHead.next;
          // prev = currentHead;
          currentHead = currentHead.next;
          break;
        }
        prev = currentHead;
        currentHead = currentHead.next;
      }
      if (currentHead.data === value) {
        prev.next = null;
      }
      this.size--;
    }
  }
  deleteAtHead() {
    let deletedHead = null;
    if (this.head !== null) {
      deletedHead = this.head.data;
      this.head = this.head.next;
      this.size--;
    }
    return deletedHead;
  }
  getBuffer() {
    const buffer = new SinglyLinkedList();
    buffer.head = this.head;
    buffer.size = this.size;
    return buffer;
  }
}
var sll1 = new SinglyLinkedList();
sll1.insert(1); // linked list is now:  1 -> null
sll1.insert(12); // linked list is now: 12 -> 1 -> null
sll1.insert(20); // linked list is now: 20 -> 12 -> 1 -> null
sll1.remove(12); // linked list is now: 20 -> 1 -> null
var buffer = sll1.getBuffer();
sll1.remove(20); // linked list is now: 1 -> null
sll1.deleteAtHead(); // linked list is now: null
console.log(sll1);
console.log(buffer);

class DoublyLinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  insertAtHead(value) {
    if (this.head === null) {
      this.head = new SingleLinkedListNode(value);
      this.tail = this.head;
    } else {
      const temp = new DoublyLinkedListNode(value);
      temp.next = this.head;
      this.head.prev = temp;
      this.head = temp;
    }
    this.size++;
  }
  insertAtTail(value) {
    if (this.tail === null) {
      this.tail = new SingleLinkedListNode(value);
      this.head = this.tail;
    } else {
      const temp = new DoublyLinkedListNode(value);
      temp.prev = this.tail;
      this.tail.next = temp;
      this.tail = temp;
    }
  }
  deleteAtHead() {
    let deletedHead = null;
    if (this.head !== null) {
      deletedHead = this.head.data;
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
      this.size--;
    }
    return deletedHead;
  }
  deleteAtTail() {
    let deletedTail = null;
    if (this.tail !== null) {
      deletedTail = this.tail.data;
      if (this.tail === this.head) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    }
    return deletedTail;
  }
  findStartingHead(value) {
    let currentHead = this.head;
    while (currentHead) {
      if (currentHead.data === value) return true;
      currentHead = currentHead.next;
    }
    return false;
  }
  findStartingTail(value) {
    let currentTail = this.tail;
    while (currentTail) {
      if (currentTail.data === value) return true;
      currentTail = currentTail.prev;
    }
    return false;
  }
}
var dll1 = new DoublyLinkedList();
dll1.insertAtHead(10); // ddl1's structure: tail: 10  head: 10
dll1.insertAtHead(12); // ddl1's structure: tail: 10  head: 12
dll1.insertAtHead(20); // ddl1's structure: tail: 10  head: 20
dll1.insertAtTail(30); // ddl1's structure: tail: 30  head: 20
dll1.deleteAtHead();
dll1.deleteAtTail();
console.log(dll1.findStartingHead(10)); // true
console.log(dll1.findStartingHead(15)); // false
console.log(dll1.findStartingTail(12)); // true
console.log(dll1.findStartingTail(17)); // false
