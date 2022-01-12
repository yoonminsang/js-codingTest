// 이진 탐색 트리
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const insertHelper = (node, newNode) => {
      if (newNode.value < node.value) {
        if (node.left === null) node.left = newNode;
        else insertHelper(node.left, newNode);
      } else {
        if (node.right === null) node.right = newNode;
        else insertHelper(node.right, newNode);
      }
    };
    const newNode = new Node(value);
    if (this.root === null) this.root = newNode;
    else insertHelper(this.root, newNode);
  }
  getRoot() {
    return this.root;
  }

  // 중위 순회 in-order traversal
  traverseInOrder() {
    const traverseInOrderHelper = (node) => {
      if (node) {
        traverseInOrderHelper(node.left);
        console.log(node.value);
        traverseInOrderHelper(node.right);
      }
    };
    traverseInOrderHelper(this.root);
  }
  // 전위 순회 pre-order traveresal
  traversePreOrder() {
    const traversePreOrderHelper = (node) => {
      if (node) {
        console.log(node.value);
        traversePreOrderHelper(node.left);
        traversePreOrderHelper(node.right);
      }
    };
    traversePreOrderHelper(this.root);
  }
  // 후위 순회 post=order traversal
  traversePostOrder() {
    const traversePostOrderHelper = (node) => {
      if (node) {
        traversePostOrderHelper(node.left);
        traversePostOrderHelper(node.right);
        console.log(node.value);
      }
    };
    traversePostOrderHelper(this.root);
  }
  min() {
    const minHelper = (node) => {
      if (node) {
        while (node && node.left) {
          node = node.left;
        }
        return node.value;
      }
    };
    return minHelper(this.root);
  }
  max() {
    const maxHelper = (node) => {
      if (node) {
        while (node && node.right) {
          node = node.right;
        }
        return node.value;
      }
    };
    return maxHelper(this.root);
  }
  // 균형 트리 : O(log(2)n)), 불균형 트리 : O(n)
  search(value) {
    const searchHelper = (node, value) => {
      if (!node) return false;
      if (value < node.value) return searchHelper(value.left, value);
      else if (value > node.value) return searchHelper(node.right, value);
      else return true;
    };
    return searchHelper(this.root, value);
  }
  remove(element) {
    const findMinNode = function (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    };
    const removeNode = function (node, element) {
      console.log(node);
      if (!node) {
        return null;
      }
      if (element < node.value) {
        node.left = removeNode(node.left, element);
        return node;
      } else if (element > node.value) {
        node.right = removeNode(node.right, element);
        return node;
      } else {
        //value가 node.value와 같다

        //3가지 특수 경우를 처리해야 한다
        //1 - 리프 노드
        //2 - 자식이 하나뿐인 노드
        //3 - 자식이 둘인 노드

        //case 1
        if (!node.left && !node.right) {
          node = null;
          return node;
        }

        //case 2
        if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        }

        //case 3
        const temp = findMinNode(node.right);
        node.value = temp.value;
        node.right = removeNode(node.right, temp.value);
        return node;
      }
    };
    this.root = removeNode(this.root, element);
  }
}

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
console.log(tree);
// tree.traverseInOrder();
// console.log('\n');
// tree.traversePreOrder();
// console.log('\n');
// tree.traversePostOrder();
console.log(tree.min());
console.log(tree.max());
console.log(tree.search(11));
console.log(tree.search(1));
// tree.traverseInOrder();
// tree.remove(10);
// tree.traverseInOrder();
console.log('********* 삭제 6 ***********');
tree.remove(6);
tree.traverseInOrder();

console.log('********* 삭제 5 ***********');
tree.remove(5);
tree.traverseInOrder();

console.log('********* 삭제 15 ***********');
tree.remove(15);
tree.traverseInOrder();

console.log('********* 가공되지 않은 자료 구조 ***********');
console.log(tree.getRoot());
