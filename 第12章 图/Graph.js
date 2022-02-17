/**
 * @description: 图
 * 图可以使用邻接矩阵（顶点，顶点），邻接表（顶点 -> 顶点），关联矩阵(顶点，边)等表示。
 * 此例使用邻接表。
 * @author: cnn
 * @createTime: 2022/2/17 9:26
 **/
const Dictionary = require('../第8章 字典和散列表/Dictionary');

class Graph {
	constructor(isDirected = false) {
		// 图是否有向
		this.isDirected = isDirected;
		// 所有顶点的名字数组
		this.vertices = [];
		// 字典存储邻接表，顶点名字作为建，邻接顶点列表作为值
		this.adjList = new Dictionary();
	}
	// 添加顶点
	addVertex(v) {
		if (!this.vertices.includes(v)) {
			this.vertices.push(v);
			this.adjList.set(v, []);
		}
	}
	// 添加边
	addEdge(v, w) {
		if (!this.adjList.get(v)) {
			this.addVertex(v);
		}
		if (!this.adjList.get(w)) {
			this.addVertex(w);
		}
		this.adjList.get(v).push(w);
		// 如果是无向图
		if (!this.isDirected) {
			this.adjList.get(w).push(v);
		}
	}
	// 返回顶点列表
	getVertices() {
		return this.vertices;
	}
	// 返回邻接表
	getAdjList() {
		return this.adjList;
	}
	// toString
	toString() {
		let s = '';
		for (let i = 0; i < this.vertices.length; i++) {
			s += `${this.vertices[i]} -> `;
			const neighbors = this.adjList.get(this.vertices[i]);
			for (let j = 0; j < neighbors.length; j++) {
				s += `${neighbors[j]}`;
			}
			s += '\n';
		}
		return s;
	}
}
module.exports = Graph;
