/**
 * @description: 测试链表
 * @author: cnn
 * @createTime: 2021/9/20 14:35
 **/
const LinkedList = require('./LinkedList');

const list = new LinkedList();
list.push(15);
list.push(10);

list.removeAt(1);

console.log('list', list);
