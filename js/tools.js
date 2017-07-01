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
		if (num > 807) num = 0;
		var altNums = {
			egg: 816 + 1,
			pikachubelle: 816 + 2,
			pikachulibre: 816 + 3,
			pikachuphd: 816 + 4,
			pikachupopstar: 816 + 5,
			pikachurockstar: 816 + 6,
			pikachucosplay: 816 + 7,
			// unown gap
			castformrainy: 816 + 35,
			castformsnowy: 816 + 36,
			castformsunny: 816 + 37,
			deoxysattack: 816 + 38,
			deoxysdefense: 816 + 39,
			deoxysspeed: 816 + 40,
			burmysandy: 816 + 41,
			burmytrash: 816 + 42,
			wormadamsandy: 816 + 43,
			wormadamtrash: 816 + 44,
			cherrimsunshine: 816 + 45,
			shelloseast: 816 + 46,
			gastrodoneast: 816 + 47,
			rotomfan: 816 + 48,
			rotomfrost: 816 + 49,
			rotomheat: 816 + 50,
			rotommow: 816 + 51,
			rotomwash: 816 + 52,
			giratinaorigin: 816 + 53,
			shayminsky: 816 + 54,
			unfezantf: 816 + 55,
			basculinbluestriped: 816 + 56,
			darmanitanzen: 816 + 57,
			deerlingautumn: 816 + 58,
			deerlingsummer: 816 + 59,
			deerlingwinter: 816 + 60,
			sawsbuckautumn: 816 + 61,
			sawsbucksummer: 816 + 62,
			sawsbuckwinter: 816 + 63,
			frillishf: 816 + 64,
			jellicentf: 816 + 65,
			tornadustherian: 816 + 66,
			thundurustherian: 816 + 67,
			landorustherian: 816 + 68,
			kyuremblack: 816 + 69,
			kyuremwhite: 816 + 70,
			keldeoresolute: 816 + 71,
			meloettapirouette: 816 + 72,
			vivillonarchipelago: 816 + 73,
			vivilloncontinental: 816 + 74,
			vivillonelegant: 816 + 75,
			vivillonfancy: 816 + 76,
			vivillongarden: 816 + 77,
			vivillonhighplains: 816 + 78,
			vivillonicysnow: 816 + 79,
			vivillonjungle: 816 + 80,
			vivillonmarine: 816 + 81,
			vivillonmodern: 816 + 82,
			vivillonmonsoon: 816 + 83,
			vivillonocean: 816 + 84,
			vivillonpokeball: 816 + 85,
			vivillonpolar: 816 + 86,
			vivillonriver: 816 + 87,
			vivillonsandstorm: 816 + 88,
			vivillonsavanna: 816 + 89,
			vivillonsun: 816 + 90,
			vivillontundra: 816 + 91,
			pyroarf: 816 + 92,
			flabebeblue: 816 + 93,
			flabebeorange: 816 + 94,
			flabebewhite: 816 + 95,
			flabebeyellow: 816 + 96,
			floetteblue: 816 + 97,
			floetteeternal: 816 + 98,
			floetteorange: 816 + 99,
			floettewhite: 816 + 100,
			floetteyellow: 816 + 101,
			florgesblue: 816 + 102,
			florgesorange: 816 + 103,
			florgeswhite: 816 + 104,
			florgesyellow: 816 + 105,
			// furfrou gap
			meowsticf: 816 + 115,
			aegislashblade: 816 + 116,
			hoopaunbound: 816 + 118,
			rattataalola: 816 + 119,
			raticatealola: 816 + 120,
			raichualola: 816 + 121,
			sandshrewalola: 816 + 122,
			sandslashalola: 816 + 123,
			vulpixalola: 816 + 124,
			ninetalesalola: 816 + 125,
			diglettalola: 816 + 126,
			dugtrioalola: 816 + 127,
			meowthalola: 816 + 128,
			persianalola: 816 + 129,
			geodudealola: 816 + 130,
			graveleralola: 816 + 131,
			golemalola: 816 + 132,
			grimeralola: 816 + 133,
			mukalola: 816 + 134,
			exeggutoralola: 816 + 135,
			marowakalola: 816 + 136,
			greninjaash: 816 + 137,
			zygarde10: 816 + 138,
			zygardecomplete: 816 + 139,
			oricoriopompom: 816 + 140,
			oricoriopau: 816 + 141,
			oricoriosensu: 816 + 142,
			lycanrocmidnight: 816 + 143,
			wishiwashischool: 816 + 144,
			miniormeteor: 816 + 145,
			miniororange: 816 + 146,
			minioryellow: 816 + 147,
			miniorgreen: 816 + 148,
			miniorblue: 816 + 149,
			miniorviolet: 816 + 150,
			miniorindigo: 816 + 151,
			magearnaoriginal: 816 + 152,
			pikachuoriginal: 816 + 153,
			pikachuhoenn: 816 + 154,
			pikachusinnoh: 816 + 155,
			pikachuunova: 816 + 156,
			pikachukalos: 816 + 157,
			pikachualola: 816 + 158,
			pikachupartner: 816 + 159,
			lycanrocdusk: 816 + 160,
			necrozmaduskmane: 816 + 161,
			necrozmadawnwings: 816 + 162,
			necrozmaultra: 816 + 163,

			gumshoostotem: 735,
			raticatealolatotem: 816 + 120,
			marowakalolatotem: 816 + 136,
			araquanidtotem: 752,
			lurantistotem: 754,
			salazzletotem: 758,
			vikavolttotem: 738,
			togedemarutotem: 777,
			mimikyutotem: 778,
			mimikyubustedtotem: 778,
			ribombeetotem: 743,
			kommoototem: 784,

			venusaurmega: 984 + 0,
			charizardmegax: 984 + 1,
			charizardmegay: 984 + 2,
			blastoisemega: 984 + 3,
			beedrillmega: 984 + 4,
			pidgeotmega: 984 + 5,
			alakazammega: 984 + 6,
			slowbromega: 984 + 7,
			gengarmega: 984 + 8,
			kangaskhanmega: 984 + 9,
			pinsirmega: 984 + 10,
			gyaradosmega: 984 + 11,
			aerodactylmega: 984 + 12,
			mewtwomegax: 984 + 13,
			mewtwomegay: 984 + 14,
			ampharosmega: 984 + 15,
			steelixmega: 984 + 16,
			scizormega: 984 + 17,
			heracrossmega: 984 + 18,
			houndoommega: 984 + 19,
			tyranitarmega: 984 + 20,
			sceptilemega: 984 + 21,
			blazikenmega: 984 + 22,
			swampertmega: 984 + 23,
			gardevoirmega: 984 + 24,
			sableyemega: 984 + 25,
			mawilemega: 984 + 26,
			aggronmega: 984 + 27,
			medichammega: 984 + 28,
			manectricmega: 984 + 29,
			sharpedomega: 984 + 30,
			cameruptmega: 984 + 31,
			altariamega: 984 + 32,
			banettemega: 984 + 33,
			absolmega: 984 + 34,
			glaliemega: 984 + 35,
			salamencemega: 984 + 36,
			metagrossmega: 984 + 37,
			latiasmega: 984 + 38,
			latiosmega: 984 + 39,
			kyogreprimal: 984 + 40,
			groudonprimal: 984 + 41,
			rayquazamega: 984 + 42,
			lopunnymega: 984 + 43,
			garchompmega: 984 + 44,
			lucariomega: 984 + 45,
			abomasnowmega: 984 + 46,
			gallademega: 984 + 47,
			audinomega: 984 + 48,
			dianciemega: 984 + 49,

			syclant: 1152 + 0,
			revenankh: 1152 + 1,
			pyroak: 1152 + 2,
			fidgit: 1152 + 3,
			stratagem: 1152 + 4,
			arghonaut: 1152 + 5,
			kitsunoh: 1152 + 6,
			cyclohm: 1152 + 7,
			colossoil: 1152 + 8,
			krilowatt: 1152 + 9,
			voodoom: 1152 + 10,
			tomohawk: 1152 + 11,
			necturna: 1152 + 12,
			mollux: 1152 + 13,
			aurumoth: 1152 + 14,
			malaconda: 1152 + 15,
			cawmodore: 1152 + 16,
			volkraken: 1152 + 17,
			plasmanta: 1152 + 18,
			naviathan: 1152 + 19,
			crucibelle: 1152 + 20,
			crucibellemega: 1152 + 21,
			kerfluffle: 1152 + 22,
			pajantom: 1152 + 23,

			syclar: 1176 + 0,
			embirch: 1176 + 1,
			flarelm: 1176 + 2,
			breezi: 1176 + 3,
			scratchet: 1176 + 4,
			necturine: 1176 + 5,
			cupra: 1176 + 6,
			argalis: 1176 + 7,
			brattler: 1176 + 8,
			cawdet: 1176 + 9,
			volkritter: 1176 + 10,
			snugglow: 1176 + 11,
			floatoy: 1176 + 12,
			caimanoe: 1176 + 13,
			pluffle: 1176 + 14
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
				pikachubelle: 1044 + 0,
				pikachupopstar: 1044 + 1,
				clefairy: 1044 + 2,
				clefable: 1044 + 3,
				jigglypuff: 1044 + 4,
				wigglytuff: 1044 + 5,
				dugtrioalola: 1044 + 6,
				poliwhirl: 1044 + 7,
				poliwrath: 1044 + 8,
				mukalola: 1044 + 9,
				kingler: 1044 + 10,
				croconaw: 1044 + 11,
				cleffa: 1044 + 12,
				igglybuff: 1044 + 13,
				politoed: 1044 + 14,
				// unown gap
				sneasel: 1044 + 35,
				teddiursa: 1044 + 36,
				roselia: 1044 + 37,
				zangoose: 1044 + 38,
				seviper: 1044 + 39,
				castformrainy: 1044 + 40,
				absolmega: 1044 + 41,
				absol: 1044 + 42,
				regirock: 1044 + 43,
				torterra: 1044 + 44,
				budew: 1044 + 45,
				roserade: 1044 + 46,
				magmortar: 1044 + 47,
				togekiss: 1044 + 48,
				rotomwash: 1044 + 49,
				shayminsky: 1044 + 50,
				emboar: 1044 + 51,
				pansear: 1044 + 52,
				simisear: 1044 + 53,
				drilbur: 1044 + 54,
				excadrill: 1044 + 55,
				sawk: 1044 + 56,
				lilligant: 1044 + 57,
				garbodor: 1044 + 58,
				solosis: 1044 + 59,
				vanilluxe: 1044 + 60,
				amoonguss: 1044 + 61,
				klink: 1044 + 62,
				klang: 1044 + 63,
				klinklang: 1044 + 64,
				litwick: 1044 + 65,
				golett: 1044 + 66,
				golurk: 1044 + 67,
				kyuremblack: 1044 + 68,
				kyuremwhite: 1044 + 69,
				kyurem: 1044 + 70,
				keldeoresolute: 1044 + 71,
				meloetta: 1044 + 72,
				greninja: 1044 + 73,
				greninjaash: 1044 + 74,
				// furfroudebutante: 1044 + 75,
				barbaracle: 1044 + 76,
				clauncher: 1044 + 77,
				clawitzer: 1044 + 78,
				sylveon: 1044 + 79,
				klefki: 1044 + 80,
				zygarde: 1044 + 81,
				zygarde10: 1044 + 82,
				zygardecomplete: 1044 + 83,
				dartrix: 1044 + 84,
				steenee: 1044 + 85,
				tsareena: 1044 + 86,
				comfey: 1044 + 87,
				miniormeteor: 1044 + 88,
				minior: 1044 + 89,
				miniororange: 1044 + 90,
				minioryellow: 1044 + 91,
				miniorgreen: 1044 + 92,
				miniorblue: 1044 + 93,
				miniorviolet: 1044 + 94,
				miniorindigo: 1044 + 95,
				dhelmise: 1044 + 96,
				necrozma: 1044 + 97,
				marshadow: 1044 + 98,
				pikachuoriginal: 1044 + 99,
				pikachupartner: 1044 + 100,
				necrozmaduskmane: 1044 + 101,
				necrozmadawnwings: 1044 + 102,
				necrozmaultra: 1044 + 103,
				stakataka: 1044 + 104,
				blacephalon: 1044 + 105
			};
			if (altNums[id]) {
				num = altNums[id];
			}
		}

		var top = Math.floor(num / 12) * 30;
		var left = (num % 12) * 40;
		return 'background:transparent url(./resources/smicons-sheet.png?a12018dec) no-repeat scroll -' + left + 'px -' + top + 'px';
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
		return 'background:transparent url(./resources/itemicons-sheet.png?2018dec) no-repeat scroll -' + left + 'px -' + top + 'px';
	},
	getItemSprite: function(item) {
		return '<div class="item-icon" style="' + this.getItemIcon(item) + '"></div>';
	},
	getTypeSprite: function (name) {
		if (name == "???") {
			return '<img class="type-image" title="' + name + '" src="' + 'https://play.pokemonshowdown.com/sprites/types/%3f%3f%3f.png' + '" />';
		} else {
			return '<img class="type-image" title="' + name + '" src="' + 'https://play.pokemonshowdown.com/sprites/types/' + name + '.png' + '" />';
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
	getCategorySprite: function (name) {
		if (name == "???") {
			return '<img class="category-image" title="' + name + '" src="' + 'https://play.pokemonshowdown.com/sprites/categories/undefined.png' + '" />';
		} else {
			return '<img class="category-image" title="' + name + '" src="' + 'https://play.pokemonshowdown.com/sprites/categories/' + name + '.png' + '" />';
		}
	},
	getMoveCategorySprite: function (name) {
		var cat = "???";
		name = toId(name);
		if (window.BattleMovedex[name]) {
			cat = window.BattleMovedex[name].category;
		}
		return this.getCategorySprite(cat);
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
