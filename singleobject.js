function Hello(){
	var name;
	this.setName = function(thyname){
		name = thyname;
	}
	
	this.sayHello = function(){
		console.log('Hello ' + name);
	}
};

//exports.Hello = Hello; //加载模块：require('./singleobject').Hello
module.exports = Hello; //加载模块：require('./singleobject')