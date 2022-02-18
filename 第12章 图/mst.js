/**
 * @description: minimum spanning tree 最小生成树
 * @author: cnn
 * @createTime: 2022/2/18 11:07
 **/
const INF = Number.MAX_SAFE_INTEGER;
/**
 * Prim 算法，贪心算法
**/
const prim = graph => {
	// 前溯点
	const parent = [];
	// 最小权值
	const key = [];
	const visited = [];
	const { length } = graph;
	for (let i = 0; i < length; i++) {
		key[i] = INF;
		visited[i] = false;
	}
	key[0] = 0;
	parent[0] = -1;
	for (let i = 0; i < length - 1; i++) {
		// 从未处理的顶点中选出 key 值最小的顶点的最后一个。
		const u = minKey(key, visited);
		visited[u] = true;
		for (let v = 0; v < length; v++) {
			// 如果可到达，且没有被探索过，且权值小于之前的权值。
			if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
				parent[v] = u;
				key[v] = graph[u][v];
			}
		}
	}
	return {
		parent,
		key
	};
};
const minKey = (key, visited) => {
	let min = INF;
	let minIndex = -1;
	for (let i = 0; i < key.length; i++) {
		// 尚未处理
		if (visited[i] === false && key[i] <= min) {
			min = key[i];
			minIndex = i;
		}
	}
	return minIndex;
};
/**
 * Kruskal 算法
 * 求加权无向连通图的 MST 的贪心算法
**/
const kruskal = graph => {
	const { length } = graph;
	const parent = [];
	const route = {};
	// 边数
	let ne = 0;
	let a;
	let b;
	let u;
	let v;
	// 把邻接矩阵的值复制到 cost 数组，以方便修改且可以保留原始值行。
	const cost = initializeCost(graph);
	// 当 MST 的边数小于顶点总数减 1 时。
	while (ne < length - 1) {
		// 找出权值最小的边
		for (let i = 0, min = INF; i < length; i++) {
			for (let j = 0; j < length; j++) {
				if (cost[i][j] < min) {
					min = cost[i][j];
					a = u = i;
					b = v = j;
				}
			}
		}
		// 检查 MST 中是否已存在这条边，避免环路，这里有问题
		// 如果不会生成环路，且两个点互不相等，则添加该边。
		if (union(find(u, parent), find(v, parent), parent)) {
			route[`${u}-${v}`] = cost[u][v];
			ne++;
		}
		// 从列表中移除这些边，以免重复计算。
		cost[a][b] = cost[b][a] = INF;
	}
	return route;
}
const find = (i, parent) => {
	while (parent[i]) {
		i = parent[i];
	}
	return i;
};
const union = (i, j, parent) => {
	if (i !== j) {
		parent[j] = i;
		return true;
	}
	return false;
};
const initializeCost = (graph) => {
	const cost = [];
	for (let i = 0; i < graph.length; i++) {
		const line = [];
		for (let j = 0; j < graph.length; j++) {
			line.push(graph[i][j] === 0 ? INF : graph[i][j]);
		}
		cost.push(line);
	}
	return cost;
}
module.exports = { prim, kruskal };
