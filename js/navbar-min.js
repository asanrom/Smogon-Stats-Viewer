window.NavigationBar={show:function(){$("#navigation-bar-hidden").css({display:"none"}),$("#navigation-bar").css({display:"inherit"}),$(".page-body").css({"margin-top":"50px"})},hide:function(){$("#navigation-bar").css({display:"none"}),$("#navigation-bar-hidden").css({display:"inherit"}),$(".page-body").css({"margin-top":"15px"})},setLoading:function(t){t===!1?$("#loading-div").css({display:"none"}):$("#loading-div").css({display:"inherit"})},setMonths:function(t){for(var e="",n=0;n<t.length;n++)e+='<option value="'+t[n]+'">'+Tools.getMonthName(t[n])+"</option>";$("#select-month").html(e)},getSelectedMonth:function(){return $("#select-month").val()},setSelectedMonth:function(t){$("#select-month").val(t)},setFormats:function(t){var e="";for(f in t)e+='<option value="'+f+'">'+Tools.getFormatName(f)+"</option>";$("#select-format").html(e)},getSelectedFormat:function(){return $("#select-format").val()},setSelectedFormat:function(t){$("#select-format").val(t)},setCutlines:function(t){for(var e="",n=0;n<t.cuts.length;n++)e+='<option value="'+t.cuts[n]+'">'+t.cuts[n]+"</option>";$("#select-cutline").html(e)},getSelectedCutline:function(){return parseInt($("#select-cutline").val())},setSelectedCutline:function(t){$("#select-cutline").val(t)}};