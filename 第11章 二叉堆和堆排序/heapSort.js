/**
 * @description: 堆排序算法
 * @author: cnn
 * @createTime: 2022/2/16 14:19
 **/
const { swap, Compare, defaultCompare} = require('../utils');
const MaxHeap = require('./MaxHeap');

// 堆排序算法
function heapSort(array, compareFn = defaultCompare) {
	let heapSize = array.length;
	// 用数组创建一个最大堆用作源数据。
	const test = buildMaxHeap(array);
	// 主要是此处
	while (heapSize > 1) {
		// 替换最大值至最后一个堆，将堆的大小减一，数组长度减一，使其不进入堆重构
		heapSize = heapSize - 1;
		swap(test, 0, heapSize);
		heapify(test, 0, heapSize, compareFn);
	}
	return test;
}
// [5, 3, 2, 7, 9]
// 构建最大堆
function buildMaxHeap(array) {
	const heap = new MaxHeap();
	for (let i = 0; i < array.length; i++) {
		heap.insert(array[i]);
	}
	return heap.heap;
}
// 堆化
function heapify(array, index, heapSize, compareFn) {
	let element = index;
	const left = 2 * index + 1;
	const right = 2 * index + 2;
	// 如果当前值小于左边节点
	if (left < heapSize && compareFn(array[element], array[left]) === Compare.LESS_THAN) {
		element = left;
	}
	// 此处因为 element 的值已经改变。
	if (right < heapSize && compareFn(array[element], array[right]) === Compare.LESS_THAN) {
		element = right;
	}
	if (index !== element) {
		swap(array, index, element);
		heapify(element);
	}
}
console.log('排序前：', [5, 3, 2, 7, 9]);
console.log('排序后：', heapSort([5, 3, 2, 7, 9]));
