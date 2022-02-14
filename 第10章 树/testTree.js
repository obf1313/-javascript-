/**
 * @description: 描述
 * @author: cnn
 * @createTime: 2022/2/14 13:15
 **/
const BinarySearchTree = require('./BinarySearchTree');

const tree = new BinarySearchTree();
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
// 中序遍历
const printNode = (value) => console.log(value);
// tree.inOrderTraverse(printNode);
// 中序遍历
// tree.preOrderTraverse(printNode);
// 最小值，最大值
// console.log(tree.min());
// console.log(tree.max());
// 查找值
// console.log(tree.search(1) ? 'key 1 found.' : 'key 1 not found');
// console.log(tree.search(8) ? 'key 8 found.' : 'key 8 not found');
// 移除值
tree.remove(15);
tree.inOrderTraverse(printNode);
