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
	BIGGER_THAN: 1
};
function defaultCompare(a, b) {
	if (a === b) {
		return 0;
	}
	return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
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
module.exports = { defaultToString, djb2HashCode, defaultEquals, defaultCompare, Compare };
