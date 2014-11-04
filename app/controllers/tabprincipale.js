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
	if (!e.tab)
	{
		return;
	}

	var titolo = e.tab.titoloPrincipale;
	$.tabprincipale.title = titolo;
}

function doSwipe(e)
{
	Ti.API.info(e.direction);
}

$.tabprincipale.open();
