/**
 * @description: 双向链表
 * @author: cnn
 * @createTime: 2021/9/20 15:15
 **/
const LinkedList = require('./LinkedList');
const { defaultEquals } = require('./utils');
const { DoublyNode } = require('./models/linked-list-models');

class DoublyLinkedList extends LinkedList {
	constructor(equalsFn = defaultEquals) {
		super(equalsFn);
		this.tail = undefined; // 最后一个元素的引用
	}
	// 重写插入方法
	insert(element, index) {
		if (index >= 0 && index <= this.count) {
			const node = new DoublyNode();
			let current = this.head;
			// 第一项
			if (index === 0) {
				if (this.head == null) {
					this.head = node;
					this.tail = node;
				} else {
					node.next = this.head;
					current.prev = node;
					this.head = node;
				}
			}
			// 最后一项
			else if (index === this.count) {
				current = this.tail;
				current.next = node;
				node.prev = current;
				this.tail = node;
			}
			else {
				const previous = this.getElementAt(index - 1);
				current = previous.next;
				node.next = current;
				previous.next = node;
				current.prev = node;
				node.prev = previous;
			}
			this.count++;
			return true
		}
		return false;
	}
	// 重写 removeAt
	removeAt(index) {
		if (index >=0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				this.head = current.next;
				// 如果只有一项，更新 tail
				if (this.count === 1) {
					this.tail = undefined;
				} else {
					this.head.prev = undefined;
				}
			}
			// 最后一项
			else if (index === this.count - 1) {
				current = this.tail;
				this.tail = current.prev;
				this.tail.next = undefined;
			}
			else {
				current = this.getElementAt(index);
				const previous = current.prev;
				// 将 previous 与 current 的下一项链接起来跳过 current
				previous.next = current.next;
				current.next.prev = previous;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
}
module.exports = DoublyLinkedList;