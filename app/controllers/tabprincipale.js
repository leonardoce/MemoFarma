var args = arguments[0] || {};

function doTerapie()
{
	Alloy.createController("terapie").getView().open();
}

function doAggiungi()
{
	var TabGroupUtils = require("TabGroupUtils");
	var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);

	if (activeIdx==1)
	{
		$.pressioni.doAggiungiPressioni();
	}
	else if (activeIdx==2)
	{
		$.glicemia.doAggiungiGlicemia();
	}
}

function doReport()
{
	var TabGroupUtils = require("TabGroupUtils");
	var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);

	if (activeIdx==1)
	{
		$.pressioni.doReport();
	}
	else if (activeIdx==2)
	{
		$.glicemia.doReport();
	}
}

function doAiuto()
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
