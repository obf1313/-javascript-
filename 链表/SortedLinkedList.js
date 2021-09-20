/**
 * @description: 有序链表
 * @author: cnn
 * @createTime: 2021/9/20 16:22
 **/
const LinkedList = require('./LinkedList');
const { defaultEquals, defaultCompare, Compare } = require('./utils');

class SortedLinkedList extends LinkedList {
	constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
		super(equalsFn);
		this.compareFn = compareFn;
	}
	// 插入元素
	insert(element, index = 0) {
		if (this.isEmpty()) {
			return super.insert(element, 0);
		}
		const pos = this.getIndexNextSortedElement(element);
		return super.insert(element, pos);
	}
	// 获取
	getIndexNextSortedElement(element) {
		let current = this.head;
		let i = 0;
		for (; i < this.size() && current; i++) {
			const comp = this.compareFn(element, current.element);
			if (comp === Compare.LESS_THAN) {
				return i;
			}
			current = current.next;
		}
		return i;
	}
}