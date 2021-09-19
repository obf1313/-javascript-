/**
 * @description: 栈类，基于对象创建类，时间复杂度除 toString 以外都是 O(1)
 * @author: cnn
 * @createTime: 2021/9/12 17:12
 **/
class Stack {
	constructor() {
		// 记录栈的大小
		this.count = 0;
		this.items = {};
	}
	// 方法
	// 插入
	push(element) {
		this.items[this.count] = element;
		this.count++;
	}
	// 栈长度
	size() {
		return this.count;
	}
	// 验证栈是否为空
	isEmpty() {
		return this.count === 0;
	}
	// 从栈中弹出元素
	pop() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.count--;
		const result = this.items[this.count];
		delete this.items[this.count];
		return result;
	}
	// 查看栈顶的值
	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.count - 1];
	}
	// 清空栈
	clear() {
		this.items = {};
		this.count = 0;
		// 也可以遵循 LIFO 原则，挨个移除
		// while (!this.isEmpty()) {
		// 	this.pop();
		// }
	}
	// toString 方法
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		let objString = `${this.items[0]}`;
		for (let i = 1; i < this.count; i++) {
			objString = `${objString},${this.items[i]}`;
		}
		return objString;
	}
}
module.exports = Stack;