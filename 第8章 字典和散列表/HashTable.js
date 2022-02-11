/**
 * @description: 散列表
 * @author: cnn
 * @createTime: 2022/2/11 9:15
 **/
const { defaultToString } = require('../utils');
const { ValuePair } = require('./ValuePair');

class HashTable {
	constructor(toStrFn = defaultToString) {
		this.toStrFn = toStrFn;
		this.table = {};
	}
	// 散列函数
	// 很明显，这种存储方法会有键重复导致数据丢失的情况
	// 处理冲突的方法：分离链接、线性探查、双散列法
	loseloseHashCode(key) {
		if (typeof key === 'number') {
			return key;
		}
		const tableKey = this.toStrFn(key);
		let hash = 0;
		for (let i = 0; i < tableKey.length; i++) {
			hash += tableKey.charCodeAt(i);
		}
		return hash % 37;
	}
	// 获取散列值
	hashCode(key) {
		return this.loseloseHashCode(key);
	}
	// 添加元素
	put(key, value) {
		if (key != null && value != null) {
			const position = this.hashCode(key);
			this.table[position] = new ValuePair(key, value);
			return true;
		}
		return false;
	}
	// 获取元素
	get(key) {
		const valuePair = this.table[this.hashCode(key)];
		return valuePair == null ? undefined : valuePair.value;
	}
	// 移除
	remove(key) {
		const hash = this.hashCode(key);
		const valuePair = this.table[hash];
		if (valuePair != null) {
			delete this.table[hash];
			return true;
		}
		return false;
	}
}

module.exports = HashTable;
