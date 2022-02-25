/**
 * @description: 搜索算法
 * @author: cnn
 * @createTime: 2022/2/25 9:09
 **/
const {
	defaultEquals, Compare, defaultCompare, lesserOrEquals, biggerOrEquals,
	defaultDiff
} = require('../utils');
const { quickSort } = require('./sort');

const DOES_NOT_EXIST = -1;
/**
 * 顺序搜索
 * 它的机制是，将每一个数据结构中的元素和我们要找的元素作比较。
**/
function sequentialSearch(array, value, equalsFn = defaultEquals) {
	for (let i = 0; i < array.length; i++) {
		if (equalsFn(array[i], value)) {
			return i;
		}
	}
	return DOES_NOT_EXIST;
}
/**
 * 二分搜索
**/
function binarySearch(array, value, compareFn = defaultCompare) {
	const sortedArray = quickSort(array);
	let low = 0;
	let high = array.length - 1;
	while (lesserOrEquals(low, high, compareFn)) {
		const mid = Math.floor((high + low) / 2);
		const element = sortedArray[mid];
		if (compareFn(element, value) === Compare.LESS_THAN) {
			low = mid + 1;
		} else if (compareFn(element, value) === Compare.BIGGER_THAN) {
			high = mid - 1;
		} else {
			return mid;
		}
	}
	return DOES_NOT_EXIST;
}
/**
 * 内插搜索
**/
function interpolationSearch(array, value, compareFn = defaultCompare, equalsFn = defaultEquals, diffFn = defaultDiff) {
	const { length } = array;
	let low = 0;
	let high = length - 1;
	let position = -1;
	let delta = -1;
	while (low <= high && biggerOrEquals(value, array[low], compareFn) && lesserOrEquals(value, array[high], compareFn)) {
		delta = diffFn(value, array[low]) / diffFn(array[high], array[low]);
		position = low + Math.floor((high - low) * delta);
		if (equalsFn(array[position], value)) {
			return position;
		}
		if (compareFn(array[position], value) === Compare.LESS_THAN) {
			low = position + 1;
		} else {
			high = position - 1;
		}
	}
	return DOES_NOT_EXIST;
}
module.exports = { sequentialSearch, binarySearch, interpolationSearch };
