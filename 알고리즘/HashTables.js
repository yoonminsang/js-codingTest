// 선형 탐사
class HashTableLinear {
  constructor(size) {
    this.size = size;
    this.keys = this.initArray(size);
    this.values = this.initArray(size);
    this.limit = 0;
  }

  put(key, value) {
    if (this.limit >= this.size) throw 'hash table is full';

    let hashedIndex = this.hash(key);

    while (this.keys[hashedIndex] !== null) {
      hashedIndex = ++hashedIndex % this.size;
    }
    this.keys[hashedIndex] = key;
    this.values[hashedIndex] = value;
    this.limit++;
  }

  get(key) {
    let hashedIndex = this.hash(key);

    while (this.keys[hashedIndex] !== key) {
      hashedIndex = ++hashedIndex % this.size;
    }
    return this.values[hashedIndex];
  }

  hash(key) {
    if (!Number.isInteger(key)) throw 'must be int';
    return key % this.size;
  }

  initArray(size) {
    return Array(size).fill(null);
  }
}

// 이차 탐사
class HashTableSecondary {
  constructor(size) {
    this.size = size;
    this.keys = this.initArray(size);
    this.values = this.initArray(size);
    this.limit = 0;
  }

  put(key, value) {
    if (this.limit >= this.size) throw 'hash table is full';

    let hashedIndex = this.hash(key),
      squareIndex = 1;

    while (this.keys[hashedIndex] !== null) {
      hashedIndex += (squareIndex++) ** 2;
      hashedIndex %= this.size;
    }
    this.keys[hashedIndex] = key;
    this.values[hashedIndex] = value;
    this.limit++;
  }

  get(key) {
    let hashedIndex = this.hash(key),
      squareIndex = 1;

    while (this.keys[hashedIndex] !== key) {
      hashedIndex += (squareIndex++) ** 2;
      hashedIndex %= this.size;
    }
    return this.values[hashedIndex];
  }

  hash(key) {
    if (!Number.isInteger(key)) throw 'must be int';
    return key % this.size;
  }

  initArray(size) {
    return Array(size).fill(null);
  }
}

// const exampletable = new HashTableLinear(13);
const exampletable = new HashTableSecondary(13);
exampletable.put(7, 'hi');
exampletable.put(20, 'hello');
exampletable.put(33, 'sunny');
exampletable.put(46, 'weather');
exampletable.put(59, 'wow');
exampletable.put(72, 'fourty');
exampletable.put(85, 'happy');
exampletable.put(98, 'sad');
console.log(exampletable.get(7));
console.log(exampletable.get(20));
console.log(exampletable.get(33));
console.log(exampletable.get(46));
console.log(exampletable.get(59));
console.log(exampletable.get(72));
console.log(exampletable.get(85));
console.log(exampletable.get(98));

// 몇 개 더 있기는 해. 일단은 기본만
