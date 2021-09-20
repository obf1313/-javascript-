/**
 * @description: 描述
 * @author: cnn
 * @createTime: 2021/9/20 14:27
 **/
class Node {
	constructor(element) {
		this.element = element;
		this.next = undefined;
	}
}
class DoublyNode extends Node {
	constructor(element, next, prev) {
		super(element, next);
		this.prev = prev; // 新增的
	}
}
module.exports = { Node, DoublyNode };