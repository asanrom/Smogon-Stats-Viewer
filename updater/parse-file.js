/* File Parsing */

'use strict';

function parsePercent(str) {
	return parseFloat((str || "").replace("%", "").trim());
}

function addLeftZero(num, nz) {
	let str = num.toString();
	while (str.length < nz) str = "0" + str;
	return str;
}

function getMonthId(y, m) {
	return (addLeftZero(y, 4) + "-" + addLeftZero(m, 2));
}

exports.parseList = function (str) {
	let lines = str.split('\n');
	let files = [];
	let startStr = '<a href="';
	for (let line of lines) {
		if (line.substr(0, startStr.length) === startStr) {
			let spl = line.split('"');
			if (spl[1]) {
				files.push(spl[1]);
			}
		}
	}
	return files;
};

exports.parseMonthsList = function (str) {
	let files = exports.parseList(str);
	let months = [];
	for (let file of files) {
		let spl = file.replace("/", "").split('-');
		let year = parseInt(spl[0]);
		let month = parseInt(spl[1]);
		if (!isNaN(year) && !isNaN(year)) {
			months.push({y: year, m: month, id: getMonthId(year, month)});
		}
	}
	return {"months": months};
};

exports.parseFormatsList = function (str) {
	let files = exports.parseList(str);
	let formats = {};
	for (let file of files) {
		if ((/.*\.txt$/i).test(file)) {
			let spl = file.split('.')[0].split('-');
			let format = toId(spl[0]);
			let cutline = parseInt(spl[1]);
			if (format && !isNaN(cutline)) {
				if (!formats[format]) {
					formats[format] = {
						cuts: [],
						dcut: cutline,
					};
				}
				if (formats[format].cuts.indexOf(cutline) === -1) {
					formats[format].cuts.push(cutline);
				}
				if (cutline > 1500 && (formats[format].dcut <= 1500 || formats[format].dcut > cutline)) {
					formats[format].dcut = cutline;
				}
			}
		}
	}
	return formats;
};

exports.parsePokemonRanking = function (str) {
	let ranking = {
		battles: 0,
		avg: 0,
		pokemon: [],
	};

	let lines = str.split('\n');
	for (let line of lines) {
		line = line.trim();
		if (line.charAt(0) === "+") continue;
		if (line.charAt(0) === "|") {
			let spl = line.split("|");
			let rank = parseInt((spl[1] || "").trim());
			if (!isNaN(rank) && rank > 0) {
				let name = (spl[2] || "").trim();
				let usage = parsePercent(spl[3]);
				let raw = parseInt((spl[4] || "").trim());
				let raw_p = parsePercent(spl[5]);
				let real = parseInt((spl[6] || "").trim());
				let real_p = parsePercent(spl[7]);
				ranking.pokemon.push({
					name: name,
					usage: usage,
					raw: raw,
					rawp: raw_p,
					real: real,
					realp: real_p,
				});
			}
		} else {
			let spl = line.split(":");
			let id = toId(spl[0]);
			let val = (spl[1] || "").trim();
			if (id === "totalbattles") {
				ranking.battles = parseInt(val);
			} else if (id === "avgweightteam") {
				ranking.avg = parseFloat(val);
			}
		}
	}

	return ranking;
};

exports.parsePokemonLeadsInfo = function (str) {
	let leads = {};

	let lines = str.split('\n');
	for (let line of lines) {
		line = line.trim();
		if (line.charAt(0) === "+") continue;
		if (line.charAt(0) === "|") {
			let spl = line.split("|");
			let rank = parseInt((spl[1] || "").trim());
			if (!isNaN(rank) && rank > 0) {
				let poke = toId(spl[2]);
				let usage = parsePercent(spl[3]);
				let raw = parseInt((spl[4] || "").trim());
				let raw_p = parsePercent(spl[5]);
				leads[poke] = {
					usage: usage,
					raw: raw,
					rawp: raw_p,
				};
			}
		}
	}

	return leads;
};

exports.parsePokemonUsageData = function (str, leadsInfo, done) {
	let pokes = str.split(" +----------------------------------------+ \n +----------------------------------------+ \n");

	for (let pokeStr of pokes) {
		let pokemon = {
			id: "",
			raw: 0,
			avg: 0,
			vc: 0,
			abilities: [],
			moves: [],
			items: [],
			spreads: [],
			teammates: [],
			counters: [],
			lead: {usage: 0, raw: 0, rawp: 0},
		};

		let sections = pokeStr.split(' +----------------------------------------+ ');
		if (!sections[0]) {
			sections.shift();
		}

		pokemon.id = toId(sections[0]);

		if (sections[1]) {
			let lines = sections[1].split('\n');
			for (let line of lines) {
				if (line.indexOf(":") >= 0) {
					let spl = line.split(':');
					let id = toId(spl[0]);
					let val = (spl[1] || "").trim();
					if (id === "rawcount") {
						pokemon.raw = parseInt(val);
					} else if (id === "avgweight") {
						pokemon.avg = parseFloat(val);
					} else if (id === "viabilityceiling") {
						pokemon.vc = parseInt(val);
					}
				}
			}
		}

		for (let k = 2; k < sections.length; k++) {
			let lines = sections[k].split('\n');
			let subject = toId(lines[1] || "");
			if (subject === "abilities") {
				for (let j = 2; j < lines.length; j++) {
					let spl = lines[j].split('|');
					if (spl[1]) {
						spl = spl[1].trim().split(" ");
						let percent = parsePercent(spl.pop());
						let name = spl.join(" ").trim();
						if (toId(name)) {
							pokemon.abilities.push({name: name, usage: percent});
						}
					}
				}
			} else if (subject === "moves") {
				for (let j = 2; j < lines.length; j++) {
					let spl = lines[j].split('|');
					if (spl[1]) {
						spl = spl[1].trim().split(" ");
						let percent = parsePercent(spl.pop());
						let name = spl.join(" ").trim();
						if (toId(name)) {
							pokemon.moves.push({name: name, usage: percent});
						}
					}
				}
			} else if (subject === "items") {
				for (let j = 2; j < lines.length; j++) {
					let spl = lines[j].split('|');
					if (spl[1]) {
						spl = spl[1].trim().split(" ");
						let percent = parsePercent(spl.pop());
						let name = spl.join(" ").trim();
						if (toId(name)) {
							pokemon.items.push({name: name, usage: percent});
						}
					}
				}
			} else if (subject === "spreads") {
				for (let j = 2; j < lines.length; j++) {
					let spl = lines[j].split('|');
					if (spl[1]) {
						spl = spl[1].trim().split(" ");
						let percent = parsePercent(spl.pop());
						let spread = spl.join(" ").trim();
						spl = spread.split(':');
						let nature = spl[0].trim();
						spl = (spl[1] || "").split("/");
						let stats = {
							hp: parseInt(spl[0] || ""),
							atk: parseInt(spl[1] || ""),
							def: parseInt(spl[2] || ""),
							spa: parseInt(spl[3] || ""),
							spd: parseInt(spl[4] || ""),
							spe: parseInt(spl[5] || ""),
						};
						pokemon.spreads.push({nature: nature, evs: stats, usage: percent});
					}
				}
			} else if (subject === "teammates") {
				for (let j = 2; j < lines.length; j++) {
					let spl = lines[j].split('|');
					if (spl[1]) {
						spl = spl[1].trim().split(" ");
						let percent = parsePercent(spl.pop());
						let name = spl.join(" ").trim();
						if (toId(name)) {
							pokemon.teammates.push({name: name, usage: percent});
						}
					}
				}
			} else if (subject === "checksandcounters") {
				for (let j = 2; j < lines.length; j += 2) {
					let spl = lines[j].split('|');
					let spl2 = (lines[j + 1] || "").split('|');
					if (spl[1] && spl2[1]) {
						spl = spl[1].split('(')[0].trim().split(" ");
						let percent = parsePercent(spl.pop());
						let name = spl.join(" ").trim();
						if (toId(name)) {
							spl2 = spl2[1].replace("(", "").replace(")", "").trim().split('/');
							let ko = parsePercent(spl2[0].trim().split(" ")[0]);
							let sw = parsePercent((spl2[1] || "").trim().split(" ")[0]);
							pokemon.counters.push({name: name, eff: percent, ko: ko, sw: sw});
						}
					}
				}
			}
		}

		if (leadsInfo[pokemon.id]) {
			pokemon.lead = leadsInfo[pokemon.id];
		}

		done(pokemon);
	}
};

