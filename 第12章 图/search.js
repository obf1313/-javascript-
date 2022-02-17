/**
 * @description: 图的遍历
 * @author: cnn
 * @createTime: 2022/2/17 10:36
 **/
const Queue = require('../第5章 队列与双端队列/Queue');
const { initializeColor, Colors } = require('./utils');
const Stack = require('../第4章 栈数据结构/Stack');

/**
 * 广度优先遍历
**/
// 广度优先遍历，使用队列存储需要遍历的点，先进先出
const breadthFirstSearch = (graph, startVertex, callback) => {
	const vertices = graph.getVertices();
	const adjList = graph.getAdjList();
	const color = initializeColor(vertices);
	const queue = new Queue();
	queue.enqueue(startVertex);
	// 如果队列非空
	while (!queue.isEmpty()) {
		// 出列 u
		const u = queue.dequeue();
		const neighbors = adjList.get(u);
		// 标注 u 为灰色
		color[u] = Colors.GREY;
		// 将 u 的所有未被访问的邻点加入队列
		for (let i = 0; i < neighbors.length; i++) {
			const w = neighbors[i];
			if (color[w] === Colors.WHITE) {
				// 该点已被访问过，但未被探索过
				color[w] = Colors.GREY;
				queue.enqueue(w);
			}
		}
		color[u] = Colors.BLACK;
		if (callback) {
			callback(u);
		}
	}
};
// 广度优先寻找最短距离
const BFS = (graph, startVertex) => {
	const vertices = graph.getVertices();
	const adjList = graph.getAdjList();
	const color = initializeColor(vertices)
	const queue = new Queue();
	// 从 u 到 v 的距离
	const distances = {}
	// 用来推导从 v 到其他顶点 u 的最短路径
	const predecessors = {};
	queue.enqueue(startVertex);
	for (let i = 0; i < vertices.length; i++) {
		distances[vertices[i]] = 0;
		predecessors[vertices[i]] = null;
	}
	while (!queue.isEmpty()) {
		const u = queue.dequeue();
		const neighbors = adjList.get(u);
		color[u] = Colors.GREY;
		for (let i = 0; i < neighbors.length; i++) {
			const w = neighbors[i];
			if (color[w] === Colors.WHITE) {
				color[w] = Colors.GREY;
				distances[w] = distances[u] + 1;
				predecessors[w] = u;
				queue.enqueue(w);
			}
		}
		color[u] = Colors.BLACK;
	}
	return {
		distances,
		predecessors
	};
};
/**
 * 根据前溯点获取顶点到其他顶点的路径
 * @param fromVertex 起始点
 * @param vertices 顶点数组
 * @param predecessors 前溯点数组
**/
const getPath = (fromVertex, vertices, predecessors) => {
	for (let i = 0; i < vertices.length; i++) {
		const toVertex = vertices[i];
		const path = new Stack();
		// 循环 predecessors 直到其值为起点，push 进 path
		for (let v = toVertex; v !== fromVertex; v = predecessors[v]) {
			path.push(v);
		}
		// push 顶点
		path.push(fromVertex);
		// 从栈中弹出第一个数据
		let s = path.pop();
		// 循环弹出赋值给 s
		while (!path.isEmpty()) {
			s += ' - ' + path.pop();
		}
		console.log(s);
	}
};

/**
 * 深度优先遍历
**/
// 深度优先遍历
const depthFirstSearch = (graph, callBack) => {
	const vertices = graph.getVertices();
	const adjList = graph.getAdjList();
	const color = initializeColor(vertices);
	for (let i = 0; i < vertices.length; i++) {
		if (color[vertices[i]] === Colors.WHITE) {
			depthFirstSearchVisit(vertices[i], color, adjList, callBack);
		}
	}
};
const depthFirstSearchVisit = (u, color, adjList, callback) => {
	color[u] = Colors.GREY;
	if (callback) {
		callback(u);
	}
	const neighbors = adjList.get(u);
	for (let i = 0; i < neighbors.length; i++) {
		const w = neighbors[i];
		if (color[w] === Colors.WHITE) {
			depthFirstSearchVisit(w, color, adjList, callback);
		}
	}
	color[u] = Colors.BLACK;
};
// 构建森林以及根节点数组，并输出两个数组：发现时间和完成探索时间
const DFS = (graph) => {
	const vertices = graph.getVertices();
	const adjList = graph.getAdjList();
	const color = initializeColor(vertices);
	// 发现时间
	const discovery = {};
	// 完成探索时间
	const finished = {};
	// 前溯点
	const predecessors = {};
	const time = { count: 0 };
	for (let i = 0; i < vertices.length; i++) {
		finished[vertices[i]] = 0;
		discovery[vertices[i]] = 0;
		predecessors[vertices[i]] = null;
	}
	for (let i = 0; i < vertices.length; i++) {
		if (color[vertices[i]] === Colors.WHITE) {
			DFSVisit(vertices[i], color, discovery, finished, predecessors, time, adjList);
		}
	}
	return {
		discovery,
		finished,
		predecessors
	};
};
const DFSVisit = (u, color, discovery, finished, predecessors, time, adjList) =>{
	color[u] = Colors.GREY;
	time.count = time.count + 1;
	discovery[u] = time.count;
	const neighbors = adjList.get(u);
	for (let i = 0; i < neighbors.length; i++) {
		const w = neighbors[i];
		if (color[w] === Colors.WHITE) {
			// 前溯点赋值
			predecessors[w] = u;
			DFSVisit(w, color, discovery, finished, predecessors, time, adjList);
		}
	}
	color[u] = Colors.BLACK;
	time.count = time.count + 1;
	finished[u] = time.count;
};
// 拓扑排序
const topSort = (vertices, fTimes) => {
	let s = '';
	for (let count = 0; count < vertices.length; count++) {
		let max = 0;
		let maxName = null;
		for (let i = 0; i < vertices.length; i++) {
			if (fTimes[vertices[i]] > max) {
				max = fTimes[vertices[i]];
				maxName = vertices[i];
			}
		}
		s += maxName + ' - ';
		delete fTimes[maxName];
	}
	console.log(s);
};
module.exports = { breadthFirstSearch, BFS, getPath, depthFirstSearch, DFS, topSort };
