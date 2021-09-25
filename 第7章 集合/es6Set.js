/**
 * @description: ES6 的 Set
 * @author: cnn
 * @createTime: 2021/9/21 18:36
 **/
const set = new Set();
set.add(1);
console.log(set.values());
console.log(set.has(1));
console.log(set.size);
set.delete(1);