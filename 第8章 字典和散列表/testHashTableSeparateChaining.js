/**
 * @description: 使用分离链接散列表
 * @author: cnn
 * @createTime: 2022/2/11 10:10
 **/
const HashTableSeparateChaining = require('./HashTableSeparateChaining');

const hash = new HashTableSeparateChaining();
hash.put('misaka', 'misaka@email.com');
hash.put('mhtaka', 'mhtaka@email.com');
hash.put('mikoto', 'mikoto@email.com');
hash.put('naruto', 'naruto@email.com');
console.log(hash.get('misaka'));
console.log(hash.get('mhtaka'));
hash.remove('misaka');
console.log(hash.get('misaka'));
console.log(hash.get('mhtaka'));
