/**
 * @description: 拥有私有变量的栈
 * 实际上，我们不能像在其他编程语言中一样声明私有属性和方法
 * @author: cnn
 * @createTime: 2021/9/12 17:27
 **/
// 用 symbol 实现，但仍然不行
// 下划线起始命名作为私有变量，只是一个约定
// 声明 Symbol 类型的变量
// const _items = Symbol('stackItems');
// class Stack {
// 	constructor() {
// 		this[_items] = [];
// 	}
// }

// 用 weakMap 实现
const items = new WeakMap();
class Stack {
	constructor() {
		items.set(this, []);
	}
	push(element) {
		const s = items.get(this);
		s.push(element);
	}
	pop() {
		const s = items.get(this);
		const r = s.pop();
		return r;
	}
	// 其他方法
}