/**
 * @description: 算法设计与技巧（贪心算法）
 * @author: cnn
 * @createTime: 2022/3/1 17:14
 **/
/**
 * 最少硬币找零问题
**/
function minCoinChange(coins, amount) {
	let current = amount;
	let num = 0;
	for (let i = coins.length - 1; i >= 0; i--) {
		num = Math.floor(current / coins[i]) + num;
		current = current - Math.floor(current / coins[i]) * coins[i];
		if (current === 0) {
			break;
		}
	}
	return num;
}

/**
 * 分数背包问题
 * @param capacity 背包容量
 * @param weights 重量数组
 * @param values 价值数组
**/
function knapSack(capacity, weights, values) {
	const n = values.length;
	let load = 0;
	let val = 0;
	for (let i = 0; i < n && load < capacity; i++) {
		// 如果整个能装进去
		if (weights[i] <= capacity - load) {
			val += values[i];
			load += weights[i];
		}
		// 不能则计算能装多少，装入部分
		else {
			const r = (capacity - load) / weights[i];
			val += r * values[i];
			load += weights[i];
		}
	}
	return val;
}
console.log(knapSack(6, [2, 3, 4], [3, 4, 5]));
