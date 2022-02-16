/**
 * @description: 最小堆
 * @author: cnn
 * @createTime: 2022/2/16 11:23
 **/
const { defaultCompare, Compare, swap } = require('../utils');

class MinHeap {
	constructor(compareFn = defaultCompare) {
		this.compareFn = compareFn;
		this.heap = [];
	}
	// 获取左侧节点位置
	getLeftIndex(index) {
		return 2 * index + 1;
	}
	// 获取右侧节点位置
	getRightIndex(index) {
		return 2 * index + 2;
	}
	// 获取父节点位置
	getParentIndex(index) {
		if (index === 0) {
			return undefined;
		}
		return Math.floor((index - 1) / 2);
	}
	// 插入值
	insert(value) {
		if (value != null) {
			this.heap.push(value);
			// 上移节点，直到插入值大于父节点
			this.siftUp(this.heap.length - 1);
			return true;
		}
		return false;
	}
	// 上移
	siftUp(index) {
		let parent = this.getParentIndex(index);
		while (index > 0 && (this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN)) {
			// 如果当前插入值小于父节点值，则交换
			swap(this.heap, parent, index);
			index = parent;
			parent = this.getParentIndex(index);
		}
	}
	// 大小
	size() {
		return this.heap.length;
	}
	// 是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 查找最小值
	findMinimum() {
		return this.isEmpty() ? undefined : this.heap[0];
	}
	// 导出堆中的最小值
	extract() {
		if (this.isEmpty()) {
			return undefined;
		}
		if (this.size() === 1) {
			// shift: 移除数组第一项，并返回第一项
			return this.heap.shift();
		}
		const removedValue = this.heap.shift();
		// pop: 移除数组最后一项，并返回最后一项
		// 将最后一项移动至根部，执行 siftDown 函数，将交换元素直到堆的结构正常。
		this.heap.unshift(this.heap.pop());
		this.siftDown(0);
		return removedValue;
	}
	// 堆化
	siftDown(index) {
		let element = index;
		const left = this.getLeftIndex(index);
		const right = this.getRightIndex(index);
		const size = this.size();
		if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
			element = left;
		}
		// 此处因为 element 的值已经改变。
		if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
			element = right;
		}
		if (index !== element) {
			swap(this.heap, index, element);
			this.siftDown(element);
		}
	}
}

module.exports = MinHeap;
