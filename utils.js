/**
 * @description: 工具方法
 * @author: cnn
 * @createTime: 2022/2/10 16:41
 **/
// 相等判断
function defaultEquals(a, b) {
	return a === b;
}
// 比较判断
const Compare = {
	LESS_THAN: -1,
	BIGGER_THAN: 1,
	EQUALS: 0
};
function defaultCompare(a, b) {
	if (a === b) {
		return 0;
	}
	return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
// 反转判断
function reverseCompare (compareFn) {
	return (a, b) => compareFn(b, a);
}
// 转为字符串
function defaultToString(item) {
	if (item === null) {
		return 'NULL';
	} else if (item === undefined) {
		return 'UNDEFINED';
	} else if (typeof item === 'string' || item instanceof String) {
		return `${item}`;
	}
	// 如果 item 是对象，则需要实现 toString 方法，否则会返回 [object object]
	return item.toString();
}
// 最受社区推崇的散列函数之一 djb2
function djb2HashCode(key) {
	const tableKey = defaultToString(key);
	let hash = 5381; // 质数
	for (let i = 0; i < tableKey.length; i++) {
		hash = (hash * 33) + tableKey.charCodeAt(i);
	}
	return hash % 1013;
}
// 交换函数
function swap(array, a, b) {
	const temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}
// 小于等于
function lesserOrEquals(a, b, compareFn) {
	const comp = compareFn(a, b);
	return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}
// 大于等于
function biggerOrEquals(a, b, compareFn) {
	const comp = compareFn(a, b);
	return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}
function defaultDiff(a, b) {
	return Number(a) - Number(b);
}
module.exports = {
	defaultToString, djb2HashCode, defaultEquals, defaultCompare,
	Compare, swap, reverseCompare, lesserOrEquals, biggerOrEquals,
	defaultDiff
};
