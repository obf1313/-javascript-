/**
 * @description: 随机算法
 * @author: cnn
 * @createTime: 2022/2/25 10:36
 **/
const { swap } = require('../utils');

function shuffle(array) {
	for (let i = array.length - 1; i > 0 ; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		swap(array, i, randomIndex);
	}
	return array;
}
console.log('[0, 5, 2, 8, 9] -> ', shuffle([0, 5, 2, 8, 9]));
