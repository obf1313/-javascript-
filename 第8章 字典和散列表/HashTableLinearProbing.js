/**
 * @description: 线性探查散列表
 * 将元素直接存储到表中，而不是单独的数据结构中。
 * 索引值 键值对 散列值
 * @author: cnn
 * @createTime: 2022/2/11 10:28
 **/
const { defaultToString } = require('../utils');
const { ValuePair } = require('./ValuePair');

class HashTableLinearProbing {
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
			if (this.table[position] == null) {
				this.table[position] = new ValuePair(key, value);
			} else {
				let index = position + 1;
				while (this.table[index] != null) {
					index++;
				}
				this.table[index] = new ValuePair(key, value);
			}
			return true;
		}
		return false;
	}
	// 获取元素
	get(key) {
		const position = this.hashCode(key);
		if (this.table[position] != null) {
			if (this.table[position].key === key) {
				return this.table[position].value;
			}
			let index = position + 1;
			while (this.table[index] != null && this.table[index].key !== key) {
				index++;
			}
			if (this.table[index] != null && this.table[index].key === key) {
				return this.table[index].value;
			}
		}
		return undefined;
	}
	// 移除后副作用，有则移动下一个到当前，防止产生空位置
	verifyRemoveSideEffect(key, removedPosition) {
		// 移除元素的 hash 值
		const hash = this.hashCode(key);
		// 从移除的后一个开始遍历
		let index = removedPosition + 1;
		// 有值的时候
		while (this.table[index] != null) {
			// 当前元素的 hash 值
			const posHash = this.hashCode(this.table[index].key);
			// 当当前元素的 hash 值小于等于（移除元素的 hash 值 或 当前移除的元素位置）
			if (posHash <= hash || posHash <= removedPosition) {
				this.table[removedPosition] = this.table[index];
				delete this.table[index];
				removedPosition = index;
			}
			index++;
		}
	}
	// 移除元素
	remove(key) {
		const position = this.hashCode(key);
		if (this.table[position] != null) {
			if (this.table[position].key === key) {
				delete this.table[position];
				this.verifyRemoveSideEffect(key, position);
				return true;
			}
			let index = position + 1;
			while (this.table[index] != null && this.table[index].key !== key) {
				index++;
			}
			if (this.table[index] != null && this.table[index].key === key) {
				delete this.table[index];
				this.verifyRemoveSideEffect(key, index);
				return true;
			}
		}
		return false;
	}
}
