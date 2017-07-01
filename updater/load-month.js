/* Months loader */

'use strict';

const Path = require('path');
const FileSystem = require('fs');
const Http = require('https');
const Parser = require(Path.resolve(__dirname, "parse-file.js"));
const Loader = require(Path.resolve(__dirname, "load-format.js"));

const Smogon_Stats_URL = "https://www.smogon.com/stats/";

function wget(url, callback) {
	Http.get(url, res => {
		let data = '';
		res.on('data', chunk => {
			data += chunk;
		});
		res.on('end', () => {
			let statusCode = res.statusCode;
			if (statusCode !== 200) {
				console.log('Request Failed (' + url + ') / Status Code: ' + statusCode);
				return callback(null, new Error('Request Failed.\nStatus Code: ' + statusCode));
			}
			console.log("GET: " + url);
			callback(data);
		});
	}).on('error', e => {
		console.error(e);
		callback(null, e);
	});
}

exports.loadMonth = function (month, callback) {
	if (!callback) callback = function () {};
	console.log("Parsing month: " + month);
	wget(Smogon_Stats_URL + month + "/", (data, err) => {
		if (err) {
			return callback(err);
		}
		data = Parser.parseFormatsList(data);
		mkdir(Path.resolve(__dirname, "../data/months/", month));
		mkdir(Path.resolve(__dirname, "../data/months/", month, "formats"));
		FileSystem.writeFileSync(Path.resolve(__dirname, "../data/months/", month, "formats.json"), JSON.stringify(data));
		let loader = new Loader(month, data, callback);
		loader.start();
	});
};

exports.checkMonth = function (month, callback) {
	if (!callback) callback = function () {};
	console.log("Parsing month: " + month);
	let data;
	try {
		data = require(Path.resolve(__dirname, "../data/months/", month, "formats.json"));
	} catch (err) {
		return callback(err);
	}
	let loader = new Loader(month, data, callback);
	loader.start();
};

exports.start = function (month) {
	if (!month) {
		console.log("Invalid month.");
		return;
	}

	let months = require(Path.resolve(__dirname, "../data/months-available.json")).months;
	let exits = false;
	for (let m of months) {
		if (m.id === month) {
			exits = true;
			break;
		}
	}
	if (!exits) {
		console.log("Month not found: " + month);
		return;
	}

	exports.loadMonth(month, err => {
		if (err) {
			console.log("Error parsing month: " + month);
		} else {
			console.log("DONE: Parsed month data for " + month);
		}
	});
};

