/**
 * @description: 使用 Dictionary 类
 * @author: cnn
 * @createTime: 2022/2/10 17:18
 **/
const Dictionary = require('./Dictionary');

const dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandlaf@email.com');
dictionary.set('Gandalf1', 'gandlaf1@email.com');
dictionary.set('Gandalf2', 'gandlaf2@email.com');
console.log(dictionary.hasKey('Gandalf'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Gandalf1'));
dictionary.remove('Gandalf1');
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.keyValues());
dictionary.forEach((k, v) => {
	console.log('forEach:', `key${k}`, `value${v}`)
});
