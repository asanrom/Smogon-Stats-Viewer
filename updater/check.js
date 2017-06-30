/* Check stats files */

'use strict';

const Path = require('path');

let currMonth = -1;
let monthsList = [];

function checkNext() {
	currMonth++;
	if (currMonth >= monthsList.length) {
		console.log("DONE: Check completed.");
		require(Path.resolve(__dirname, "update-months.js")).checkAndUpdate();
		return;
	}
	require(Path.resolve(__dirname, "load-month.js")).loadMonth(monthsList[currMonth], err => {
		if (err) {
			console.log("Error parsing month: " + monthsList[currMonth]);
		} else {
			console.log("DONE: Parsed month data for " + monthsList[currMonth]);
		}
		checkNext();
	});
}

exports.start = function () {
	console.log("Checking usage stats files...");
	monthsList = require(Path.resolve(__dirname, "update-months.js")).check().list;
	if (monthsList.length === 0) {
		console.log("DONE: Nothing to check.");
		require(Path.resolve(__dirname, "update-months.js")).checkAndUpdate();
	} else {
		checkNext();
	}
};
