/* Updater Main file */

'use strict';

const Path = require('path');
const FileSystem = require('fs');
const Program = require('commander');

const Package = require(Path.resolve(__dirname, 'package.json'));

/* Globals */

global.toId = function (str) {
	if (!str) return '';
	return ('' + str).toLowerCase().replace(/[^a-z0-9]/g, '');
};

global.mkdir = function (path) {
	if (!FileSystem.existsSync(path)) {
		try {
			FileSystem.mkdirSync(path);
		} catch (err) {
			throw err;
		}
	}
};

if (!Object.merge) {
	Object.merge = function (object, source) {
		if (!object) object = {};
		if (!source) return object;
		for (let key in source) object[key] = source[key];
		return object;
	};
}

if (!Object.values) {
	Object.values = function (object) {
		let values = [];
		for (let key in object) values.push(object[key]);
		return values;
	};
}

mkdir(Path.resolve(__dirname, "data/"));
mkdir(Path.resolve(__dirname, "data/months/"));

/* Version and usage */

Program.version(Package.version).usage('[options] <command>');

Program.arguments('<command>').action(command => {
	let cmds = {
		"update-names": 1,
	};
	if (!(command in cmds)) {
		Program.outputHelp(txt => txt);
	}
});

/* Commands */

Program.command('update-names')
	.description('update format names')
	.action(() => {
		require(Path.resolve(__dirname, "updater", "update-names.js")).start();
	});

Program.command('update-months')
	.description('update months list')
	.action(() => {
		require(Path.resolve(__dirname, "updater", "update-months.js")).start();
	});

Program.command('update')
	.description('update months list and format names')
	.action(() => {
		require(Path.resolve(__dirname, "updater", "update-names.js")).start();
		require(Path.resolve(__dirname, "updater", "update-months.js")).start();
	});

Program.command('load <month>')
	.description('loads usage stats of a month')
	.action(month => {
		require(Path.resolve(__dirname, "updater", "load-month.js")).start(month);
	});

Program.command('upgrade <months|all>')
	.description('loads usage stats for last months')
	.action(param => {
		require(Path.resolve(__dirname, "updater", "upgrade.js")).start(param);
	});

Program.command('check')
	.description('checks downloaded stats')
	.action(() => {
		require(Path.resolve(__dirname, "updater", "update-months.js")).checkAndUpdate();
	});

Program.command('test <port>')
	.description('creates a http server to test the project')
	.action(port => {
		require(Path.resolve(__dirname, "server.js")).start(parseInt(port));
	});


/* Parse and Start */

Program.parse(process.argv);

if (!process.argv.slice(2).length) {
	Program.outputHelp(txt => txt);
}
