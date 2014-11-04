var args = arguments[0] || {};

function onTerapie()
{
	Alloy.createController("terapie").getView().open();
}

function onAiuto()
{
	Alloy.createController("tutorial").getView().open();
}

function doFocus(e)
{
	var titolo = e.tab.titoloPrincipale;
	$.tabprincipale.title = titolo;
}

$.tabprincipale.open();
