var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
function start(res){
	console.log('Request handler \'start\' was called.');
	var body = '<html>'+
					'<head>'+
						'<meta http-equiv="Content-Type" content="text/html; '+'charset=UTF-8" />'+
					'</head>'+
					'<body>'+
						'<form action="/upload" method="post" enctype="multipart/form-data">'+
							'<input type="file" name="upload"/>'+
							'<input type="submit" value="Upload file" />'+
						'</form>'+
					'</body>'+
				'</html>';
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(body);
	res.end();
}

function upload(res, req){
	console.log('Request handler \'upload\' was called');
	var form = new formidable.IncomingForm();
	console.log('start to parse');
	form.parse(req, function(err, fields, files) {
		console.log('parse over');
		fs.renameSync(files.upload.path, 'temp/test.png');
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write('received image:<br/>');
		res.write('<image src="/show" />');
		res.end();
	});
}

function show(res, data) {
	console.log('Request handler \'show\' was called.');
	fs.readFile('temp/test.png', 'binary', function(err, file) {
		if(err) {
			res.writeHead(500, {'Content-Type' : 'text/plain'});
			res.write(err + '\n');
			res.end();
		} else {
			res.writeHead(200, {"Content-Type": "image/png"});
			res.write(file, 'binary');
			res.end();
		}
	});
}
exports.start = start;
exports.upload = upload;
exports.show = show;