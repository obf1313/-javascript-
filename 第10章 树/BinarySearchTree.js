/**
 * @description: 二叉搜索树
 * @author: cnn
 * @createTime: 2022/2/14 9:31
 **/
const { defaultCompare, Compare } = require('./../utils');
const Node = require('./Node');

class BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		this.compareFn = compareFn;
		this.root = null;
	}
	// 插入新键
	insert(key) {
		if (this.root == null) {
			this.root = new Node(key);
		} else {
			this.insertNode(this.root, key);
		}
	}
	// 插入新键
	insertNode(node, key) {
		if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			if (node.left == null) {
				node.left = new Node(key);
			} else {
				this.insertNode(node.left, key);
			}
		} else {
			if (node.right == null) {
				node.right = new Node(key);
			} else {
				this.insertNode(node.right, key);
			}
		}
	}
	// 中序遍历
	inOrderTraverse(callback) {
		this.inOrderTraverseNode(this.root, callback);
	}
	// 中序遍历，先访问节点节点左侧，再访问本身，再右侧
	inOrderTraverseNode(node, callback) {
		if (node != null) {
			// callback('1-' + node.key);
			this.inOrderTraverseNode(node.left, callback);
			callback(node.key);
			this.inOrderTraverseNode(node.right, callback);
			// callback('3-' + node.key);
		}
	}
	// 先序遍历，先访问节点本身，在访问左侧，最后是右侧。
	preOrderTraverse(callback) {
		this.preOrderTraverseNode(this.root, callback);
	}
	// 先序遍历
	preOrderTraverseNode(node, callback) {
		if (node != null) {
			callback(node.key);
			this.preOrderTraverseNode(node.left, callback);
			this.preOrderTraverseNode(node.right, callback);
		}
	}
	// 后序遍历，先访问左侧子节点，再是右侧子节点，最后是节点本身
	postOrderTraverse(callback) {
		this.postOrderTraverseNode(this.root, callback);
	}
	// 后序遍历
	postOrderTraverseNode(node, callback) {
		if (node != null) {
			this.postOrderTraverseNode(node.left, callback);
			this.postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	}
	// 最小值
	min() {
		return this.minNode(this.root);
	}
	// 最小值
	minNode(node) {
		let current = node;
		while (current != null && current.left != null) {
			current = current.left;
		}
		return current;
	}
	// 最大值
	max() {
		return this.maxNode(this.root);
	}
	// 最大值
	maxNode(node) {
		let current = node;
		while (current != null && current.right != null) {
			current = current.right;
		}
		return current;
	}
	// 查找节点
	search(key) {
		return this.searchNode(this.root, key);
	}
	// 查找节点
	searchNode(node, key) {
		if (node === null) {
			return false;
		}
		if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			return this.searchNode(node.left, key);
		} else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
			return this.searchNode(node.right, key);
		} else {
			return true;
		}
	}
	// 移除节点
	remove(key) {
		this.root = this.removeNode(this.root, key);
	}
	// 移除节点
	removeNode(node, key) {
		if (node == null) {
			return null;
		}
		if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			node.left = this.removeNode(node.left, key);
			return node;
		} else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
			node.right = this.removeNode(node.right, key);
			return node;
		} else {
			// 相等
			// 无子节点
			if (node.left == null && node.right == null) {
				node = null;
				return node;
			}
			// 只有单边节点
			if (node.left == null) {
				node = node.right;
				return node;
			} else if (node.right == null) {
				node = node.left;
				return node;
			}
			// 找到该节点右树最小节点
			const minNode = this.minNode(node.right);
			// 替换节点值为最小节点的值
			node.key = minNode.key;
			// 移除之前的最小节点
			node.right = this.removeNode(node.right, minNode.key);
			return node;
		}
	}
}
module.exports = BinarySearchTree;
