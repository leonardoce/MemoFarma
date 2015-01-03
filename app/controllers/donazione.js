var args = arguments[0] || {};

function onHomeIcon(e) {
	$.donazione.close();
}

var currentLocale = Titanium.Locale.currentLanguage;
if(currentLocale!=="it" && currentLocale!=="en") 
{
	currentLocale = "en";
}
$.paginaweb.url = "/donazioni/donazione-" + currentLocale + ".html";
$.donazione.open();
