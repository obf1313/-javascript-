/**
 * @description: 测试搜索
 * @author: cnn
 * @createTime: 2022/2/25 9:16
 **/
const { sequentialSearch, binarySearch, interpolationSearch } = require('./search');

const array = [1, 3, 4, 2, 8];
console.log('顺序搜索 -> 2：', sequentialSearch([1, 3, 4, 2, 8], 2));
console.log('二分搜索 -> 2：', binarySearch([1, 3, 4, 2, 8], 2));
console.log('内插搜索 -> 2：', interpolationSearch([1, 2, 3, 4, 8], 2));
