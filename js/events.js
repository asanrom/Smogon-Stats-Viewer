/* Events */

$(document).ready(function () {
	$(document).on('click', 'a', function (event) {
		var elem = $(event.target);
		if (elem.prop('name') === "pokemon-link") {
			UsageViewer.poke = elem.prop('href').split("pokemon=")[1];
			if (UsageViewer.pokedata === null) {
				NavigationBar.setLoading();
				UsageViewer.loadPokemonData(function () {
					UsageViewer.showPokemonDetail();
					NavigationBar.setLoading(false);
					window.scrollTo(0, 0);
				});
			} else {
				UsageViewer.showPokemonDetail();
				window.scrollTo(0, 0);
			}
			window.history.pushState({}, null, elem.prop('href'));
			event.preventDefault();
		} else if (elem.prop('name') === "back-link") {
			UsageViewer.poke = null;
			NavigationBar.setLoading();
			UsageViewer.showPokemonList();
			NavigationBar.setLoading(false);
			window.scrollTo(0, 0);
			window.history.pushState({}, null, elem.prop('href'));
			event.preventDefault();
		}
	});
	
	
	$(document).on('click', 'select', function (event) {
		var elem = $(event.target);
		if (elem.id === "select-month") {
			UsageViewer.onChangeSelectedMonth();
			window.scrollTo(0, 0);
		} else if (elem.id === "select-format") {
			UsageViewer.onChangeSelectedFormat();
			window.scrollTo(0, 0);
		}
	});
	
	window.onpopstate = function(e) {
		document.location.reload();
	};

	UsageViewer.init();
});
