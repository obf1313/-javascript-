/**
 * @description: 栈
 * @author: cnn
 * @createTime: 2021/9/20 20:02
 **/
const DoublyLinkedList = require('./DoublyLinkedList');

class StackLinkedList {
	constructor() {
		this.items = new DoublyLinkedList();
	}
	isEmpty() {
		return this.items.isEmpty();
	}
	size() {
		return this.items.size();
	}
	push(element) {
		this.items.push(element);
	}
	pop() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items.removeAt(this.size() - 1);
	}
}