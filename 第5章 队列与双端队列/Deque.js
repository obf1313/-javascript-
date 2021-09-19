/**
 * @description: 双端队列
 * @author: cnn
 * @createTime: 2021/9/19 16:19
 **/
class Deque {
	constructor() {
		this.count = 0;
		this.lowestCount = 0;
		this.items = {};
	}
	// 获取队列 size
	size() {
		return this.count - this.lowestCount;
	}
	// 判断队列是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 队头添加元素
	addFront(element) {
		// 空队列
		if (this.isEmpty()) {
			this.addBack(element);
		}
		// 有元素已经被从双端队列移除
		else if (this.lowestCount > 0) {
			this.lowestCount--;
			this.items[this.lowestCount] = element;
		}
		// lowestCount 为 0 的情况，要空出第一个位置
		else {
			for (let i = this.count; i > 0; i--) {
				this.items[i] = this.items[i - 1];
			}
			this.count++;
			this.lowestCount = 0;
			this.items[0] = element;
		}
	}
	// 队尾添加元素
	addBack(element) {
		this.items[this.count] = element;
		this.count++;
	}
	// 移除第一个元素
	removeFront() {
		if (this.isEmpty()) {
			return undefined;
		}
		const result = this.items[this.lowestCount];
		delete this.items[this.lowestCount];
		this.lowestCount++;
		return result;
	}
	// 移除最后一个元素
	removeBack() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.count--;
		const result = this.items[this.count];
		delete this.items[this.count];
		return result;
	}
	// 获取第一个元素
	peekFront() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.lowestCount];
	}
	// 获取最后一的元素
	peekBack() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.count - 1];
	}
	// 清空队列
	clear() {
		this.items = {};
		this.count = 0;
		this.lowestCount = 0;
	}
	// 转成字符串
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		let objString = `${this.items[this.lowestCount]}`;
		for (let i = this.lowestCount + 1; i < this.count; i++) {
			objString = `${objString},${this.items[i]}`;
		}
		return objString;
	}
}
module.exports = Deque;