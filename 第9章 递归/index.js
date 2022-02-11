/**
 * @description: 递归学习
 * @author: cnn
 * @createTime: 2022/2/11 15:29
 **/
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});
/**
 * 要理解递归，首先要理解递归
**/
function understandRecursion(doIUnderstandRecursion) {
	readline.question('Do u understand recursion? yes: 1, no: 0。', recursionAnswer => {
		if (recursionAnswer === '1') {
			return true;
		}
		understandRecursion(recursionAnswer); // 递归调用
	});
}
// understandRecursion(false);

/**
 * 计算一个数的阶乘
**/
// 迭代阶乘
function factorialIterative(number) {
	if (number < 0) return undefined;
	let total = 1;
	for (let i = number; i > 1; i--) {
		total = total * i;
	}
	return total;
}
// console.log(factorialIterative(3));
// 递归阶乘
function factorial(n) {
	// 查看调用栈
	console.trace();
	if (n === 1 || n === 0) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
}
// console.log(factorial(3));

/**
 * 测试浏览器调用栈大小限制
**/
function testMaxSize() {
	let i = 0;
	function recursiveFn() {
		i++;
		recursiveFn();
	}
	try {
		recursiveFn();
	} catch (ex) {
		console.error('i = ', i);
		console.error('error:', ex);
	}
}
// testMaxSize();

/**
 * 斐波那契数列
 * 位置 0 的斐波那契数是 0
 * 1 和 2 是 1
 * n（此处 n > 2）的斐波那契数是 (n - 1) + (n - 2)
**/
// 迭代求斐波那契数
function fibonacciIterative(n) {
	if (n < 1) return 0;
	if (n <= 2) return 1;
	let fib0 = 0;
	let fib1 = 1;
	let fibN = 0;
	for (let i = 2; i <= n; i++) { // n >= 2
		fibN = fib1 + fib0; // (n - 1) + (n - 2)
		fib0 = fib1;
		fib1 = fibN;
	}
	return fibN;
}
// console.log(fibonacciIterative(3));
// 递归求斐波那契数
function fibonacci(n) {
	if (n < 1) return 0;
	if (n <= 2) return 1;
	return fibonacci(n - 1) + fibonacci(n - 2);
}
// console.log(fibonacci(3));
// 记忆化斐波那契数（甚至 memo 就代表数列了）
function fibonacciMemoization(n) {
	const memo = [0, 1];
	const fibonacci = (n) => {
		if (memo[n] != null) return memo[n];
		return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
	};
	return fibonacci(n);
}
console.log(fibonacciMemoization(8));
