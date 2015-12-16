function start(route, handle){
	var http = require('http');
	var url = require('url');
	http.createServer(function(req, res){
		var pathname = url.parse(req.url).pathname;
		console.log('Request for ' + pathname + ' received!');
		route(pathname, handle, res, req);
	}).listen(8888, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:8888');
}
exports.start = start;
