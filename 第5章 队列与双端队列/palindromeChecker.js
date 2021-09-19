/**
 * @description: 回文检查
 * 其实最简单的是 str.reverse() === str
 * @author: cnn
 * @createTime: 2021/9/19 16:56
 **/
const Deque = require('./Deque');

function palindromeChecker(aString) {
	if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
		return false;
	}
	const deque = new Deque();
	const lowerString = aString.toLocaleLowerCase().split(' ').join('');
	let isEqual = true;
	let firstChar, lastChar;
	for (let i = 0; i < lowerString.length; i++) {
		deque.addBack(lowerString.charAt(i));
	}
	while (deque.size() > 1 && isEqual) {
		firstChar = deque.removeFront();
		lastChar = deque.removeBack();
		if (firstChar !== lastChar) {
			isEqual = false;
		}
	}
	return isEqual;
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('was it a car or a cat i saw', palindromeChecker('was it a car or a cat i saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));