/**
 * @description: 汉诺塔
 * @author: cnn
 * @createTime: 2021/9/14 23:47
 **/
const Stack = require('./stack');
let count = 0;
/**
 * n: 第几个
 * from: 来源，stack
 * to: 去向，stack
 * helper: 中间转移，stack
 * **/
function towerOfHanoi(n, from, to, helper) {
	if (n > 0) {
		towerOfHanoi(n - 1, from, helper, to);
		to.push(from.pop());
		count++;
		console.log('第' + count + '次');
		console.log('Source:' + from.toString());
		console.log('Dest:' + to.toString());
		console.log('Helper:' + helper.toString());
		towerOfHanoi(n - 1, helper, to, from);
	}
}
let source = new Stack();
source.push(3);
source.push(2);
source.push(1);

let dest = new Stack();
let helper = new Stack();
let n = source.size();
towerOfHanoi(n, source, dest, helper);