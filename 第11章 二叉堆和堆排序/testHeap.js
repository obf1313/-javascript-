/**
 * @description: 堆测试
 * @author: cnn
 * @createTime: 2022/2/16 13:27
 **/
const MinHeap = require('./MinHeap');
const MaxHeap = require('./MaxHeap');

/**
 * 最小堆测试
**/
const heap = new MinHeap();
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(1);
// console.log(heap);
// console.log('size:', heap.size());
// console.log('isEmpty:', heap.isEmpty());
// console.log('min value:', heap.findMinimum());

const heap1 = new MinHeap();
for (let i = 1; i < 10; i++) {
	heap1.insert(i);
}
console.log('min:', heap1.extract());
console.log('heap1:', heap1);

/**
 * 最大堆测试
**/
const maxHeap = new MaxHeap();
maxHeap.insert(2);
maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(5);
maxHeap.insert(1);
console.log('size:', maxHeap.size());
console.log('isEmpty:', maxHeap.isEmpty());
console.log('min value:', maxHeap.findMinimum());


