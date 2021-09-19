/**
 * @description: 使用双端队列
 * @author: cnn
 * @createTime: 2021/9/19 16:39
 **/
const Deque = require('./Deque');

const deque = new Deque();
console.log(deque.isEmpty()); // true
deque.addBack('John');
deque.addBack('Jack');
console.log(deque.toString()); // John,Jack
deque.addBack('Camila');
console.log(deque.toString()); // John,Jack,Camila
console.log(deque.size()); // 3
console.log(deque.isEmpty()); // false
deque.removeFront();
console.log(deque.toString()); // Jack,Camila
deque.removeBack();
console.log(deque.toString()); // Jack
deque.addFront('John');
console.log(deque.toString()); // John,Jack