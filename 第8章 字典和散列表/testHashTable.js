/**
 * @description: 使用散列表
 * @author: cnn
 * @createTime: 2022/2/11 9:34
 **/
const HashTable = require('./HashTable');
const { djb2HashCode } = require('../utils');

const hash = new HashTable();
hash.put('misaka', 'misaka@email.com');
hash.put('mhtaka', 'mhtaka@email.com'); // 和上面就会重复啊
hash.put('mikoto', 'mikoto@email.com');
hash.put('naruto', 'naruto@email.com');
console.log(hash.hashCode('misaka') + ' - misaka');
console.log(hash.hashCode('mhtaka') + ' - mhtaka');
console.log(hash.hashCode('mikoto') + ' - mikoto');
console.log(hash.hashCode('naruto') + ' - naruto');
console.log(hash.get('misaka')); // 看吧就重复了吧，取到的就是 mhtaka@email.com
hash.remove('misaka');
console.log(hash.get('misaka'));
// 测试 djb2 散列函数
console.log('djb2HashCode(misaka)', djb2HashCode('misaka'));
console.log('djb2HashCode(mhtaka)', djb2HashCode('mhtaka'));
