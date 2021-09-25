/**
 * @description: 测试集合
 * @author: cnn
 * @createTime: 2021/9/21 18:10
 **/
const Set = require('./Set');

const set = new Set();

set.add(1);
console.log(set.values()); // [1]
console.log(set.has(1)); // true
console.log(set.size()); // 1

set.add(2);
console.log(set.values()); // [1, 2]
console.log(set.has(2)); // true
console.log(set.size()); // 2

set.delete(1);
console.log(set.values()); // [2]

set.delete(2);
console.log(set.values()); // []

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
const unionSet = setA.union(setB);
console.log(unionSet.values());

const setC = new Set();
setC.add(1);
setC.add(2);
setC.add(3);
const setD = new Set();
setD.add(2);
setD.add(3);
setD.add(4);
const intersectionSet = setC.intersection(setD);
console.log(intersectionSet.values());
const differenceSet = setC.difference(setD);
console.log(differenceSet.values());

const setF = new Set();
setF.add(1);
setF.add(2);

console.log(setF.isSubsetOf(setC)); // true
console.log(setF.isSubsetOf(setD)); // false