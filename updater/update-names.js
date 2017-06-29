/* Update names */

'use strict';

const Path = require('path');
const FileSystem = require('fs');
const Https = require('https');

const Showdown_Formats_URL = "https://raw.githubusercontent.com/Zarel/Pokemon-Showdown/master/config/formats.js";

const Names_File = Path.resolve(__dirname, "../resources/names.json");
const Names_File_Min = Path.resolve(__dirname, "../resources/names-min.js");

function updateNames(formatsData) {
	let names = {};
	let n = 0;

	try {
		names = require(Names_File);
	} catch (err) {
		console.log("Creating new names file...");
	}

	for (let format of formatsData) {
		if (!format.name) continue;
		let id = toId(format.name);
		if (!id) continue;
		names[id] = format.name;
		n++;
	}

	FileSystem.writeFileSync(Names_File_Min, "/*Formats*/ window.FormatNames = " + JSON.stringify(names) + ";");
	FileSystem.writeFileSync(Names_File, JSON.stringify(names, null, 4));

	console.log("DONE: Loaded " + n + " format names.");
}

exports.start = function () {
	console.log("Getting formats data...");
	mkdir(Path.resolve(__dirname, "../temp/"));
	Https.get(Showdown_Formats_URL, res => {
		let data = '';
		res.on('data', chunk => {
			data += chunk;
		});
		res.on('end', () => {
			console.log("GET: " + Showdown_Formats_URL);
			FileSystem.writeFileSync(Path.resolve(__dirname, "../temp/formats.js"), data);
			setTimeout(() => {
				updateNames(require(Path.resolve(__dirname, "../temp/formats.js")).Formats);
			}, 500);
		});
	}).on('error', e => {
		console.error(e);
	});
};
