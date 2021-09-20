/**
 * @description: 工具方法
 * @author: cnn
 * @createTime: 2021/9/20 14:22
 **/
function defaultEquals(a, b) {
	return a === b;
}

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
module.exports = { defaultEquals, defaultCompare, Compare };