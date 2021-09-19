/**
 * @description: 队列
 * @author: cnn
 * @createTime: 2021/9/19 15:59
 **/
class Queue {
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
	// 添加元素
	enqueue(element) {
		this.items[this.count] = element;
		this.count++;
	}
	// 移除元素
	dequeue() {
		if (this.isEmpty()) {
			return undefined;
		}
		const result = this.items[this.lowestCount];
		delete this.items[this.lowestCount];
		this.lowestCount++;
		// 为什么 count 不--，因为最后一个的键并不会改变，所以必须存起来。
		return result;
	}
	// 获取第一个元素
	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.lowestCount];
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
module.exports = Queue;