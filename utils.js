/**
 * @description: 工具方法
 * @author: cnn
 * @createTime: 2022/2/10 16:41
 **/
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
module.exports = { defaultToString };
