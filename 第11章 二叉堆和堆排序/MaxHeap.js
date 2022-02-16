/**
 * @description: 最大堆
 * 不同于复制代码。可以扩展 MinHeap 类，并在需要时进行反向比较。
 * 要将比较反转，不将 a 和 b 进行比较，而是将 b 和 a 进行比较。
 * @author: cnn
 * @createTime: 2022/2/16 14:10
 **/
const MinHeap = require('./MinHeap');
const { defaultCompare, reverseCompare } = require('../utils');

class MaxHeap extends MinHeap {
	constructor(compareFn = defaultCompare) {
		super(compareFn);
		this.compareFn = reverseCompare(compareFn);
	}
}
module.exports = MaxHeap;
