/**
 * @description: 排序算法
 * @author: cnn
 * @createTime: 2022/2/22 9:22
 **/
const { defaultCompare, Compare, swap} = require('../utils');

/**
 * 冒泡排序
 * 冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。
 * 元素项向上移动至正确的顺序，就好像气泡升至表面一样。
 * 复杂度：O(n²)
**/
function bubbleSort(array, compareFn = defaultCompare) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < (array.length - 1); j++) {
			if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
				swap(array, j, j + 1);
			}
		}
	}
	return array;
}
/**
 * 冒泡排序改进
 * 冒泡排序每轮会将最大的移至最后
 * 那么在下一轮的比较中，其实上一轮已经排好序的元素不需要再进行比较了
 * 故可以将内循环中的循环次数改为 array.length - 1 - i
**/
function modifiedBubbleSort(array, compareFn = defaultCompare) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < (array.length - 1 - i); j++) {
			if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
				swap(array, j, j + 1);
			}
		}
	}
	return array;
}

/**
 * 选择排序
 * 找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位
**/
function selectionSort(array, compareFn = defaultCompare) {
	let minIndex;
	for (let i = 0; i < array.length; i++) {
		minIndex = i;
		for (let j = i + 1; j < array.length; j++) {
			if (compareFn(array[i], array[j]) === Compare.BIGGER_THAN) {
				minIndex = j;
			}
		}
		if (minIndex !== i) {
			swap(array, i, minIndex);
		}
	}
	return array;
}
/**
 * 插入排序
 * 插入排序每次排一个数组项，以此方式构建最后的排序数组。
 * 假定第一项已经排序了，接着加入第二项，第二项和第一项比较，若第一项大于第二项，则交换位置。
 * 现在第一、第二项排序了，接着加入第三项，将第三项依次和第二项、第一项比较。
 * 以此类推。
**/
function insertionSort(array, compareFn = defaultCompare) {
	const { length } = array;
	let temp;
	for (let i = 0; i < length; i++) {
		let j = i;
		// 记录值，后面赋值需要使用
		let temp = array[i];
		while (j > 0 && compareFn(array[j - 1], array[j]) === Compare.BIGGER_THAN) {
			array[j] = array[j - 1];
			j--;
		}
		array[j] = temp;
	}
	return array;
}
/**
 * 归并排序
 * 归并排序是一种分而治之的算法。
 * 其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
**/
// 负责将一个大数组分为多个小数组并调用用来排序的辅助函数
function mergeSort(array, compareFn = defaultCompare) {
	if (array.length > 1) {
		const middle = Math.floor(array.length / 2);
		const left = mergeSort(array.slice(0, middle), compareFn);
		const right = mergeSort(array.slice(middle), compareFn);
		// 调用比较
		array = merge(left, right, compareFn);
	}
	return array;
}
// 负责合并和排序小数组来产生大数组，直到回到原始数组并已排序完成。
function merge(left, right, compareFn) {
	let i = 0;
	let j = 0;
	const result = [];
	while (i < left.length && j < right.length) {
		result.push(
			compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]
		);
	}
	// 将最后剩余的值合并
	return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
module.exports = { bubbleSort, modifiedBubbleSort, selectionSort, insertionSort, mergeSort };
