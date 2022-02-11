/**
 * @description: 分离链接散列表
 * 为散列表的每一个位置创建一个链表并将元素存储在里面。
 * @author: cnn
 * @createTime: 2022/2/11 9:50
 **/
const { defaultToString } = require('../utils');
const LinkedList = require('../第6章 链表/LinkedList');
const { ValuePair } = require('./ValuePair');

class HashTableSeparateChaining {
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
			// 如果是新的 hash 值
			if (this.table[position] == null) {
				this.table[position] = new LinkedList();
			}
			this.table[position].push(new ValuePair(key, value));
			return true;
		}
		return false;
	}
	// 获取元素
	get(key) {
		const position = this.hashCode(key);
		const linkedList = this.table[position];
		if (linkedList != null && !linkedList.isEmpty()) {
			let current = linkedList.getHead();
			while (current != null) {
				if (current.element.key === key) {
					return current.element.value;
				}
				current = current.next;
			}
		}
		return undefined;
	}
	// 移除元素
	remove(key) {
		const position = this.hashCode(key);
		const linkedList = this.table[position];
		if (linkedList != null && !linkedList.isEmpty()) {
			let current = linkedList.getHead();
			while (current != null) {
				if (current.element.key === key) {
					linkedList.remove(current.element);
					if (linkedList.isEmpty()) {
						delete this.table[position];
					}
					return true;
				}
				current = current.next;
			}
		}
		return false;
	}
}

module.exports = HashTableSeparateChaining;
