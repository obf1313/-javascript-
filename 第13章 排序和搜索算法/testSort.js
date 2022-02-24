/**
 * @description: 测试排序
 * @author: cnn
 * @createTime: 2022/2/22 9:36
 **/
const {
	bubbleSort, modifiedBubbleSort, selectionSort, insertionSort, mergeSort,
	quickSort, countingSort, bucketSort, radixSort
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
const quickSortArray = quickSort(array);
console.log('快速排序后：', quickSortArray);
const countingSortArray = countingSort(array);
console.log('计数排序后：', countingSortArray);
const bucketSortArray = bucketSort([0.1, 0.2, 0.3, 0.4, 0.5, 0.66]);
console.log('桶排序后：', bucketSortArray);
const radixSortArray = radixSort([456, 789, 123, 1, 32, 4, 243, 321, 42, 90, 10, 999]);
console.log('基数排序后：', radixSortArray);
