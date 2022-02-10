/**
 * @description: 字典
 * @author: cnn
 * @createTime: 2022/2/10 16:44
 **/
const { defaultToString } = require('./../utils');
const { ValuePair }  = require('./ValuePair');

class Dictionary {
	constructor(toStrFn = defaultToString) {
		this.toStrFn = toStrFn;
		this.table = {};
	}
	// 是否存在
	hasKey(key) {
		return this.table[this.toStrFn(key)] != null;
	}
	// 设置
	set(key, value) {
		if (key != null && value != null) {
			const tableKey = this.toStrFn(key);
			this.table[tableKey] = new ValuePair(key, value);
			return true;
		}
		return false;
	}
	// 移除值
	remove(key) {
		if (this.hasKey(key)) {
			delete this.table[this.toStrFn(key)];
			return true;
		}
		return false;
	}
	// 检索值
	get(key) {
		const valuePair = this.table[this.toStrFn(key)];
		return valuePair == null ? undefined : valuePair.value;
	}
	// 返回所有 valuePair 对象
	keyValues() {
		// return Object.values(this.table);
		// 并不是所有浏览器都支持 Object.values，可以用以下代码代替
		const valuePairs = [];
		for (const k in this.table) {
			if (this.hasKey(k)) {
				valuePairs.push(this.table[k]);
			}
		}
		return valuePairs;
	}
	// 返回所有键
	keys() {
		return this.keyValues().map(valuePair => valuePair.key);
	}
	// 返回所有值
	values() {
		return this.keyValues().map(valuePair => valuePair.value);
	}
	// 遍历
	forEach(callbackFn) {
		const valuePairs = this.keyValues();
		for (let i = 0; i < valuePairs.length; i++) {
			const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
			if (result === false) {
				break;
			}
		}
	}
	// 获取个数
	size() {
		return Object.keys(this.table).length;
	}
	// 判空
	isEmpty() {
		return this.size() === 0;
	}
	// 清空字典
	clear() {
		this.table = {};
	}
	// 转换为字符串
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		const valuePairs = this.keyValues();
		let objString = `${valuePairs[0].toString()}`;
		for (let i = 1; i < valuePairs.length; i++) {
			objString = `${objString},${valuePairs[i].toString()}`;
		}
		return objString;
	}
}

module.exports = Dictionary;
