/**
 * @description: 最短路径算法
 * @author: cnn
 * @createTime: 2022/2/18 9:22
 **/
const INF = Number.MAX_SAFE_INTEGER;

/**
 * dijkstra 算法
 * @param graph 此处 graph 是邻接矩阵。
 * @param src 源顶点 index。
**/
const dijkstra = (graph, src) => {
	// 距离源顶点的距离。
	const dist = [];
	// 是否已探索
	const visited = [];
	const { length } = graph;
	// 把所有距离初始化为无限大，将 visited[] 初始化为 false。
	for (let i = 0; i < length; i++) {
		dist[i] = INF;
		visited[i] = false;
	}
	// 把源顶点到自己的距离设置为 0。
	dist[src] = 0;
	// dist[0] = 1;
	// 为什么是 length - 1。
	for (let i = 0; i < length - 1; i++) {
		// 从尚未处理的顶点中选出距离最近的点。
		const u = minDistance(dist, visited);
		// console.log('i-u:', i, '-', u);
		// 把选出的点标为 visited，
		visited[u] = true;
		for (let j = 0; j < length; j++) {
			const distance = dist[u] + graph[u][j];
			// 如果没有被访问过，且能抵达，且找到了最短路径，且（最短路径 + 当前点距离最短路径顶点距离）小于之前的值。
			if (!visited[j] && graph[u][j] !== 0 && dist[u] !== INF && distance < dist[j]) {
				dist[j] = distance;
				// console.log(`dist[${j}]`, ':', dist[j]);
			}
		}
	}
	return dist;
};
const minDistance = (dist, visited) => {
	let min = INF;
	let minIndex = -1;
	for (let i = 0; i < dist.length; i++) {
		// 尚未处理
		if (visited[i] === false &&  [i] <= min) {
			min = dist[i];
			minIndex = i;
		}
	}
	return minIndex;
};
/**
 * Floyd-Warshall 算法
 * @param graph 邻接矩阵图
**/
const floydWarshall = graph => {
	const dist = [];
	const { length } = graph;
	// 把 distance 数组初始化为每个顶点之间的权值，因为可能 i 到 j 的最短距离就是这些顶点间的权值。
	for (let i = 0; i < length; i++) {
		dist[i] = [];
		for (let j = 0; j < length; j++) {
			if (i === j) {
				dist[i][j] = 0;
			} else if (graph[i][j] === 0) {
				dist[i][j] = Infinity;
			} else {
				dist[i][j] = graph[i][j];
			}
		}
	}
	// 将顶点 0 到 k 作为中间点，从 i 到 j 的最短路径经过 k，如果经过 k 的路径小于之前路径，则更新值。
	for (let k = 0; k < length; k++) {
		for (let i = 0; i < length; i++) {
			for (let j = 0; j < length; j++) {
				if (dist[i][k] + dist[k][j] < dist[i][j]) {
					dist[i][j] = dist[i][k] + dist[k][j];
				}
			}
		}
	}
	return dist;
};
module.exports = { dijkstra, floydWarshall };
