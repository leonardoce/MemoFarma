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
	var TabGroupUtils = require("TabGroupUtils");
	var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);
	if (activeIdx==(-1))
	{
		return;
	}

	if (e.direction=="left")
	{
		activeIdx++;
	}
	else if(e.direction=="right")
	{
		activeIdx--;
	}
	else
	{
		return;
	}

	if (activeIdx>=0 && activeIdx<$.tabprincipale.tabs.length)
	{
		TabGroupUtils.setActiveTabIndex($.tabprincipale, activeIdx);
	}
}

$.tabprincipale.open();
