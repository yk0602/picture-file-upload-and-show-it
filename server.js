function start(route, handle){
	var http = require('http');
	var url = require('url');
	http.createServer(function(req, res){
		var data = '';
		var pathname = url.parse(req.url).pathname;
		console.log('Request for ' + pathname + ' received!');
		req.setEncoding('UTF-8');
		//将每次收到的小的数据块合并到data中
		req.addListener('data', function(chunk) {
			data += chunk;
			console.log('received chunk: ' + chunk + ' .');
		});
		//接收玩post数据后，交给路由处理函数
		req.addListener('end', function() {
			route(pathname, handle, res, data);
		});
	}).listen(8888, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:8888');
}
exports.start = start;
