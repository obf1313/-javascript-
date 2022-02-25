/**
 * @description: 算法设计与技巧
 * @author: cnn
 * @createTime: 2022/2/25 10:54
 **/
const { defaultCompare, Compare} = require('../utils');
const {quickSort} = require("../第13章 排序和搜索算法/sort");

const DOES_NOT_EXIST = -1;

/**
 * 分而治之 - 二分搜索
**/
function binarySearchRecursive(array, value, low, high, compareFn = defaultCompare) {
	if (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const element = array[mid];
		if (compareFn(element, value) === Compare.LESS_THAN) {
			return binarySearchRecursive(array, value, mid + 1, high, compareFn);
		} else if (compareFn(element, value) === Compare.BIGGER_THAN) {
			return binarySearchRecursive(array, value, low, mid - 1, compareFn);
		} else {
			return mid;
		}
	}
	return DOES_NOT_EXIST;
}
function binarySearch(array, value, compareFn = defaultCompare) {
	quickSort(array);
	const low = 0;
	const high = array.length - 1;
	return binarySearchRecursive(array, value, low, high, compareFn);
}
const arr = [1, 5, 8, 2, 3, 9];
console.log('binarySearch', binarySearch(arr, 5));
