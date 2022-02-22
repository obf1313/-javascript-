/**
 * @description: 测试排序
 * @author: cnn
 * @createTime: 2022/2/22 9:36
 **/
const {
	bubbleSort, modifiedBubbleSort, selectionSort, insertionSort, mergeSort
} = require('./sort');

const array = [7, 5, 4, 6, 1, 2, 3];
console.log('原数组：', array);
const sortArray = bubbleSort(array);
console.log('冒泡排序后：', sortArray);
const modifiedBubbleSortArray = modifiedBubbleSort(array);
console.log('优化冒泡排序后：', modifiedBubbleSortArray);
const selectionSortArray = selectionSort(array);
console.log('选择排序后：', selectionSortArray);
const insertionSortArray = insertionSort(array);
console.log('插入排序后：', insertionSortArray);
const mergeSortArray = mergeSort(array);
console.log('归并排序后：', mergeSortArray);
