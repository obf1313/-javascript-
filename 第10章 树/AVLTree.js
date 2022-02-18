/**
 * @description: 自平衡二叉搜索树 AVL树
 * @author: cnn
 * @createTime: 2022/2/15 9:17
 **/
const { defaultCompare, Compare } = require('../utils');
const BinarySearchTree = require('./BinarySearchTree');
const Node = require('./Node');

const BalanceFactor = {
	UNBALANCED_RIGHT: 1,
	SLIGHTLY_UNBALANCED_RIGHT: 2,
	BALANCED: 3,
	SLIGHTLY_UNBALANCED_LEFT: 4,
	UNBALANCED_LEFT: 5
}

class AVLTree extends BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		super(compareFn);
		this.compareFn = compareFn;
		this.root = null;
	}
	// 计算节点高度
	getNodeHeight(node) {
		if (node == null) {
			return -1;
		}
		return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
	}
	// 计算一个节点的平衡因子并返回其值
	getBalanceFactor(node) {
		const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
		switch (heightDifference) {
			case -2:
				return BalanceFactor.UNBALANCED_RIGHT;
			case -1:
				return BalanceFactor.BALANCED;
			case 1:
				return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
			case 2:
				return BalanceFactor.UNBALANCED_LEFT;
			default:
				return BalanceFactor.BALANCED;
		}
	}
	// 向右的单旋转（左 - 左）
	// node：平衡因子为 +2 的节点
	rotationLL(node) {
		const tmp = node.left; // x
		node.left = tmp.right;
		tmp.right = node;
		return tmp;
	}
	// 向左的单旋转（右 - 右）
	// node：平衡因子为 -2 的节点
	rotationRR(node) {
		const tmp = node.right;
		node.right = tmp.left;
		tmp.left = node;
		return tmp;
	}
	// 向右的双旋转（左 - 右）
	// node：平衡因子为 +2 的节点
	rotationLR(node) {
		node.left = this.rotationRR(node.left);
		return this.rotationLL(node);
	}
	// 向左的双旋转（右 - 左）
	// node：平衡因子为 -2 的节点
	rotationRL(node) {
		node.right = this.rotationLL(node.right);
		return this.rotationRR(node);
	}
	// 插入节点
	insert(key) {
		this.root = this.insertNode(this.root, key);
	}
	// 插入节点
	// 这个真的能完成吗- -，怎么觉得不太对的样子，这样插入去查这个节点的平衡因子，如果是叶节点的话不是还是
	insertNode(node, key) {
		if (node == null) {
			return new Node(key);
		} else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			node.left = this.insertNode(node.left, key);
		} else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
			node.right = this.insertNode(node.right, key);
		} else {
			return node; // 重复的键
		}
		// 如果需要，将树进行平衡操作
		const balanceFactor = this.getBalanceFactor(node);
		if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
			//
			if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
				node = this.rotationLL(node);
			} else {
				node = this.rotationLR(node);
			}
		}
		if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
			if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
				node = this.rotationRR(node);
			} else {
				node = this.rotationRL(node);
			}
		}
		return node;
	}
	// 移除节点
	removeNode(node, key) {
		node = super.removeNode(node, key);
		if (node == null) {
			return node; // null 不需要进行平衡
		}
		// 检测树是否平衡
		const balanceFactor = this.getBalanceFactor(node);
		// 如果左子树不平衡
		if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
			// 计算左子树的平衡因子
			const balanceFactorLeft = this.getBalanceFactor(node.left);
			// 如果左子树向左不平衡，进行 LL
			if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
				return this.rotationLL(node);
			}
			// 如果左子树向右不平衡，进行 LR
			if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
				return this.rotationLR(node);
			}
		}
		// 如果右子树不平衡
		if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
			// 计算右子树的平衡因子
			const balanceFactorRight = this.getBalanceFactor(node.right);
			// 如果右子树向右不平衡，进行 RR
			if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
				return this.rotationRR(node);
			}
			// 如果右子树向左不平衡，进行 RL
			if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
				return this.rotationRL(node);
			}
		}
		return node;
	}
}
