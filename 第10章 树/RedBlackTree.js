/**
 * @description: 红黑树
 * 1 每个节点不是红的就是黑的。
 * 2 树的根节点是黑色的。
 * 3 所有叶节点都是黑的。
 * 4 如果一个节点是红的，那么它的两个子节点都是黑的。
 * 5 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点。
 * 6 从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点。
 * @author: cnn
 * @createTime: 2022/2/15 11:17
 **/
const BinarySearchTree = require('./BinarySearchTree');
const { defaultCompare, Compare } = require('../utils');
const { RedBlackNode, Colors } = require('./RedBlackNode');

class RedBlackTree extends BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		super(compareFn);
		this.compareFn = compareFn;
		this.root = null;
	}
	// 插入
	insert(key) {
		if (this.root == null) {
			this.root = new RedBlackNode(key);
			// 根节点是黑色
			this.root.color = Colors.BLACK;
		} else {
			const newNode = this.insertNode(this.root, key);
			this.fixTreeProperties(newNode);
		}
	}
	// 左左旋转
	rotationLL(node) {
		const tmp = node.left;
		node.left = tmp.right;
		if (tmp.right && tmp.right.key) {
			tmp.right.parent = node;
		}
		tmp.parent = node.parent;
		if (!node.parent) {
			this.root = tmp;
		} else {
			if (node === node.parent.left) {
				node.parent.left = tmp;
			} else {
				node.parent.right = tmp;
			}
		}
		tmp.right = node;
		node.parent = tmp;
	}
	// 右右旋转
	rotationRR(node) {
		const tmp = node.right;
		node.right = tmp.left;
		if (tmp.left && tmp.left.key) {
			tmp.left.parent = node;
		}
		tmp.parent = node.parent;
		if (!node.parent) {
			this.root = tmp;
		} else {
			if (node === node.parent.left) {
				node.parent.left = tmp;
			} else {
				node.parent.right = tmp;
			}
		}
		tmp.left = node;
		node.parent = tmp;
	}
	// 插入节点，我个人觉得这个并不能满足红黑树的要求，所以我看不下去了。
	insertNode(node, key) {
		if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			if (node.left == null) {
				node.left = new RedBlackNode(key);
				node.left.parent = node;
				return node.left;
			} else {
				return this.insertNode(node.left, key);
			}
		} else if (node.right == null) {
			node.right = new RedBlackNode(key);
			node.right.parent = node;
			return node.right;
		} else {
			return this.insertNode(node.right, key);
		}
	}
	// 修复红黑树使其满足属性
	fixTreeProperties(node) {
		// 节点有父节点，且父节点是红色，且节点本身是黑色
		while (node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {
			let parent = node.parent;
			const grandParent = parent.parent;
			// 情节A 父节点是左侧子节点
			if (grandParent && grandParent.left === parent) {
				const uncle = grandParent.right;
				// 情形A1 叔节点也是红色 - 只需要重新填色
				if (uncle && uncle.isRed()) {
					grandParent.color = Colors.RED;
					parent.color = uncle.color = Colors.BLACK;
					node = grandParent;
				} else {
					// 情形A2 节点是右侧子节点 - 左旋转
					if (node === parent.right) {
						this.rotationRR(parent);
						node = parent;
						parent = node.parent;
					}
					// 情形A3 节点是左侧子节点 - 右旋转
					this.rotationLL(grandParent);
					parent.color = Colors.BLACK;
					grandParent.color = Colors.RED;
					node = parent;
				}
			}
			// 情形B 父节点是右侧子节点
			else {
				const uncle = grandParent.left;
				// 情形B1 叔节点是红色 - 重新填色
				if (uncle && uncle.isRed()) {
					grandParent.color = Colors.RED;
					parent.color = uncle.color = Colors.BLACK;
					node = grandParent;
				} else {
					// 情形B2 节点是左侧子节点 - 右旋转
					if (node === parent.left) {
						this.rotationLL(parent);
						node = parent;
						parent = node.parent;
					}
					// 情形B2 节点是右侧子节点 - 左旋转
					this.rotationRR(grandParent);
					parent.color = Colors.BLACK;
					grandParent.color = Colors.RED;
					node = parent;
				}
			}
		}
		this.root.color = Colors.BLACK;
	}
}
