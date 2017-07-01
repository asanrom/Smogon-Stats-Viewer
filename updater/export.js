/* Export usage data */

'use strict';

const Path = require('path');
const FileSystem = require('fs');


exports.start = function (month, formats_file, export_file) {
	let monthsList = require(Path.resolve(__dirname, "update-months.js")).check().list;
	if (monthsList.indexOf(month) >= 0) {
		let formats;
		try {
			formats = JSON.parse(FileSystem.readFileSync(formats_file).toString()).formats;
		} catch (err) {
			console.log("Invalid formats list: " + formats_file);
			console.log(err.message);
			console.log(err.stack);
			return;
		}
		console.log("Loading usage data...");
		let result = {};
		for (let format of formats) {
			let path = Path.resolve(__dirname, "..", "data", "months", month, "formats", toId(format.id), "" + format.cut, "pokedata.json");
			let data;
			try {
				data = JSON.parse(FileSystem.readFileSync(path).toString());
				console.log("LOAD: " + path);
			} catch (err) {
				console.log("Error: " + err.message);
				console.log("CANNOT LOAD: " + path);
				continue;
			}
			for (let pokeId in data) {
				let pokeData = {};

				pokeData.abilities = [];
				for (let ability of data[pokeId].abilities) {
					if (ability.name === "Other") continue;
					pokeData.abilities.push(toId(ability.name));
				}

				pokeData.moves = [];
				for (let move of data[pokeId].moves) {
					if (move.name === "Other") continue;
					pokeData.moves.push(toId(move.name));
				}

				pokeData.items = [];
				for (let item of data[pokeId].items) {
					if (item.name === "Other") continue;
					if (item.name === "Nothing") {
						pokeData.items.push("");
					} else {
						pokeData.items.push(toId(item.name));
					}
				}

				pokeData.spreads = [];
				for (let spread of data[pokeId].spreads) {
					if (spread.nature === "Other") continue;
					pokeData.spreads.push({
						nature: spread.nature,
						hp: spread.evs.hp,
						atk: spread.evs.atk,
						def: spread.evs.def,
						spa: spread.evs.spa,
						spd: spread.evs.spd,
						spe: spread.evs.spd,
					});
				}

				result[pokeId] = pokeData;
			}
		}
		FileSystem.writeFileSync(export_file, JSON.stringify(result));
		console.log("OUTPUT SAVED: " + export_file);
	} else {
		console.log("Month not found: " + month);
	}
};