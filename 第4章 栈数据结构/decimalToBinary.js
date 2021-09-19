/**
 * @description: 十进制转二进制
 * 循环除 2，取余，直到商为 0
 * @author: cnn
 * @createTime: 2021/9/12 17:40
 **/
const Stack = require('./stack.js');
// 十进制转二进制
function decimalToBinary(decNumber) {
	const remStack = new Stack();
	// 商
	let number = decNumber;
	// 余
	let rem;
	let binaryString = '';
	while (number > 0) {
		// 取余
		rem = Math.floor(number % 2);
		remStack.push(rem);
		number = Math.floor(number / 2);
	}
	while (!remStack.isEmpty()) {
		binaryString += remStack.pop().toString();
	}
	return binaryString;
}

// 十进制转任意进制
function baseConverter(decNumber, base) {
	const remStack = new Stack();
	const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let number = decNumber;
	let rem;
	let baseString = '';
	// 如果不是转换范围
	if (!(base >= 2 && base <= 36)) {
		return '';
	}
	while (number > 0) {
		// 取余
		rem = Math.floor(number % base);
		remStack.push(rem);
		number = Math.floor(number / base);
	}
	while (!remStack.isEmpty()) {
		baseString += digits[remStack.pop()];
	}
	return baseString;
}
console.log(baseConverter(233, 2));
console.log(baseConverter(233, 8));
console.log(baseConverter(233, 16));
console.log(baseConverter(233, 35));