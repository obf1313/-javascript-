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
/**
 * 快速排序
 * 双指针，中间值，递归
**/
function quickSort(array, compareFn = defaultCompare) {
	return quick(array, 0, array.length - 1, compareFn);
}
// 实现递归
function quick(array, left, right, compareFn) {
	// 该变量能帮助我们将子数组分离为较小值数组和较大值数组。
	let index;
	if (array.length > 1) {
		index = partition(array, left, right, compareFn);
		if (left < index - 1) {
			quick(array, left, index - 1, compareFn);
		}
		if (index > right) {
			quick(array, index, right, compareFn);
		}
	}
	return array;
}
// 实现排序
function partition(array, left, right, compareFn) {
	const pivot = array[Math.floor((right + left) / 2)];
	let i = left;
	let j = right;
	while (i <= j) {
		while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
			i++;
		}
		while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
			j--;
		}
		if (i <= j) {
			swap(array, i, j);
			i++;
			j--;
		}
	}
	return i;
}
/**
 * 计数排序
 * 计数排序使用一个用来存储每个元素在原始数组中出现次数的临时数组。
 * 在所有元素计数完成后，临时数组已排好序并可迭代以构建排序后的结果数组。
**/
function countingSort(array) {
	if (array.length < 2) {
		return array;
	}
	const maxValue = findMaxValue(array);
	const counts = new Array(maxValue + 1);
	array.forEach(element => {
		// 如果该数不存在，则设为 0
		if (!counts[element]) {
			counts[element] = 0;
		}
		counts[element]++;
	});
	let sortedIndex = 0;
	counts.forEach((count, i) => {
		while (count > 0) {
			array[sortedIndex++] = i;
			count--;
		}
	});
	return array;
}
function findMaxValue(array) {
	let max = array[0];
	for (let i = 0; i < array.length; i++) {
		if (array[i] > max) {
			max = array[i];
		}
	}
	return max;
}
/**
 * 桶排序
 * 将元素分为不同的桶（较小的数组），再使用一个简单的排序算法，例如插入排序，来对每个桶进行排序。
 * 然后，再将所有的桶合并为结果数组。
 * @param array 待排序数组
 * @param bucketSize 指定桶数量，元素稀疏时，使用更多的桶更好，元素密集时，使用较少桶较好。
**/
function bucketSort(array, bucketSize = 5) {
	if (array.length < 2) {
		return array;
	}
	// 创建桶并将元素分布到不同的桶中
	const buckets = createBuckets(array, bucketSize);
	// 对每个桶执行插入排序算法和将所有桶合并为排序后的结果数组
	return sortBuckets(buckets);
}
// 创建桶
function createBuckets(array, bucketSize) {
	let minValue = array[0];
	let maxValue = array[0];
	for (let i = 0; i < array.length; i++) {
		if (array[i] < minValue) {
			minValue = array[i];
		} else if (array[i] > maxValue) {
			maxValue = array[i];
		}
	}
	// 计算每个桶内需要分布的元素个数 todo 这里感觉书上讲的很矛盾
	const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
	const buckets = [];
	for (let i = 0; i < bucketCount; i++) {
		buckets[i] = [];
	}
	for (let i = 0; i < array.length; i++) {
		const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
		buckets[bucketIndex].push(array[i]);
	}
	return buckets;
}
// 排序
function sortBuckets(buckets) {
	const sortedArray = [];
	for (let i = 0; i < buckets.length; i++) {
		if (buckets[i] != null) {
			insertionSort(buckets[i]);
			sortedArray.push(...buckets[i]);
		}
	}
	return sortedArray;
}
/**
 * 基数排序
 * 根据数字的有效位或基数将整数分布到桶中。
 * 基数是基于数组中值的记数制的。
**/
function radixSort(array, radixBase = 10) {
	if (array.length < 2) {
		return array;
	}
	const { minValue, maxValue } = findMinMax(array);
	let significantDigit = 1;
	while ((maxValue - minValue) / significantDigit >= 1) {
		array = countingSortForRadix(array, radixBase, significantDigit, minValue);
		significantDigit = significantDigit * radixBase;
	}
	return array;
}
function countingSortForRadix(array, radixBase, significantDigit, minValue) {
	let bucketsIndex;
	// 元素为该桶有几项
	const buckets = [];
	const aux = [];
	for (let i = 0; i < radixBase; i++) {
		buckets[i] = 0;
	}
	// 计算每个桶有多少项
	for (let i = 0; i < array.length; i++) {
		bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
		buckets[bucketsIndex]++;
	}
	// 此时 buckets 中为累计值
	for (let i = 1; i < radixBase; i++) {
		buckets[i] += buckets[i - 1];
	}
	// 为什么要重后往前，从前往后不是一样的吗
	for (let i = array.length - 1; i >= 0 ; i--) {
		// 该值位于哪个桶，那么他前面有多少个数就能知道了
		bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
		aux[--buckets[bucketsIndex]] = array[i];
	}
	return aux;
}
// 查找最大值，最小值
function findMinMax(array) {
	let minValue = undefined;
	let maxValue = undefined;
	if (array.length > 0) {
		minValue = array[0];
		maxValue = array[0];
		for (let i = 0; i < array.length; i++) {
			if (array[i] < minValue) {
				minValue = array[i];
			} else if (array[i] > maxValue) {
				maxValue = array[i];
			}
		}
	}
	return { minValue, maxValue };
}
module.exports = {
	bubbleSort, modifiedBubbleSort, selectionSort, insertionSort, mergeSort,
	quickSort, countingSort, bucketSort, radixSort
};
