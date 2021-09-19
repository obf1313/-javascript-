/**
 * @description: 测试队列
 * @author: cnn
 * @createTime: 2021/9/19 16:14
 **/
const Queue = require('./Queue');

const queue = new Queue();
console.log(queue.isEmpty()); // true

queue.enqueue('John');
queue.enqueue('Jack');
console.log(queue.toString()); // John,Jack

queue.enqueue('Camila');
console.log(queue.toString()); // John,Jack,Camila
console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false
queue.dequeue();
queue.dequeue();
console.log(queue.toString()); // Camila