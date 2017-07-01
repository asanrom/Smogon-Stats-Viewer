/* Navigation bar */

window.NavigationBar = {
	show: function () {
		$('#navigation-bar-hidden').css({display: 'none'});
		$('#navigation-bar').css({display: 'inherit'});
		$('.page-body').css({'margin-top': '5rem'});
	},
	
	hide: function () {
		$('#navigation-bar').css({display: 'none'});
		$('#navigation-bar-hidden').css({display: 'inherit'});
		$('.page-body').css({'margin-top': '1rem'});
	},
	
	setLoading: function (flag) {
		if (flag === false) {
			$('#loading-div').css({display: 'none'});
		} else {
			$('#loading-div').css({display: 'inherit'});
		}
	},
	
	setMonths: function (months) {
		var buf = '';
		for (var i = 0; i < months.length; i++) {
			buf += '<option value="' + months[i] + '">' + Tools.getMonthName(months[i]) + '</option>';
		}
		$('#select-month').html(buf);
	},
	
	getSelectedMonth: function () {
		return $('#select-month').val();
	},
	
	setSelectedMonth: function (val) {
		$('#select-month').val(val);
	},
	
	setFormats: function (formats) {
		var buf = '';
		for (f in formats) {
			buf += '<option value="' + f + '">' + Tools.getFormatName(f) + '</option>';
		}
		$('#select-format').html(buf);
	},
	
	getSelectedFormat: function () {
		return $('#select-format').val();
	},
	
	setSelectedFormat: function (val) {
		$('#select-format').val(val);
	},
	
	setCutlines: function (format) {
		var buf = '';
		if (format && format.cuts) {
			for (var i = 0; i < format.cuts.length; i++) {
				buf += '<option value="' + format.cuts[i] + '">' + format.cuts[i] + '</option>';
			}
		}
		$('#select-cutline').html(buf);
	},
	
	getSelectedCutline: function () {
		return parseInt($('#select-cutline').val());
	},
	
	setSelectedCutline: function (val) {
		$('#select-cutline').val(val);
	},
};
