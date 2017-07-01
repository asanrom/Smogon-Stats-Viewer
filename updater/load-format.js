/* Formats loader */

'use strict';

const Path = require('path');
const FileSystem = require('fs');
const Http = require('https');
const Parser = require(Path.resolve(__dirname, "parse-file.js"));

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

class FormatLoader {
	constructor(month, id, format, callback) {
		this.month = month;
		this.format = id;
		this.cuts = format.cuts;
		this.length = this.cuts.length;
		this.callback = callback;

		this.path = Path.resolve(__dirname, "../data/months/" + this.month + "/formats/" + this.format + "/");
		mkdir(this.path);

		this.curr = -1;
	}

	start() {
		this.curr = -1;
		this.next();
	}

	next() {
		this.curr++;
		if (this.curr < this.length) {
			mkdir(Path.resolve(this.path, "" + this.cuts[this.curr]));
			if (FileSystem.existsSync(Path.resolve(this.path, "" + this.cuts[this.curr], "pokedata.json"))) {
				let aux = FileSystem.readFileSync(Path.resolve(this.path, "" + this.cuts[this.curr], "pokedata.json")).toString();
				if (aux.length > 2) {
					console.log("Already parsed: " + this.format + " / cutline: " + this.cuts[this.curr]);
					this.next();
					return;
				}
			}
			console.log("Downloading format: " + this.format + " / cutline: " + this.cuts[this.curr]);
			this.loadCutline(this.cuts[this.curr], function (ranks, leads, moveset, err) {
				if (ranks) {
					ranks = Parser.parsePokemonRanking(ranks);
					FileSystem.writeFileSync(Path.resolve(this.path, "" + this.cuts[this.curr], "ranking.json"), JSON.stringify(ranks));
				}

				if (err) {
					FileSystem.writeFileSync(Path.resolve(this.path, "" + this.cuts[this.curr], "pokedata.json"), JSON.stringify({}));
					console.log("Error downloading format: " + this.format + " / cutline: " + this.cuts[this.curr]);
					this.next();
					return;
				}
				console.log("Parsing format: " + this.format + " / cutline: " + this.cuts[this.curr]);

				if (leads !== null) {
					leads = Parser.parsePokemonLeadsInfo(leads);
				} else {
					leads = {};
				}

				let pokeData = {};

				Parser.parsePokemonUsageData(moveset, leads, pokemon => {
					let poke = pokemon.id;
					delete pokemon.id;
					pokeData[poke] = pokemon;
				});

				FileSystem.writeFileSync(Path.resolve(this.path, "" + this.cuts[this.curr], "pokedata.json"), JSON.stringify(pokeData));

				this.next();
			}.bind(this));
		} else {
			this.end();
		}
	}

	loadCutline(cutline, callback) {
		wget(Smogon_Stats_URL + this.month + "/" + this.format + "-" + cutline + ".txt", (data1, err1) => {
			wget(Smogon_Stats_URL + this.month + "/leads/" + this.format + "-" + cutline + ".txt", (data2, err2) => {
				wget(Smogon_Stats_URL + this.month + "/moveset/" + this.format + "-" + cutline + ".txt", (data3, err3) => {
					if (err1 || err2 || err3) {
						if (!err1) {
							if (!err2) {
								return callback(data1, data2, null);
							}
						} else {
							return callback(null, null, null, err1 || err2 || err3);
						}
					}
					return callback(data1, data2, data3);
				});
			});
		});
	}

	end() {
		this.callback();
	}
}

class FormatsLoader {
	constructor(month, formats, callback) {
		this.month = month;
		this.formats = formats;
		this.keys = Object.keys(formats);
		this.length = this.keys.length;
		this.callback = callback;

		this.curr = -1;
		this.currFormat = null;
	}

	start() {
		this.curr = -1;
		this.next();
	}

	next() {
		this.curr++;
		if (this.curr < this.length) {
			let format = this.keys[this.curr];
			this.currFormat = new FormatLoader(this.month, format, this.formats[format], function () {
				this.next();
			}.bind(this));
			this.currFormat.start();
		} else {
			this.end();
		}
	}

	end() {
		this.callback();
	}
}

module.exports = FormatsLoader;
