function outer() {
	console.log(variable);//外部无法访问内部函数的变量
	function inner() {
		var variable = 10;
	}
}

outer();