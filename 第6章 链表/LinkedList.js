/**
 * @description: 链表
 * @author: cnn
 * @createTime: 2021/9/20 14:23
 **/
const { defaultEquals } = require('./utils');
const { Node } = require('./models/linked-list-models');

class LinkedList {
	constructor(equalsFn = defaultEquals) {
		this.count = 0;
		this.head = undefined;
		this.equalsFn = equalsFn;
	}
	// 向链表尾部添加一个新元素
	push(element) {
		const node = new Node(element);
		let current;
		if (this.head === null || this.head === undefined) {
			this.head = node;
		} else {
			current = this.head;
			while (current.next !== null && current.next !== undefined) {
				current = current.next;
			}
			// 将其 next 赋值为新元素，建立链接
			current.next = node;
		}
		this.count++;
	}
	// 根据位置找到该元素
	getElementAt(index) {
		if (index >= 0 && index <= this.count) {
			let node = this.head;
			// 这种写法用起来！
			for (let i = 0; i < index && node != null; i++) {
				node = node.next;
			}
			return node;
		}
		return undefined
	}
	// 从特定位置移除元素
	removeAt(index) {
		// 检查越界值
		if (index < this.count) {
			let current = this.head;
			// 移除第一项
			if (index === 0) {
				this.head = current.next;
			} else {
				// 使用 getElementAt 重构
				const previous = this.getElementAt(index - 1);
				current = previous.next;
				previous.next = current.next;
				// let previous;
				// for (let i = 0; i < index; i++) {
				// 	previous = current;
				// 	current = current.next;
				// }
				// // 将 previous 与 current 的下一项连接起来，跳过 current，从而移除它
				// previous.next = current.next;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
	// 在任意位置插入元素
	insert(element, index) {
		if (index >= 0 && index <= this.count) {
			const node = new Node(element);
			if (index === 0) {
				const current = this.head;
				node.next = current;
				this.head = node;
			} else {
				const previous = this.getElementAt(index - 1);
				const current = previous.next;
				node.next = current;
				previous.next = node;
			}
			this.count++;
			return true;
		}
		return false;
	}
	// 返回一个元素的位置
	indexOf(element) {
		let current = this.head;
		for (let i = 0; i < this.count && current !== null && current !== undefined; i++) {
			if (this.equalsFn(element, current.element)) {
				return i;
			}
			current = current.next;
		}
		return -1;
	}
	// 从列表中移除元素
	remove(element) {
		const index = this.indexOf(element);
		return this.removeAt(index);
	}
	// 链表长度
	size() {
		return this.count;
	}
	// 是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 获取第一个元素
	getHead() {
		return this.head;
	}
	// 转换成字符串
	toString() {
		if (this.head === null || this.head === undefined) {
			return '';
		}
		let objString = `${this.head.element}`;
		let current = this.head.next;
		for (let i = 0; i < this.count && current !== null && current !== undefined; i++) {
			objString = `${objString},${current.element}`;
			current = current.next;
		}
		return objString;
	}
}
module.exports = LinkedList;
