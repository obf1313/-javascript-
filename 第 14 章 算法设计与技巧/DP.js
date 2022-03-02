/**
 * @description: 算法设计与技巧（动态规划）
 * @author: cnn
 * @createTime: 2022/2/25 10:54
 **/
const { defaultCompare, Compare} = require('../utils');
const { quickSort } = require('../第13章 排序和搜索算法/sort');

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
// console.log('binarySearch', binarySearch(arr, 5));

/**
 * 最少硬币找零问题
 * @param coins 问题中的面额，对美国硬币系统而言，它就是 [1, 5, 10, 25]
 * @param amount 需要计算的值
**/
function minCoinChange(coins, amount) {
	// 为了更加高效且不重复计算值
	const cache = [];
	// 递归函数，
	const makeChange = (value) => {
		if (Number(value) < 0) {
			return [];
		}
		console.log('cache', cache);
		// 若已缓存，则直接返回结果
		if (cache[value]) {
			return cache[value];
		}
		let min = [];
		// 最少硬币数
		let newMin;
		let newAmount;
		for (let i = 0; i < coins.length; i++) {
			const coin = coins[i];
			newAmount = value - coin;
			// =0 为什么还要 makeChange。
			if (newAmount >= 0) {
				newMin = makeChange(newAmount);
			}
			// newAmount 是否有效，newMin 是否是最优解，与此同时 newMin 和 newAmount 是否是合理的值
			// 若以上判断都成立，则意味着有一个比之前更优的答案。
			if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
				min = [coin].concat(newMin);
			}
		}
		return (cache[value] = min);
	}
	return makeChange(amount);
}
// console.log(minCoinChange([1, 5, 10, 25], 16));
/**
 * 贪心算法，但是只能找到近似最优解，并不一定是最优解。
**/
function minCoinChange(coins, amount) {
	let current = amount;
	let num = 0;
	for (let i = coins.length - 1; i >= 0; i--) {
		num = Math.floor(current / coins[i]) + num;
		current = current - Math.floor(current / coins[i]) * coins[i];
		if (current === 0) {
			break;
		}
	}
	return num;
}
/**
 * 背包问题
 * @param capacity 背包负重
 * @param weights 物品重量数组
 * @param values 物品价值数组
 * @param n 物品数量
**/
function knapSack(capacity, weights, values, n) {
	const ks = [];
	for (let i = 0; i <= n; i++) {
		ks[i] = [];
	}
	for (let i = 0; i <= n; i++) {
		for (let w = 0; w <= capacity; w++) {
			if (i === 0 || w === 0) {
				ks[i][w] = 0;
			} else if (weights[i - 1] <= w) {
				const a = values[i - 1] + ks[i - 1][w - weights[i - 1]];
				const b = ks[i - 1][w];
				ks[i][w] = a > b ? a : b;
			} else {
				ks[i][w] = ks[i - 1][w];
			}
		}
	}
	findValues(n, capacity, ks, weights, values);
	return ks[n][capacity];
}
function findValues(n, capacity, ks, weights, values) {
	let i = n;
	let k = capacity;
	console.log('构成解的物品：');
	while (i > 0 && k > 0) {
		if (ks[i][k] !== ks[i - 1][k]) {
			console.log(`物品 ${i} 可以是解的一部分 w, v：${weights[i - 1]},${values[i - 1]}`);
			i--;
			if (i > 0) {
				k -= ks[i - 1][k];
			}
		} else {
			i--;
		}
	}
}
// console.log(knapSack(5, [2, 3, 4], [3, 4, 5], 3));

/**
 * 最长公共子序列
 * @param wordX 字符串1
 * @param wordY 字符串2
**/
function lcs(wordX, wordY) {
	const m = wordX.length;
	const n = wordY.length;
	const l = [];
	const solution = [];
	for (let i = 0; i <= m; i++) {
		l[i] = [];
		solution[i] = [];
		for (let j = 0; j <= n; j++) {
			l[i][j] = 0;
			solution[i][j] = '0';
		}
	}
	for (let i = 0; i <= m; i++) {
		for (let j = 0; j <= n; j++) {
			if (i === 0 || j === 0) {
				l[i][j] = 0;
			} else if (wordX[i - 1] === wordY[j - 1]) {
				l[i][j] = l[i - 1][j - 1] + 1;
				solution[i][j] = 'diagonal';
			} else {
				const a = l[i - 1][j];
				const b = l[i][j - 1];
				l[i][j] = a > b ? a : b;
				solution[i][j] = (l[i][j] === l[i-1][j]) ? 'top' : 'left';
			}
		}
	}
	printSolution(solution, wordX, m, n);
	return l[m][n];
}
function printSolution(solution, wordX, m, n) {
	let a = m;
	let b = n;
	let x = solution[a][b];
	let answer = '';
	while (x !== '0') {
		if (solution[a][b] === 'diagonal') {
			answer = wordX[a - 1] + answer;
			a--;
			b--;
		} else if (solution[a][b] === 'left') {
			b--;
		} else if (solution[a][b] === 'top') {
			a--;
		}
		x = solution[a][b];
	}
	console.log('lcs:' + answer);
}
console.log(lcs('acbaed', 'abcadf'));
