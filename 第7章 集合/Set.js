/**
 * @description: 集合
 * @author: cnn
 * @createTime: 2021/9/21 17:59
 **/
class Set {
	constructor() {
		this.items = {};
	}
	// 包含
	has(element) {
		// return element in this.items;
		return Object.prototype.hasOwnProperty.call(this.items, element);
	}
	// 添加
	add(element) {
		if (!this.has(element)) {
			this.items[element] = element;
			return true;
		}
		return false;
	}
	// 删除
	delete(element) {
		if (this.has(element)) {
			delete this.items[element];
			return true;
		}
		return false;
	}
	// 清空
	clear() {
		this.items = {};
	}
	// 获取长度
	size() {
		return Object.keys(this.items).length;
	}
	// 获取长度，所有浏览器都可以
	sizeLegacy() {
		let count = 0;
		for(let key in this.items) {
			if (this.items.hasOwnProperty(key)) {
				count++;
			}
		}
		return count;
	}
	// 获取所有值
	values() {
		return Object.values(this.items);
	}
	// 获取所有值，所有浏览器都可以
	valuesLegacy() {
		let values = [];
		for (let key in this.items) {
			if (this.items.hasOwnProperty(key)) {
				values.push(key);
			}
		}
		return values;
	}
	// 并集
	union(otherSet) {
		const unionSet = new Set();
		this.values().forEach(value => unionSet.add(value));
		otherSet.values().forEach(value => unionSet.add(value));
		return unionSet;
	}
	// 并集，不适用 es6 语法糖
	// union(otherSet) {
	// 	const unionSet = new Set();
	// 	let values = this.values();
	// 	for (let i = 0; i < values.length; i++) {
	// 		unionSet.add(values[i]);
	// 	}
	// 	values = otherSet.values();
	// 	for (let i = 0; i < values.length; i++) {
	// 		unionSet.add(values[i]);
	// 	}
	// 	return unionSet;
	// }
	// 交集
	intersection(otherSet) {
		const intersectionSet = new Set();
		const values = this.values();
		const otherValues = otherSet.values();
		let biggerSet = values;
		let smallerSet = otherValues;
		if (otherValues.length > values.length) {
			biggerSet = otherValues;
			smallerSet = values;
		}
		smallerSet.forEach(value => {
			if (biggerSet.includes(value)) {
				intersectionSet.add(value);
			}
		});
		return intersectionSet;
	}
	// 差值
	difference(otherSet) {
		const differenceSet = new Set();
		this.values().forEach(value => {
			if (!otherSet.has(value)) {
				differenceSet.add(value);
			}
		});
		return differenceSet;
	}
	// 是否为子集
	isSubsetOf(otherSet) {
		if (this.size() > otherSet.size()) {
			return false;
		}
		let isSubset = true;
		this.values().every(value => {
			if (!otherSet.has(value)) {
				isSubset = false;
				return false;
			}
			return true;
		});
		return isSubset;
	}
}
module.exports = Set;