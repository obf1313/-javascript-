/**
 * @description: 算法设计与技巧（回溯算法）
 * @author: cnn
 * @createTime: 2022/3/2 9:24
 **/
/**
 * 迷宫老鼠问题
**/
function ratInAmaze(maze) {
	const solution = [];
	for (let i = 0; i < maze.length; i++) {
		solution[i] = [];
		for (let j = 0; j < maze[i].length; j++) {
			solution[i][j] = 0;
		}
	}
	if (findPath(maze, 0, 0, solution)) {
		return solution;
	}
	return 'NO PATH FOUND';
}
function findPath(maze, x, y, solution) {
	const n = maze.length;
	if (x === n - 1 && y === n - 1) {
		solution[x][y] = 1;
		return true;
	}
	if (isSafe(maze, x, y)) {
		solution[x][y] = 1;
		// 垂直移动
		if (findPath(maze, x + 1, y, solution)) {
			return true;
		}
		// 水平移动
		if (findPath(maze, x, y + 1, solution)) {
			return true;
		}
		solution[x][y] = 0;
		return false;
	}
	return false;
}
function isSafe(maze, x, y) {
	const n = maze.length;
	if (x >= 0 && y>= 0 && x < n && y < n && maze[x][y] !== 0) {
		return true;
	}
	return false;
}
const maze = [
	[1, 0, 0, 0],
	[1, 1, 1, 1],
	[0, 0, 1, 0],
	[0, 1, 1, 1]
];
// console.log(ratInAmaze(maze));

/**
 * 数独解题器
**/
const UNASSIGNED= 0;
function sudokuSolver(matrix) {
	if (solveSudoku(matrix) === true) {
		return matrix;
	}
	return '问题无解';
}
function solveSudoku(matrix) {
	let row = 0;
	let col = 0;
	let checkBlankSpace = false;
	for (row = 0; row < matrix.length; row++) {
		for (col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] === UNASSIGNED) {
				checkBlankSpace = true;
				break;
			}
		}
		if (checkBlankSpace === true) {
			break;
		}
	}
	if (checkBlankSpace === false) {
		return true;
	}
	for (let num = 1; num <= 9; num++) {
		if (isSudoSafe(matrix, row, col, num)) {
			matrix[row][col] = num;
			if (solveSudoku(matrix)) {
				return true;
			}
			matrix[row][col] = UNASSIGNED;
		}
	}
	return false;
}
function isSudoSafe(matrix, row, col, num) {
	return !usedInRow(matrix, row, num) && !usedInCol(matrix, col, num) && !usedInBox(matrix, row - (row % 3), col - (col % 3), num);
}
function usedInRow(matrix, row, num) {
	for (let col = 0; col < matrix.length; col++) {
		if (matrix[row][col] === num) {
			return true;
		}
	}
	return false;
}
function usedInCol(matrix, col, num) {
	for (let row = 0; row < matrix.length; row++) {
		if (matrix[row][col] === num) {
			return true;
		}
	}
	return false;
}
function usedInBox(matrix, boxStartRow, boxStartCol, num) {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (matrix[row + boxStartRow][col + boxStartCol] === num) {
				return true;
			}
		}
	}
	return false;
}
const sudokuGrid = [
	[5, 3, 0, 0, 7, 0, 0, 0, 0],
	[6, 0, 0, 1, 9, 5, 0, 0, 0],
	[0, 9, 8, 0, 0, 0, 0, 6, 0],
	[8, 0, 0, 0, 6, 0, 0, 0, 3],
	[4, 0, 0, 8, 0, 3, 0, 0, 1],
	[7, 0, 0, 0, 2, 0, 0, 0, 6],
	[0, 6, 0, 0, 0, 0, 2, 8, 0],
	[0, 0, 0, 4, 1, 9, 0, 0, 5],
	[0, 0, 0, 0, 8, 0, 0, 7, 9]
];
console.log(sudokuSolver(sudokuGrid));
