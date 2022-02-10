/**
 * @description: 保存原始 key value
 * @author: cnn
 * @createTime: 2022/2/10 16:51
 **/
class ValuePair {
	constructor(key ,value) {
		this.key = key;
		this.value = value;
	}
	toString() {
		return `[#${this.key}: ${this.value}]`;
	}
}
module.exports = { ValuePair };
