var args = arguments[0] || {};

function doVaiMemofarma(e)
{
    Alloy.createController("tabprincipale").getView().open();
    Ti.App.Properties.setBool("non_responsabilita_aperto", true);
}

function init() 
{
	var currentLocale = Titanium.Locale.currentLanguage;
	if(currentLocale!=="it" && currentLocale!=="en") 
	{
		currentLocale = "en";
	}
	$.paginaweb.url = "/nonresponsabilita/nonresponsabilita-" + currentLocale + ".html";
}

init();
$.non_responsabilita.open();
