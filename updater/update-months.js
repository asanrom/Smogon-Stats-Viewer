/* Update months */

'use strict';

const Path = require('path');
const FileSystem = require('fs');
const Http = require('https');
const Parser = require(Path.resolve(__dirname, "parse-file.js"));

const Smogon_Stats_URL = "https://www.smogon.com/stats/";
const Months_File = Path.resolve(__dirname, "../data/months-available.json");

exports.start = function () {
	console.log("Getting months data...");
	Http.get(Smogon_Stats_URL, res => {
		let data = '';
		res.on('data', chunk => {
			data += chunk;
		});
		res.on('end', () => {
			console.log("GET: " + Smogon_Stats_URL);
			let months = Parser.parseMonthsList(data);
			FileSystem.writeFileSync(Months_File, JSON.stringify(months));
			console.log("DONE: Loaded months list.");
		});
	}).on('error', e => {
		console.error(e);
	});
};

exports.check = function () {
	let months = {list: []};
	let files = FileSystem.readdirSync(Path.resolve(__dirname, "../data/months/"));
	for (let file of files) {
		if ((/[0-9][0-9][0-9][0-9]-[0-9][0-9]/).test(file)) {
			months.list.push(file);
		}
	}
	return months;
};

exports.checkAndUpdate = function () {
	let months = exports.check();
	FileSystem.writeFileSync(Path.resolve(__dirname, "../data/months.json"), JSON.stringify(months));
};
