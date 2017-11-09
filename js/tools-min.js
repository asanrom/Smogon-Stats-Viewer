window.toId=function(e){return e?(""+e).toLowerCase().replace(/[^a-z0-9]/g,""):""},window.escapeHTML=function(e){return e?(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/\//g,"&#x2f;"):""},window.trim=function(e){return e?(""+e).trim():""},window.Tools={decimalFormat:function(e,a,t){if(isNaN(e))return"NaN";for(var o=""+e,r=o.split("."),i=r[1]||"";i.length<a;)i+="0";return t&&i.length>t&&(i=i.substr(0,t)),r[0]+"."+i},wget:function(e,a){jQuery.get(e,a).fail(function(){NavigationBar.setLoading(),$("#loading-text").html("Connection Error. Try to refresh the page.")})},getFormatName:function(e){return FormatNames[e]?escapeHTML(FormatNames[e]):e.length<3?e.toUpperCase():/suspecttest$/.test(e)?this.getFormatName(e.substr(0,e.length-11))+" (Suspect Test)":e},months:["","January","February","March","April","May","June","July","August","September","October","November","December"],getMonthName:function(e){e=e.split("-");var a=parseInt(e[0]),t=parseInt(e[1]||"");return this.months[t]+", "+a},toSpriteId:function(e){return e?(e=(""+e).toLowerCase().replace(/[^a-z0-9-]/g,""),e=e.split("-"),e[0]+(e.length>1?"-"+e.slice(1).join(""):"")):""},getPokemonSprite:function(e){var a=Tools.toSpriteId(e);return"https://play.pokemonshowdown.com/sprites/bw/"+a+".png"},getPokemonIcon:function(e,a){var t=0,o=toId(e);window.BattlePokedex&&window.BattlePokedex[o]&&BattlePokedex[o].num&&(t=BattlePokedex[o].num),t<0&&(t=0),t>802&&(t=0);var r={egg:805,pikachubelle:806,pikachulibre:807,pikachuphd:808,pikachupopstar:809,pikachurockstar:810,pikachucosplay:811,castformrainy:839,castformsnowy:840,castformsunny:841,deoxysattack:842,deoxysdefense:843,deoxysspeed:844,burmysandy:845,burmytrash:846,wormadamsandy:847,wormadamtrash:848,cherrimsunshine:849,shelloseast:850,gastrodoneast:851,rotomfan:852,rotomfrost:853,rotomheat:854,rotommow:855,rotomwash:856,giratinaorigin:857,shayminsky:858,unfezantf:859,basculinbluestriped:860,darmanitanzen:861,deerlingautumn:862,deerlingsummer:863,deerlingwinter:864,sawsbuckautumn:865,sawsbucksummer:866,sawsbuckwinter:867,frillishf:868,jellicentf:869,tornadustherian:870,thundurustherian:871,landorustherian:872,kyuremblack:873,kyuremwhite:874,keldeoresolute:875,meloettapirouette:876,vivillonarchipelago:877,vivilloncontinental:878,vivillonelegant:879,vivillonfancy:880,vivillongarden:881,vivillonhighplains:882,vivillonicysnow:883,vivillonjungle:884,vivillonmarine:885,vivillonmodern:886,vivillonmonsoon:887,vivillonocean:888,vivillonpokeball:889,vivillonpolar:890,vivillonriver:891,vivillonsandstorm:892,vivillonsavanna:893,vivillonsun:894,vivillontundra:895,pyroarf:896,flabebeblue:897,flabebeorange:898,flabebewhite:899,flabebeyellow:900,floetteblue:901,floetteeternal:902,floetteorange:903,floettewhite:904,floetteyellow:905,florgesblue:906,florgesorange:907,florgeswhite:908,florgesyellow:909,meowsticf:919,aegislashblade:920,hoopaunbound:922,rattataalola:923,raticatealola:924,raichualola:925,sandshrewalola:926,sandslashalola:927,vulpixalola:928,ninetalesalola:929,diglettalola:930,dugtrioalola:931,meowthalola:932,persianalola:933,geodudealola:934,graveleralola:935,golemalola:936,grimeralola:937,mukalola:938,exeggutoralola:939,marowakalola:940,greninjaash:941,zygarde10:942,zygardecomplete:943,oricoriopompom:944,oricoriopau:945,oricoriosensu:946,lycanrocmidnight:947,wishiwashischool:948,miniormeteor:949,miniororange:950,minioryellow:951,miniorgreen:952,miniorblue:953,miniorviolet:954,miniorindigo:955,magearnaoriginal:956,pikachuoriginal:957,pikachuhoenn:958,pikachusinnoh:959,pikachuunova:960,pikachukalos:961,pikachualola:962,venusaurmega:972,charizardmegax:973,charizardmegay:974,blastoisemega:975,beedrillmega:976,pidgeotmega:977,alakazammega:978,slowbromega:979,gengarmega:980,kangaskhanmega:981,pinsirmega:982,gyaradosmega:983,aerodactylmega:984,mewtwomegax:985,mewtwomegay:986,ampharosmega:987,steelixmega:988,scizormega:989,heracrossmega:990,houndoommega:991,tyranitarmega:992,sceptilemega:993,blazikenmega:994,swampertmega:995,gardevoirmega:996,sableyemega:997,mawilemega:998,aggronmega:999,medichammega:1e3,manectricmega:1001,sharpedomega:1002,cameruptmega:1003,altariamega:1004,banettemega:1005,absolmega:1006,glaliemega:1007,salamencemega:1008,metagrossmega:1009,latiasmega:1010,latiosmega:1011,kyogreprimal:1012,groudonprimal:1013,rayquazamega:1014,lopunnymega:1015,garchompmega:1016,lucariomega:1017,abomasnowmega:1018,gallademega:1019,audinomega:1020,dianciemega:1021,syclant:1140,revenankh:1141,pyroak:1142,fidgit:1143,stratagem:1144,arghonaut:1145,kitsunoh:1146,cyclohm:1147,colossoil:1148,krilowatt:1149,voodoom:1150,tomohawk:1151,necturna:1152,mollux:1153,aurumoth:1154,malaconda:1155,cawmodore:1156,volkraken:1157,plasmanta:1158,naviathan:1159,crucibelle:1160,crucibellemega:1161,kerfluffle:1162,syclar:1164,embirch:1165,flarelm:1166,breezi:1167,scratchet:1168,necturine:1169,cupra:1170,argalis:1171,brattler:1172,cawdet:1173,volkritter:1174,snugglow:1175,floatoy:1176,caimanoe:1177,pluffle:1178};r[o]&&(t=r[o]),e&&"F"===e.gender&&("unfezant"!==o&&"frillish"!==o&&"jellicent"!==o&&"meowstic"!==o&&"pyroar"!==o||(t=r[o+"f"])),a&&(r={pikachubelle:1032,pikachupopstar:1033,clefairy:1034,clefable:1035,jigglypuff:1036,wigglytuff:1037,dugtrioalola:1038,poliwhirl:1039,poliwrath:1040,mukalola:1041,kingler:1042,croconaw:1043,cleffa:1044,igglybuff:1045,politoed:1046,sneasel:1067,teddiursa:1068,roselia:1069,zangoose:1070,seviper:1071,castformrainy:1072,absolmega:1073,absol:1074,regirock:1075,torterra:1076,budew:1077,roserade:1078,magmortar:1079,togekiss:1080,rotomwash:1081,shayminsky:1082,emboar:1083,pansear:1084,simisear:1085,drilbur:1086,excadrill:1087,sawk:1088,lilligant:1089,garbodor:1090,solosis:1091,vanilluxe:1092,amoonguss:1093,klink:1094,klang:1095,klinklang:1096,litwick:1097,golett:1098,golurk:1099,kyuremblack:1100,kyuremwhite:1101,kyurem:1102,keldeoresolute:1103,meloetta:1104,greninja:1105,greninjaash:1106,barbaracle:1108,clauncher:1109,clawitzer:1110,sylveon:1111,klefki:1112,zygarde:1113,zygarde10:1114,zygardecomplete:1115,dartrix:1116,steenee:1117,tsareena:1118,comfey:1119,miniormeteor:1120,minior:1121,miniororange:1122,minioryellow:1123,miniorgreen:1124,miniorblue:1125,miniorviolet:1126,miniorindigo:1127,dhelmise:1128,necrozma:1129,marshadow:1130,pikachuoriginal:1131},r[o]&&(t=r[o]));var i=30*Math.floor(t/12),n=t%12*40;return"background:transparent url(./resources/smicons-sheet.png?a1) no-repeat scroll -"+n+"px -"+i+"px"},getMiniSprite:function(e){return'<div class="poke-icon" style="'+this.getPokemonIcon(e)+'"></div>'},getItemIcon:function(e){var a=0;"string"==typeof e&&window.BattleItems&&(e=window.BattleItems[toId(e)]),e&&e.spritenum&&(a=e.spritenum);var t=24*Math.floor(a/16),o=a%16*24;return"background:transparent url(./resources/itemicons-sheet.png) no-repeat scroll -"+o+"px -"+t+"px"},getItemSprite:function(e){return'<div class="item-icon" style="'+this.getItemIcon(e)+'"></div>'},getTypeSprite:function(e){return"???"==e?'<img class="type-image" title="'+e+'" width="32px" height="14px" src="https://play.pokemonshowdown.com/sprites/types/%3f%3f%3f.png" />':'<img class="type-image" title="'+e+'" width="32px" height="14px" src="https://play.pokemonshowdown.com/sprites/types/'+e+'.png" />'},getMoveTypeSprite:function(e){var a="???";return e=toId(e),window.BattleMovedex[e]&&(a=window.BattleMovedex[e].type),this.getTypeSprite(a)},getCategorySprite:function(e){return"???"==e?'<img class="category-image" title="'+e+'" width="32px" height="14px" src="https://play.pokemonshowdown.com/sprites/categories/undefined.png" />':'<img class="category-image" title="'+e+'" width="32px" height="14px" src="https://play.pokemonshowdown.com/sprites/categories/'+e+'.png" />'},getMoveCategorySprite:function(e){var a="???";return e=toId(e),window.BattleMovedex[e]&&(a=window.BattleMovedex[e].category),this.getCategorySprite(a)},getMoveLink:function(e){return"other"===toId(e)?escapeHTML(e):'<a href="http://dex.pokemonshowdown.com/moves/'+toId(e)+'" target="_blank">'+escapeHTML(e)+"</a>"},getItemLink:function(e){return"other"===toId(e)?'<span class="item-link">'+escapeHTML(e)+"</span>":'<a href="http://dex.pokemonshowdown.com/items/'+toId(e)+'" class="item-link" target="_blank">'+escapeHTML(e)+"</a>"},getAbilityLink:function(e){return"other"===toId(e)?escapeHTML(e):'<a href="http://dex.pokemonshowdown.com/abilities/'+toId(e)+'" target="_blank">'+escapeHTML(e)+"</a>"},getNatureSpan:function(e){var a="???";switch(toId(e)){case"adamant":a="+Attack, -Sp. Attack";break;case"bold":a="+Defense, -Attack";break;case"brave":a="+Attack, -Speed";break;case"calm":a="+Sp. Defense, -Attack";break;case"careful":a="+Sp. Defense, -Sp. Attack";break;case"gentle":a="+Sp. Defense, -Defense";break;case"hasty":a="+Speed, -Defense";break;case"impish":a="+Defense, -Sp. Attack";break;case"jolly":a="+Speed, -Sp. Attack";break;case"lax":a="+Defense, -Sp. Defense";break;case"lonely":a="+Attack, -Defense";break;case"mild":a="+Sp. Attack, -Defense";break;case"modest":a="+Sp. Attack, -Attack";break;case"naive":a="+Speed, -Sp. Defense";break;case"naughty":a="+Attack, -Sp. Defense";break;case"quiet":a="+Sp. Attack, -Speed";break;case"rash":a="+Sp. Attack, -Sp. Defense";break;case"relaxed":a="+Defense, -Speed";break;case"sassy":a="+Sp. Defense, -Speed";break;case"timid":a="+Speed, -Attack";break;case"bashful":case"docile":case"hardy":case"serious":case"quirky":a="Neutral"}return'<span title="'+a+'">'+escapeHTML(e)+"</span>"}};