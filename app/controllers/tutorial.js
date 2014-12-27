var args = arguments[0] || {};

var currentLocale = Titanium.Locale.currentLanguage;
if(currentLocale!=="it" && currentLocale!=="en") 
{
	currentLocale = "en";
}
$.paginaweb.url = "/tutorial/tutorial-" + currentLocale + ".html";
$.tutorial.open();
