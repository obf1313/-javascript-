/**
 * @description: 循环列表
 * @author: cnn
 * @createTime: 2021/9/20 16:10
 **/
const LinkedList = require('./LinkedList');
const { defaultEquals } = require('./utils');
const { Node } = require('./models/linked-list-models');

class CircularLinkedList extends LinkedList {
	constructor(equalsFn = defaultEquals) {
		super(equalsFn);
	}
	// 插入元素
	insert(element, index) {
		if (index >= 0 && index <= this.count) {
			const node = new Node();
			let current = this.head;
			if (index === 0) {
				if (this.head == null) {
					this.head = node;
					node.next = this.head;
				} else {
					node.next = current;
					current = this.getElementAt(this.size());
					// 更新最后一个元素
					this.head = node;
					current.next = this.head;
				}
			} else {
				const previous = this.getElementAt(index - 1);
				node.next = previous.next;
				previous.next = node;
			}
			this.count++;
			return true;
		}
		return false;
	}
	// 从任意位置移除元素
	removeAt(index) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				if (this.size() === 1) {
					this.head = undefined;
				} else {
					const removed = this.head;
					current = this.getElementAt(this.size());
					this.head = this.head.next;
					current.next = this.head;
					current = removed;
				}
			} else {
				const previous = this.getElementAt(index - 1);
				current = previous.next;
				previous.next = current.next;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
}