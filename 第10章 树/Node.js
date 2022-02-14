/**
 * @description: 描述
 * @author: cnn
 * @createTime: 2022/2/14 9:38
 **/
class Node {
	constructor(key) {
		this.key = key; // 节点值
		this.left = null; // 左侧子节点引用
		this.right = null; // 右侧子节点引用
	}
}
module.exports = Node;
