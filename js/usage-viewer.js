/* Usage viewrer */

function getJsonFromUrl() {
	var query = location.search.substr(1);
	var result = {};
	query.split("&").forEach(function(part) {
		var item = part.split("=");
		result[item[0]] = decodeURIComponent(item[1]);
	});
	return result;
}

window.UsageViewer = {
	args: {},
	months: [],
	month: "",
	smonth: "",
	formats: {},
	sformats: {},
	format: "",
	cutline: null,
	poke: null,
	stats: {},
	pokedata: null,
	init: function () {
		NavigationBar.setLoading();
		this.args = getJsonFromUrl();
		
		if (this.args['nbar'] === 'collapsed') {
			NavigationBar.hide();
		}
		
		var date = new Date();
		
		Tools.wget('./data/months.json?date=' + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(), function (data) {
			if (typeof data === "string") data = JSON.parse(data);
			this.months = data.list;
			NavigationBar.setMonths(this.months);
			this.month = this.months[this.months.length - 1];
			if (this.args['month'] && this.months.indexOf(this.args['month']) >= 0) {
				this.month = this.args['month'];
			}
			this.smonth = this.month;
			NavigationBar.setSelectedMonth(this.month);
			this.loadMonth(function () {
				this.loadPage(function () {
					NavigationBar.setLoading(false);
				}, this.args);
			}.bind(this), this.args);
		}.bind(this));
		
	},

	loadMonth: function (callback, args) {
		Tools.wget('./data/months/' + this.month + '/formats.json', function (data) {
			if (typeof data === "string") data = JSON.parse(data);
			this.formats = data;
			this.sformats = data;
			NavigationBar.setFormats(this.formats);
			if (args && args['format']) {
				this.format = toId(args['format']);
			}
			if (!this.format || !this.formats[this.format]) this.format = "gen7ou";
			if (!this.formats[this.format]) {
				for (var k in this.formats) {
					this.format = k;
					break;
				}
			}
			NavigationBar.setSelectedFormat(this.format);
			NavigationBar.setCutlines(this.formats[this.format]);
			if (args && args['cut']) {
				this.cutline = parseInt(args['cut']);
			}
			if (this.cutline === null || this.formats[this.format].cuts.indexOf(this.cutline) === -1) {
				this.cutline = this.formats[this.format].dcut;
			}
			NavigationBar.setSelectedCutline(this.cutline);
			
			return callback();
		}.bind(this));
	},
	
	loadPage: function (callback, args) {
		var url = "./data/months/" + this.month + "/formats/" + this.format + "/" + this.cutline + "/" + "ranking.json";
		Tools.wget(url, function (data) {
			if (typeof data === "string") data = JSON.parse(data);
			this.stats = data;
			if (args && args['pokemon']) {
				this.poke = toId(args['pokemon']);
			}
			if (this.poke !== null) {
				this.loadPokemonData(function () {
					this.showPokemonDetail();
					return callback();
				}.bind(this));
			} else {
				this.showPokemonList();
				return callback();
			}
		}.bind(this));
	},
	
	loadPokemonData: function (callback) {
		var url = "./data/months/" + this.month + "/formats/" + this.format + "/" + this.cutline + "/" + "pokedata.json";
		Tools.wget(url, function (data) {
			if (typeof data === "string") data = JSON.parse(data);
			this.pokedata = data;
			return callback();
		}.bind(this));
	},
	
	reloadPage: function (month, format, cutline, poke, callback) {
		if (month && this.months.indexOf(month) == -1) {
			month = this.months[this.months.length - 1];
		}
		if (month && month !== this.month) {
			this.month = month;
			this.smonth = month;
			NavigationBar.setSelectedMonth(this.month);
			Tools.wget('./data/months/' + this.month + '/formats.json', function (data) {
				if (typeof data === "string") data = JSON.parse(data);
				this.formats = data;
				this.sformats = data;
				NavigationBar.setFormats(this.formats);
				if (format) {
					this.format = format;
				}
				if (!this.format || !this.formats[this.format]) this.format = "gen7ou";
				if (!this.formats[this.format]) {
					for (var k in this.formats) {
						this.format = k;
						break;
					}
				}
				NavigationBar.setSelectedFormat(this.format);
				NavigationBar.setCutlines(this.formats[this.format]);
				if (cutline !== null) {
					this.cutline = cutline;
				}
				if (this.cutline === null || this.formats[this.format].cuts.indexOf(this.cutline) === -1) {
					this.cutline = this.formats[this.format].dcut;
				}
				NavigationBar.setSelectedCutline(this.cutline);
				if (poke || poke === null) {
					this.poke = poke;
				}
				this.pokedata = null;
				this.loadPage(function () {
					return callback();
				});
			}.bind(this));
		} else if (format && (format !== this.format || month === false)) {
			this.format = format;
			if (!this.format || !this.formats[this.format]) this.format = "gen7ou";
			if (!this.formats[this.format]) {
				for (var k in this.formats) {
					this.format = k;
					break;
				}
			}
			NavigationBar.setSelectedFormat(this.format);
			NavigationBar.setCutlines(this.formats[this.format]);
			if (cutline !== null) {
				this.cutline = cutline;
			}
			if (this.cutline === null || this.formats[this.format].cuts.indexOf(this.cutline) === -1) {
				this.cutline = this.formats[this.format].dcut;
			}
			NavigationBar.setSelectedCutline(this.cutline);
			if (poke || poke === null) {
				this.poke = poke;
			}
			this.pokedata = null;
			this.loadPage(function () {
				return callback();
			});
		} else if (cutline !== null && cutline !== this.cutline) {
			this.cutline = cutline;
			if (this.cutline === null || this.formats[this.format].cuts.indexOf(this.cutline) === -1) {
				this.cutline = this.formats[this.format].dcut;
			}
			NavigationBar.setSelectedCutline(this.cutline);
			if (poke || poke === null) {
				this.poke = poke;
			}
			this.pokedata = null;
			this.loadPage(function () {
				return callback();
			});
		} else if ((poke || poke === null) && poke !== this.poke) {
			this.poke = poke;
			if (this.poke !== null) {
				this.loadPokemonData(function () {
					this.showPokemonDetail();
					return callback();
				}.bind(this));
			} else {
				this.showPokemonList();
				return callback();
			}
		} else {
			return callback();
		}
	},
	
	reloadNavBar: function (month, callback) {
		if (month && this.months.indexOf(month) == -1) {
			month = this.months[this.months.length - 1];
		}
		if (month && month !== this.smonth) {
			this.smonth = month;
			Tools.wget('./data/months/' + this.smonth + '/formats.json', function (data) {
				if (typeof data === "string") data = JSON.parse(data);
				this.sformats = data;
				var format = NavigationBar.getSelectedFormat();
				NavigationBar.setFormats(this.sformats);
				if (!format || !this.sformats[format]) format = "gen7ou";
				if (!this.sformats[format]) {
					for (var k in this.sformats) {
						format = k;
						break;
					}
				}
				NavigationBar.setSelectedFormat(format);
				var cutline = NavigationBar.getSelectedCutline();
				NavigationBar.setCutlines(this.sformats[format]);
				if (cutline === null || this.sformats[format].cuts.indexOf(cutline) === -1) {
					cutline = this.sformats[format].dcut;
				}
				NavigationBar.setSelectedCutline(cutline);
				return callback();
			}.bind(this));
		} else {
			return callback();
		}
	},
	
	onChangeSelectedMonth: function () {
		var month = NavigationBar.getSelectedMonth();
		if (month !== this.smonth) {
			NavigationBar.setLoading();
			this.reloadNavBar(month, function () {
				NavigationBar.setLoading(false);
			});
		}
	},
	
	onChangeSelectedFormat: function () {
		var format = NavigationBar.getSelectedFormat();
		var cutline = NavigationBar.getSelectedCutline();
		NavigationBar.setCutlines(this.sformats[format]);
		if (cutline === null || this.sformats[format].cuts.indexOf(cutline) === -1) {
			cutline = this.sformats[format].dcut;
		}
		NavigationBar.setSelectedCutline(cutline);
	},
	
	viewStats: function () {
		NavigationBar.setLoading();
		this.month = this.smonth;
		this.formats = this.sformats;
		
		this.reloadPage(false, NavigationBar.getSelectedFormat(), NavigationBar.getSelectedCutline(), this.poke, function () {
			window.history.pushState({}, null, this.getPokeHref(this.poke));
			NavigationBar.setLoading(false);
		}.bind(this));
	},
	
	getPokeHref: function (poke) {
		if (poke) {
			return ("?month=" + this.month + "&format=" + this.format + "&cut=" + this.cutline + "&pokemon=" + poke);
		} else {
			return ("?month=" + this.month + "&format=" + this.format + "&cut=" + this.cutline);
		}
		
	},
	
	showPokemonList: function () {
		var buf = '';
		
		buf += '<h1 class="title-format">' + Tools.getFormatName(this.format) + '</h1>';
		buf += '<h2 class="subtitle">' + Tools.getMonthName(this.month) + '</h2>';
		buf += '<h2 class="subtitle">Cutline: ' + this.cutline + '</h2>';
		buf += '<p><b>Total Battles:</b> ' + this.stats.battles + '</p>';
		buf += '<p><b>Avg. weight/team:</b> ' + Tools.decimalFormat(this.stats.avg, 3) + '</p>';
		buf += '<div align="center">';
		buf += '<table class="usage-table" border="0">';
		buf += '<tr class="tr-head"><td>#</td><td>Pokemon</td><td>Usage %</td><td>Raw</td><td class="expendable">Raw %</td>';
		buf += '<td class="expendable">Real</td><td class="expendable">Real %</td></tr>';
		
		var poke;
		for (var i = 0; i < this.stats.pokemon.length; i++) {
			poke = this.stats.pokemon[i];

			buf += '<tr>';
			buf += '<td class="td-bold">' + (i + 1) + '</td>';
			buf += '<td>' + Tools.getMiniSprite(toId(poke.name)) +
				' <a name="pokemon-link" value="' + toId(poke.name) + '" class="poke-link" href="' + this.getPokeHref(toId(poke.name)) + '">';
			buf += escapeHTML(poke.name) + '</a></td>';
			buf += '<td class="td-bold">' + Tools.decimalFormat(poke.usage, 2, 2) + ' %</td>';
			buf += '<td>' + poke.raw + '</td>';
			buf += '<td class="expendable">' + Tools.decimalFormat(poke.rawp, 2, 2) + '%</td>';
			buf += '<td class="expendable">' + poke.real + '</td>';
			buf += '<td class="expendable">' + Tools.decimalFormat(poke.realp, 2, 2) + '%</td>';
			buf += '</tr>';
		}
		
		buf += '</table>';
		buf += '</div>';
		
		this.setHTML(buf);
	},
	
	getPokemonDetail: function (poke) {
		if (!poke) return null;
		var usageLine = null, pos = 0;
		for (var i = 0; i < this.stats.pokemon.length; i++) {
			if (toId(this.stats.pokemon[i].name) === poke) {
				usageLine = this.stats.pokemon[i];
				pos = i;
				break;
			}
		}
		if (!usageLine) return null;
		return {pos: (i + 1), usage: usageLine, data: this.pokedata[poke]};
	},
	
	showPokemonDetail: function () {
		var buf = '';
		var detail = this.getPokemonDetail(this.poke);
		
		buf += '<h1 class="title-format">' + Tools.getFormatName(this.format) + '</h1>';
		buf += '<h2 class="subtitle">' + Tools.getMonthName(this.month) + '</h2>';
		buf += '<h2 class="subtitle">Cutline: ' + this.cutline + '</h2>';
		
		if (!detail) {
			buf += '<div align="center"><h1>Not Found: &quot;' + escapeHTML(this.poke) + '&quot;</h1></div>';
			buf += '<p class="poke-option-link"><a name="back-link" href="' + this.getPokeHref(null) + '">&lt;&lt; Back to the pokemon list</a></p>';
			buf += '<br /><br />';
			this.setHTML(buf);
			return;
		}
		
		buf += '<div align="center"><img class="poke-sprite" src="' + Tools.getPokemonSprite(detail.usage.name) +
			'" width="120" height="120" /></div>';
		buf += '<p class="poke-option-link"><a name="back-link" href="' + this.getPokeHref(null) + '">&lt;&lt; Back to the pokemon list</a></p>';
		buf += '<h2 class="poke-title">#' + detail.pos + ', ' + escapeHTML(detail.usage.name) + '</h2>';
		buf += '<p class="poke-option-link" style="text-align:right;"><a href="http://dex.pokemonshowdown.com/pokemon/' +
			this.poke + '" target="_blank">Go to the Pokedex</a></p></div>';
		buf += '<br /><br />';
		
		/* Usage */
		buf += '<table class="usage-table" border="0">';
		buf += '<tr class="tr-head"><td>Usage %</td><td>Raw</td><td>Raw %</td><td>Real</td><td>Real %</td></tr>';
		buf += '<tr><td class="td-bold">' + Tools.decimalFormat(detail.usage.usage, 3, 3) + ' %</td>';
		buf += '<td>' + detail.usage.raw + '</td>';
		buf += '<td>' + Tools.decimalFormat(detail.usage.rawp, 3, 3) + '%</td>';
		buf += '<td>' + detail.usage.real + '</td>';
		buf += '<td>' + Tools.decimalFormat(detail.usage.realp, 3, 3) + '%</td></tr>';
		buf += '</table>';
		
		/* Abilities */
		buf += '<table class="usage-table alt-table-color" border="0">';
		buf += '<tr class="tr-head"><td>Most Used Abilities</td><td class="usage-percent-td">%</td></tr>';
		if (!detail.data || detail.data.abilities.length === 0) {
			buf += '<tr><td class="td-bold">-</td><td class="usage-percent-td">-</td></tr>';
		} else {
			for (var i = 0; i < detail.data.abilities.length; i++) {
				buf += '<tr><td class="td-bold">' + Tools.getAbilityLink(detail.data.abilities[i].name) +
					'</td><td class="usage-percent-td">' + Tools.decimalFormat(detail.data.abilities[i].usage, 2, 2) + '%</td></tr>';
			}
		}
		buf += '</table>';
		
		/* Moves */
		buf += '<table class="usage-table" border="0">';
		buf += '<tr class="tr-head"><td>Most Used Moves</td><td class="usage-percent-td">%</td></tr>';
		if (!detail.data || detail.data.moves.length === 0) {
			buf += '<tr><td class="td-bold">-</td><td class="usage-percent-td">-</td></tr>';
		} else {
			for (var i = 0; i < detail.data.moves.length; i++) {
				buf += '<tr><td class="td-bold">' + Tools.getMoveLink(detail.data.moves[i].name) +
					' ' + Tools.getMoveTypeSprite(detail.data.moves[i].name) + 
					' ' + Tools.getMoveCategorySprite(detail.data.moves[i].name) +
					'</td><td class="usage-percent-td">' + Tools.decimalFormat(detail.data.moves[i].usage, 2, 2) + '%</td></tr>';
			}
		}
		buf += '</table>';
		
		/* Items */
		buf += '<table class="usage-table alt-table-color" border="0">';
		buf += '<tr class="tr-head"><td>Most Used Items</td><td class="usage-percent-td">%</td></tr>';
		if (!detail.data || detail.data.items.length === 0) {
			buf += '<tr><td class="td-bold">-</td><td class="usage-percent-td">-</td></tr>';
		} else {
			for (var i = 0; i < detail.data.items.length; i++) {
				buf += '<tr><td class="td-bold">' + Tools.getItemSprite(detail.data.items[i].name) + " " +
					Tools.getItemLink(detail.data.items[i].name) +
					'</td><td class="usage-percent-td">' + Tools.decimalFormat(detail.data.items[i].usage, 2, 2) + '%</td></tr>';
			}
		}
		buf += '</table>';
		
		/* Spreads */
		buf += '<table id="spreads-table" class="usage-table" border="0">';
		buf += '<tr class="tr-head"><td>Most Used Spreads</td><td class="stat-td">HP</td><td class="slash-td">/</td><td class="stat-td">Atk</td>' +
			'<td class="slash-td">/</td><td class="stat-td">Def</td><td class="slash-td">/</td><td class="stat-td">SpA</td>' +
			'<td class="slash-td">/</td><td class="stat-td">SpD</td><td class="slash-td">/</td><td class="stat-td">Spe</td>' +
			'<td class="usage-percent-td">%</td></tr>';
		if (!detail.data || detail.data.spreads.length === 0) {
			buf += '<tr><td class="td-bold">-</td>';
			buf += '<td class="stat-td">-</td><td class="slash-td">/</td>';
			buf += '<td class="stat-td">-</td><td class="slash-td">/</td>';
			buf += '<td class="stat-td">-</td><td class="slash-td">/</td>';
			buf += '<td class="stat-td">-</td><td class="slash-td">/</td>';
			buf += '<td class="stat-td">-</td><td class="slash-td">/</td>';
			buf += '<td class="stat-td">-</td>';
			buf += '<td class="usage-percent-td">-</td></tr>';
		} else {
			for (var i = 0; i < detail.data.spreads.length; i++) {
				buf += '<tr><td class="td-bold">' + Tools.getNatureSpan(detail.data.spreads[i].nature) + '</td>';
				buf += '<td class="stat-td">' + (detail.data.spreads[i].evs.hp === null ? '?' : (detail.data.spreads[i].evs.hp || "0")) + '</td><td class="slash-td">/</td>';
				buf += '<td class="stat-td">' + (detail.data.spreads[i].evs.atk === null ? '?' : (detail.data.spreads[i].evs.atk || "0")) + '</td><td class="slash-td">/</td>';
				buf += '<td class="stat-td">' + (detail.data.spreads[i].evs.def === null ? '?' : (detail.data.spreads[i].evs.def || "0")) + '</td><td class="slash-td">/</td>';
				buf += '<td class="stat-td">' + (detail.data.spreads[i].evs.spa === null ? '?' : (detail.data.spreads[i].evs.spa || "0")) + '</td><td class="slash-td">/</td>';
				buf += '<td class="stat-td">' + (detail.data.spreads[i].evs.spd === null ? '?' : (detail.data.spreads[i].evs.spd || "0")) + '</td><td class="slash-td">/</td>';
				buf += '<td class="stat-td">' + (detail.data.spreads[i].evs.spe === null ? '?' : (detail.data.spreads[i].evs.spe || "0")) + '</td>';
				buf += '<td class="usage-percent-td">' + Tools.decimalFormat(detail.data.spreads[i].usage, 2, 2) + '%</td></tr>';
			}
		}
		buf += '</table>';
		
		buf += '<table id="spreads-table-min" class="usage-table" border="0">';
		buf += '<tr class="tr-head"><td>Most Used Spreads</td><td class="usage-percent-td">%</td></tr>';
		if (!detail.data || detail.data.spreads.length === 0) {
			buf += '<tr class="tr-head"><td class="td-bold">-</td><td class="usage-percent-td">-</td></tr>';
		} else {
			for (var i = 0; i < detail.data.spreads.length; i++) {
				buf += '<tr><td class="td-bold">' + Tools.getNatureSpan(detail.data.spreads[i].nature) + '';
				buf += ' ' + (detail.data.spreads[i].evs.hp === null ? '?' : (detail.data.spreads[i].evs.hp || "0")) + ' / ';
				buf += (detail.data.spreads[i].evs.atk === null ? '?' : (detail.data.spreads[i].evs.atk || "0")) + ' / ';
				buf += (detail.data.spreads[i].evs.def === null ? '?' : (detail.data.spreads[i].evs.def || "0")) + ' / ';
				buf += (detail.data.spreads[i].evs.spa === null ? '?' : (detail.data.spreads[i].evs.spa || "0")) + ' / ';
				buf += (detail.data.spreads[i].evs.spd === null ? '?' : (detail.data.spreads[i].evs.spd || "0")) + ' / ';
				buf += (detail.data.spreads[i].evs.spe === null ? '?' : (detail.data.spreads[i].evs.spe || "0")) + '</td>';
				buf += '<td class="usage-percent-td">' + Tools.decimalFormat(detail.data.spreads[i].usage, 2, 2) + '%</td></tr>';
			}
		}
		buf += '</table>';
		
		/* Teammates */
		buf += '<table class="usage-table alt-table-color" border="0">';
		buf += '<tr class="tr-head"><td>Most Common Teammates</td><td class="usage-percent-td">%</td></tr>';
		if (!detail.data || detail.data.teammates.length === 0) {
			buf += '<tr><td class="td-bold">-</td><td class="usage-percent-td">-</td></tr>';
		} else {
			for (var i = 0; i < detail.data.teammates.length; i++) {
				buf += '<tr><td class="td-bold">' + Tools.getMiniSprite(toId(detail.data.teammates[i].name)) +
					'<a name="pokemon-link" class="poke-link" href="' + this.getPokeHref(toId(detail.data.teammates[i].name)) + '">' +
					escapeHTML(detail.data.teammates[i].name) + '</a></td><td class="usage-percent-td">' +
					Tools.decimalFormat(detail.data.teammates[i].usage, 2, 2) + '%</td></tr>';
			}
		}
		buf += '</table>';
		
		/* Counters */
		buf += '<table class="usage-table" border="0">';
		buf += '<tr class="tr-head"><td>Most Common Checks / Counters</td><td class="usage-percent-td">% Switch</td>' +
			'<td class="usage-percent-td">% KO</td><td class="usage-percent-td">% Total</td></tr>';
		if (!detail.data || detail.data.counters.length === 0) {
			buf += '<tr><td class="td-bold">-</td><td class="usage-percent-td">-</td><td class="usage-percent-td">-</td>' +
				'<td class="usage-percent-td">-</td></tr>';
		} else {
			for (var i = 0; i < detail.data.counters.length; i++) {
				buf += '<tr><td class="td-bold">' + Tools.getMiniSprite(toId(detail.data.counters[i].name)) +
					'<a name="pokemon-link" class="poke-link" href="' + this.getPokeHref(toId(detail.data.counters[i].name)) + '">' +
					escapeHTML(detail.data.counters[i].name) + '</a></td>';
				buf += '<td class="usage-percent-td">' + Tools.decimalFormat(detail.data.counters[i].ko, 2, 2) + '%</td>';
				buf += '<td class="usage-percent-td">' + Tools.decimalFormat(detail.data.counters[i].sw, 2, 2) + '%</td>';
				buf += '<td class="usage-percent-td">' + Tools.decimalFormat(detail.data.counters[i].eff, 2, 2) + '%</td>';
				buf += '</tr>';
			}
		}
		buf += '</table>';
		
		/* Leads */
		buf += '<table class="usage-table alt-table-color" border="0">';
		buf += '<tr class="tr-head"><td>Lead (When Used)</td><td>Lead (All Games)</td></tr>';
		if (!detail.data || !detail.data.lead) {
			buf += '<tr><td class="usage-percent-td">-</td>';
			buf += '<td class="usage-percent-td">-</td></tr>';
		} else {
			if (detail.usage.usage === 0) {
				buf += '<tr><td class="td-bold">-</td>';
			} else {
				buf += '<tr><td class="td-bold">' + Tools.decimalFormat((detail.data.lead.usage / detail.usage.usage) * 100, 3, 3) + '%</td>';
			}
			buf += '<td class="td-bold">' + Tools.decimalFormat(detail.data.lead.usage, 3, 3) + '%</td></tr>';
		}
		buf += '</table>';
		
		/* Other Stats */
		buf += '<table class="usage-table" border="0">';
		buf += '<tr class="tr-head"><td>Raw Count</td><td>Avg. weight</td><td>Viability Ceiling</td></tr>';
		if (!detail.data) {
			buf += '<tr><td>-</td><td>-</td><td>-</td></tr>';
		} else {
			buf += '<tr><td>' + detail.data.raw + '</td>';
			buf += '<td>' + detail.data.avg + '</td>';
			buf += '<td>' + detail.data.vc + '</td></tr>';
		}
		buf += '</table>';

		this.setHTML(buf);
	},
	
	setHTML: function (html) {
		$('#main-container').html(html);
		document.body.scrollTop = 0;
		window.pageYOffset = 0;
	},
};
