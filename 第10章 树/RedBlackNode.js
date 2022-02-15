/**
 * @description: 红黑树节点
 * @author: cnn
 * @createTime: 2022/2/15 11:31
 **/
const Node = require('./Node');

const Colors = {
	RED: 'red',
	BLACK: 'black'
};

class RedBlackNode extends Node {
	constructor(key) {
		super(key);
		this.key = key;
		this.color = Colors.RED;
		this.parent = null;
	}
	isRed() {
		return this.color === Colors.RED;
	}
}

module.exports = { Colors, RedBlackNode };
