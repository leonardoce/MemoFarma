var args = arguments[0] || {};

function onHomeIcon(e) {
	$.tutorial.close();
}

var currentLocale = Titanium.Locale.currentLanguage;
if(currentLocale!=="it" && currentLocale!=="en") 
{
	currentLocale = "en";
}
$.paginaweb.url = "/tutorial/tutorial-" + currentLocale + ".html";
$.tutorial.open();
