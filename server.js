/* Mini Server */

'use strict';

const Path = require('path');
const Static = require('node-static');
const Http = require('http');
const Server = new Static.Server(Path.resolve(__dirname));
exports.start = function (port) {
	if (isNaN(port)) {
		console.log("Invalid port.");
		return;
	}

	let http = new Http.Server((request, response) => {
		request.addListener('end', function () {
			Server.serve(request, response);
		}).resume();
	});

	http.listen(port, () => {
		console.log("Test your project at http://localhost:" + port + "/");
	});
};
