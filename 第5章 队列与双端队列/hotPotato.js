/**
 * @description: 击鼓传花游戏，讲道理这个击鼓传花跟我理解的真不一样。
 * @author: cnn
 * @createTime: 2021/9/19 16:46
 **/
const Queue = require('./Queue');

function hotPotato(elementList, num) {
	const queue = new Queue();
	// 淘汰列表
	const eliminatedList = [];
	for (let i = 0; i < elementList.length; i++) {
		queue.enqueue(elementList[i]);
	}
	while (queue.size() > 1) {
		for (let i = 0; i < num; i++) {
			queue.enqueue(queue.dequeue());
		}
		eliminatedList.push(queue.dequeue());
	}
	return {
		eliminated: eliminatedList,
		winner: queue.dequeue()
	}
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);
result.eliminated.forEach(name => {
	console.log(`${name} 被淘汰。`);
});
console.log(`胜利者:${result.winner}`);