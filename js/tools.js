/* Tools */

window.toId = function (str) {
	if (!str) return '';
	return ('' + str).toLowerCase().replace(/[^a-z0-9]/g, '');
};

window.escapeHTML = function (str) {
	if (!str) return '';
	return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/\//g, '&#x2f;');
};

window.trim = function (str) {
	if (!str) return '';
	return ('' + str).trim();
};

window.Tools = {
	decimalFormat: function (number, dz, dl) {
		if (isNaN(number)) return "NaN"; 
		var str = "" + number;
		var spl = str.split('.');
		var dec = spl[1] || "";
		while (dec.length < dz) {
			dec = dec + "0";
		}
		if (dl && dec.length > dl) {
			dec = dec.substr(0, dl);
		}
		return (spl[0] + "." + dec);
	},
	wget: function (url, callback) {
		jQuery.get(url, callback).fail(function () {
			NavigationBar.setLoading();
			$("#loading-text").html("Connection Error. Try to refresh the page.");
		});
	},
	getFormatName: function (format) {
		if (FormatNames[format]) {
			return escapeHTML(FormatNames[format]);
		} else if (format.length < 3) {
			return format.toUpperCase();
		} else if ((/suspecttest$/).test(format)) { 
			return (this.getFormatName(format.substr(0, format.length - 11)) + " (Suspect Test)");
		} else {
			return format;
		}
	},
	months: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'],
	getMonthName: function (id) {
		id = id.split("-");
		var y = parseInt(id[0]);
		var m = parseInt(id[1] || "");
		return (this.months[m] + ", " + y);
	},
	toSpriteId: function (str) {
		if (!str) return '';
		str = ('' + str).toLowerCase().replace(/[^a-z0-9-]/g, '');
		str = str.split('-');
		return (str[0] + (str.length > 1 ? ('-' + str.slice(1).join('')) : ''));
	},
	getPokemonSprite: function (pokemon) {
		var sprite = Tools.toSpriteId(pokemon);
		return "https://play.pokemonshowdown.com/sprites/bw/" + sprite + ".png";
	},
	getPokemonIcon: function (pokemon, facingLeft) {
		var num = 0;
		var id = toId(pokemon);
		if (window.BattlePokedex && window.BattlePokedex[id] && BattlePokedex[id].num) num = BattlePokedex[id].num;
		if (num < 0) num = 0;
		if (num > 802) num = 0;
		var altNums = {
			egg: 804 + 1,
			pikachubelle: 804 + 2,
			pikachulibre: 804 + 3,
			pikachuphd: 804 + 4,
			pikachupopstar: 804 + 5,
			pikachurockstar: 804 + 6,
			pikachucosplay: 804 + 7,
			castformrainy: 804 + 35,
			castformsnowy: 804 + 36,
			castformsunny: 804 + 37,
			deoxysattack: 804 + 38,
			deoxysdefense: 804 + 39,
			deoxysspeed: 804 + 40,
			burmysandy: 804 + 41,
			burmytrash: 804 + 42,
			wormadamsandy: 804 + 43,
			wormadamtrash: 804 + 44,
			cherrimsunshine: 804 + 45,
			shelloseast: 804 + 46,
			gastrodoneast: 804 + 47,
			rotomfan: 804 + 48,
			rotomfrost: 804 + 49,
			rotomheat: 804 + 50,
			rotommow: 804 + 51,
			rotomwash: 804 + 52,
			giratinaorigin: 804 + 53,
			shayminsky: 804 + 54,
			unfezantf: 804 + 55,
			basculinbluestriped: 804 + 56,
			darmanitanzen: 804 + 57,
			deerlingautumn: 804 + 58,
			deerlingsummer: 804 + 59,
			deerlingwinter: 804 + 60,
			sawsbuckautumn: 804 + 61,
			sawsbucksummer: 804 + 62,
			sawsbuckwinter: 804 + 63,
			frillishf: 804 + 64,
			jellicentf: 804 + 65,
			tornadustherian: 804 + 66,
			thundurustherian: 804 + 67,
			landorustherian: 804 + 68,
			kyuremblack: 804 + 69,
			kyuremwhite: 804 + 70,
			keldeoresolute: 804 + 71,
			meloettapirouette: 804 + 72,
			vivillonarchipelago: 804 + 73,
			vivilloncontinental: 804 + 74,
			vivillonelegant: 804 + 75,
			vivillonfancy: 804 + 76,
			vivillongarden: 804 + 77,
			vivillonhighplains: 804 + 78,
			vivillonicysnow: 804 + 79,
			vivillonjungle: 804 + 80,
			vivillonmarine: 804 + 81,
			vivillonmodern: 804 + 82,
			vivillonmonsoon: 804 + 83,
			vivillonocean: 804 + 84,
			vivillonpokeball: 804 + 85,
			vivillonpolar: 804 + 86,
			vivillonriver: 804 + 87,
			vivillonsandstorm: 804 + 88,
			vivillonsavanna: 804 + 89,
			vivillonsun: 804 + 90,
			vivillontundra: 804 + 91,
			pyroarf: 804 + 92,
			flabebeblue: 804 + 93,
			flabebeorange: 804 + 94,
			flabebewhite: 804 + 95,
			flabebeyellow: 804 + 96,
			floetteblue: 804 + 97,
			floetteeternal: 804 + 98,
			floetteorange: 804 + 99,
			floettewhite: 804 + 100,
			floetteyellow: 804 + 101,
			florgesblue: 804 + 102,
			florgesorange: 804 + 103,
			florgeswhite: 804 + 104,
			florgesyellow: 804 + 105,
			meowsticf: 804 + 115,
			aegislashblade: 804 + 116,
			hoopaunbound: 804 + 118,
			rattataalola: 804 + 119,
			raticatealola: 804 + 120,
			raichualola: 804 + 121,
			sandshrewalola: 804 + 122,
			sandslashalola: 804 + 123,
			vulpixalola: 804 + 124,
			ninetalesalola: 804 + 125,
			diglettalola: 804 + 126,
			dugtrioalola: 804 + 127,
			meowthalola: 804 + 128,
			persianalola: 804 + 129,
			geodudealola: 804 + 130,
			graveleralola: 804 + 131,
			golemalola: 804 + 132,
			grimeralola: 804 + 133,
			mukalola: 804 + 134,
			exeggutoralola: 804 + 135,
			marowakalola: 804 + 136,
			greninjaash: 804 + 137,
			zygarde10: 804 + 138,
			zygardecomplete: 804 + 139,
			oricoriopompom: 804 + 140,
			oricoriopau: 804 + 141,
			oricoriosensu: 804 + 142,
			lycanrocmidnight: 804 + 143,
			wishiwashischool: 804 + 144,
			miniormeteor: 804 + 145,
			miniororange: 804 + 146,
			minioryellow: 804 + 147,
			miniorgreen: 804 + 148,
			miniorblue: 804 + 149,
			miniorviolet: 804 + 150,
			miniorindigo: 804 + 151,
			magearnaoriginal: 804 + 152,
			pikachuoriginal: 804 + 153,
			pikachuhoenn: 804 + 154,
			pikachusinnoh: 804 + 155,
			pikachuunova: 804 + 156,
			pikachukalos: 804 + 157,
			pikachualola: 804 + 158,

			venusaurmega: 972 + 0,
			charizardmegax: 972 + 1,
			charizardmegay: 972 + 2,
			blastoisemega: 972 + 3,
			beedrillmega: 972 + 4,
			pidgeotmega: 972 + 5,
			alakazammega: 972 + 6,
			slowbromega: 972 + 7,
			gengarmega: 972 + 8,
			kangaskhanmega: 972 + 9,
			pinsirmega: 972 + 10,
			gyaradosmega: 972 + 11,
			aerodactylmega: 972 + 12,
			mewtwomegax: 972 + 13,
			mewtwomegay: 972 + 14,
			ampharosmega: 972 + 15,
			steelixmega: 972 + 16,
			scizormega: 972 + 17,
			heracrossmega: 972 + 18,
			houndoommega: 972 + 19,
			tyranitarmega: 972 + 20,
			sceptilemega: 972 + 21,
			blazikenmega: 972 + 22,
			swampertmega: 972 + 23,
			gardevoirmega: 972 + 24,
			sableyemega: 972 + 25,
			mawilemega: 972 + 26,
			aggronmega: 972 + 27,
			medichammega: 972 + 28,
			manectricmega: 972 + 29,
			sharpedomega: 972 + 30,
			cameruptmega: 972 + 31,
			altariamega: 972 + 32,
			banettemega: 972 + 33,
			absolmega: 972 + 34,
			glaliemega: 972 + 35,
			salamencemega: 972 + 36,
			metagrossmega: 972 + 37,
			latiasmega: 972 + 38,
			latiosmega: 972 + 39,
			kyogreprimal: 972 + 40,
			groudonprimal: 972 + 41,
			rayquazamega: 972 + 42,
			lopunnymega: 972 + 43,
			garchompmega: 972 + 44,
			lucariomega: 972 + 45,
			abomasnowmega: 972 + 46,
			gallademega: 972 + 47,
			audinomega: 972 + 48,
			dianciemega: 972 + 49,

			syclant: 1140 + 0,
			revenankh: 1140 + 1,
			pyroak: 1140 + 2,
			fidgit: 1140 + 3,
			stratagem: 1140 + 4,
			arghonaut: 1140 + 5,
			kitsunoh: 1140 + 6,
			cyclohm: 1140 + 7,
			colossoil: 1140 + 8,
			krilowatt: 1140 + 9,
			voodoom: 1140 + 10,
			tomohawk: 1140 + 11,
			necturna: 1140 + 12,
			mollux: 1140 + 13,
			aurumoth: 1140 + 14,
			malaconda: 1140 + 15,
			cawmodore: 1140 + 16,
			volkraken: 1140 + 17,
			plasmanta: 1140 + 18,
			naviathan: 1140 + 19,
			crucibelle: 1140 + 20,
			crucibellemega: 1140 + 21,
			kerfluffle: 1140 + 22,

			syclar: 1164 + 0,
			embirch: 1164 + 1,
			flarelm: 1164 + 2,
			breezi: 1164 + 3,
			scratchet: 1164 + 4,
			necturine: 1164 + 5,
			cupra: 1164 + 6,
			argalis: 1164 + 7,
			brattler: 1164 + 8,
			cawdet: 1164 + 9,
			volkritter: 1164 + 10,
			snugglow: 1164 + 11,
			floatoy: 1164 + 12,
			caimanoe: 1164 + 13,
			pluffle: 1164 + 14
		};

		if (altNums[id]) {
			num = altNums[id];
		}

		if (pokemon && pokemon.gender === 'F') {
			if (id === 'unfezant' || id === 'frillish' || id === 'jellicent' || id === 'meowstic' || id === 'pyroar') {
				num = altNums[id + 'f'];
			}
		}

		if (facingLeft) {
			altNums = {
				pikachubelle: 1032 + 0,
				pikachupopstar: 1032 + 1,
				clefairy: 1032 + 2,
				clefable: 1032 + 3,
				jigglypuff: 1032 + 4,
				wigglytuff: 1032 + 5,
				dugtrioalola: 1032 + 6,
				poliwhirl: 1032 + 7,
				poliwrath: 1032 + 8,
				mukalola: 1032 + 9,
				kingler: 1032 + 10,
				croconaw: 1032 + 11,
				cleffa: 1032 + 12,
				igglybuff: 1032 + 13,
				politoed: 1032 + 14,
				// unown gap
				sneasel: 1032 + 35,
				teddiursa: 1032 + 36,
				roselia: 1032 + 37,
				zangoose: 1032 + 38,
				seviper: 1032 + 39,
				castformrainy: 1032 + 40,
				absolmega: 1032 + 41,
				absol: 1032 + 42,
				regirock: 1032 + 43,
				torterra: 1032 + 44,
				budew: 1032 + 45,
				roserade: 1032 + 46,
				magmortar: 1032 + 47,
				togekiss: 1032 + 48,
				rotomwash: 1032 + 49,
				shayminsky: 1032 + 50,
				emboar: 1032 + 51,
				pansear: 1032 + 52,
				simisear: 1032 + 53,
				drilbur: 1032 + 54,
				excadrill: 1032 + 55,
				sawk: 1032 + 56,
				lilligant: 1032 + 57,
				garbodor: 1032 + 58,
				solosis: 1032 + 59,
				vanilluxe: 1032 + 60,
				amoonguss: 1032 + 61,
				klink: 1032 + 62,
				klang: 1032 + 63,
				klinklang: 1032 + 64,
				litwick: 1032 + 65,
				golett: 1032 + 66,
				golurk: 1032 + 67,
				kyuremblack: 1032 + 68,
				kyuremwhite: 1032 + 69,
				kyurem: 1032 + 70,
				keldeoresolute: 1032 + 71,
				meloetta: 1032 + 72,
				greninja: 1032 + 73,
				greninjaash: 1032 + 74,
				// furfroudebutante: 1032 + 75,
				barbaracle: 1032 + 76,
				clauncher: 1032 + 77,
				clawitzer: 1032 + 78,
				sylveon: 1032 + 79,
				klefki: 1032 + 80,
				zygarde: 1032 + 81,
				zygarde10: 1032 + 82,
				zygardecomplete: 1032 + 83,
				dartrix: 1032 + 84,
				steenee: 1032 + 85,
				tsareena: 1032 + 86,
				comfey: 1032 + 87,
				miniormeteor: 1032 + 88,
				minior: 1032 + 89,
				miniororange: 1032 + 90,
				minioryellow: 1032 + 91,
				miniorgreen: 1032 + 92,
				miniorblue: 1032 + 93,
				miniorviolet: 1032 + 94,
				miniorindigo: 1032 + 95,
				dhelmise: 1032 + 96,
				necrozma: 1032 + 97,
				marshadow: 1032 + 98,
				pikachuoriginal: 1032 + 99
			};
			if (altNums[id]) {
				num = altNums[id];
			}
		}

		var top = Math.floor(num / 12) * 30;
		var left = (num % 12) * 40;
		return 'background:transparent url(./resources/smicons-sheet.png?a1) no-repeat scroll -' + left + 'px -' + top + 'px';
	},
	getMiniSprite: function(pokemon) {
		return '<div class="poke-icon" style="' + this.getPokemonIcon(pokemon) + '"></div>';
	},
	getItemIcon: function (item) {
		var num = 0;
		if (typeof item === 'string' && window.BattleItems) item = window.BattleItems[toId(item)];
		if (item && item.spritenum) num = item.spritenum;

		var top = Math.floor(num / 16) * 24;
		var left = (num % 16) * 24;
		return 'background:transparent url(./resources/itemicons-sheet.png) no-repeat scroll -' + left + 'px -' + top + 'px';
	},
	getItemSprite: function(item) {
		return '<div class="item-icon" style="' + this.getItemIcon(item) + '"></div>';
	},
	getTypeSprite: function (name) {
		if (name == "???") {
			return '<img class="type-image" title="' + name + '" width="32px" height="14px" src="' + 'http://play.pokemonshowdown.com/sprites/types/%3f%3f%3f.png' + '" />';
		} else {
			return '<img class="type-image" title="' + name + '" width="32px" height="14px" src="' + 'http://play.pokemonshowdown.com/sprites/types/' + name + '.png' + '" />';
		}
	},
	getMoveTypeSprite: function (name) {
		var type = "???";
		name = toId(name);
		if (window.BattleMovedex[name]) {
			type = window.BattleMovedex[name].type;
		}
		return this.getTypeSprite(type);
	},
	getMoveLink: function (move) {
		if (toId(move) === "other") {
			return escapeHTML(move);
		}
		return '<a href="http://dex.pokemonshowdown.com/moves/' + toId(move) + '" target="_blank">' + escapeHTML(move) + "</a>";
	},
	getItemLink: function (item) {
		if (toId(item) === "other") {
			return '<span class="item-link">' + escapeHTML(item) + '</span>';
		}
		return '<a href="http://dex.pokemonshowdown.com/items/' + toId(item) + '" class="item-link" target="_blank">' + escapeHTML(item) + "</a>";
	},
	getAbilityLink: function (ability) {
		if (toId(ability) === "other") {
			return escapeHTML(ability);
		}
		return '<a href="http://dex.pokemonshowdown.com/abilities/' + toId(ability) + '" target="_blank">' + escapeHTML(ability) + "</a>";
	},
	getNatureSpan: function (nature) {
		var help = "???";
		switch (toId(nature)) {
			case "adamant":
				help = "+Attack, -Sp. Attack";
				break;
			case "bold":
				help = "+Defense, -Attack";
				break;
			case "brave":
				help = "+Attack, -Speed";
				break;
			case "calm":
				help = "+Sp. Defense, -Attack";
				break;
			case "careful":
				help = "+Sp. Defense, -Sp. Attack";
				break;
			case "gentle":
				help = "+Sp. Defense, -Defense";
				break;
			case "hasty":
				help = "+Speed, -Defense";
				break;
			case "impish":
				help = "+Defense, -Sp. Attack";
				break;
			case "jolly":
				help = "+Speed, -Sp. Attack";
				break;
			case "lax":
				help = "+Defense, -Sp. Defense";
				break;
			case "lonely":
				help = "+Attack, -Defense";
				break;
			case "mild":
				help = "+Sp. Attack, -Defense";
				break;
			case "modest":
				help = "+Sp. Attack, -Attack";
				break;
			case "naive":
				help = "+Speed, -Sp. Defense";
				break;
			case "naughty":
				help = "+Attack, -Sp. Defense";
				break;
			case "quiet":
				help = "+Sp. Attack, -Speed";
				break;
			case "rash":
				help = "+Sp. Attack, -Sp. Defense";
				break;
			case "relaxed":
				help = "+Defense, -Speed";
				break;
			case "sassy":
				help = "+Sp. Defense, -Speed";
				break;
			case "timid":
				help = "+Speed, -Attack";
				break;
			case "bashful":
			case "docile":
			case "hardy":
			case "serious":
			case "quirky":
				help = "Neutral";
				break;
		}
		return '<span title="' + help + '">' + escapeHTML(nature) + '</span>';
	},
};
