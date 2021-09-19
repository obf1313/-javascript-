/**
 * @description: 平衡圆括号
 * @author: cnn
 * @createTime: 2021/9/14 23:36
 **/
const Stack = require('./stack.js');

function match(open, close) {
	let opens = '([{';
	let closers = ')]}';
	return opens.indexOf(open) === closers.indexOf(close);
}
function parenthesesChecker(symbols) {
	let stack = new Stack();
	// 是否为平衡
	let balanced = true;
	let index = 0;
	let top;
	let symbol;
	let opens = '([{';
	while (index < symbols.length && balanced) {
		symbol = symbols[index];
		if (opens.indexOf(symbol) > -1) {
			stack.push(symbol); // {{([
		} else {
			top = stack.pop();
			if (!match(top, symbol)) {
				balanced = false;
			}
		}
		index++;
	}
	if (balanced && stack.isEmpty()) {
		return true;
	}
	return false;
}
console.log(parenthesesChecker('{{([][])}()}'));
console.log(parenthesesChecker('[{()]'));