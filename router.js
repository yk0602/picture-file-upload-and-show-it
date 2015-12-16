function route(pathname, handle, res, req){
	console.log('About to route a request for ' + pathname);
	if(typeof handle[pathname] === 'function'){
		return handle[pathname](res, req);
	}
	else{
		console.log('No request handler found for ' + pathname);
		return '404 Not found!';
		// res.writeHead(404, '{Content-Type : text/plain}');
		// res.write('404 Not found!');
		// res.end();
	}
}
exports.route = route;
