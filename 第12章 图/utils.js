/**
 * @description: 图的遍历所需的工具方法
 * @author: cnn
 * @createTime: 2022/2/17 10:30
 **/
const Colors = {
	WHITE: 0,
	GREY: 1,
	BLACK: 2
};
// 初始化颜色
const initializeColor = (vertices) => {
	const color = {};
	for (let i = 0; i < vertices.length; i++) {
		color[vertices[i]] = Colors.WHITE;
	}
	return color;
}
module.exports = { Colors, initializeColor };
