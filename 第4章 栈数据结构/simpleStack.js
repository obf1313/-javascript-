/**
 * @description: 简单栈类，基于数组创建栈
 * @author: cnn
 * @createTime: 2021/9/12 17:04
 **/
class SimpleStack {
	constructor() {
		this.items = [];
	}
	// 向栈添加元素
	push(element) {
		return this.items.push(element);
	}
	// 从栈移除元素
	pop() {
		return this.items.pop();
	}
	// 查看栈顶元素，真的不需要判断长度
	peek() {
		return this.items[this.items.length - 1];
	}
	// 检查栈是否为空
	isEmpty() {
		return this.items.length === 0;
	}
	// 返回栈长度
	size() {
		return this.items.length;
	}
	// 清空栈元素
	clear() {
		this.items = [];
	}
}
module.exports = SimpleStack;