var args = arguments[0] || {};
var INDICE_PRESSIONI = 1;
var INDICE_GLICEMIE = 2;

function doTerapie()
{
	Alloy.createController("terapie").getView().open();
}

function doAggiungi()
{
	var TabGroupUtils = require("TabGroupUtils");
	var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);

	if (activeIdx==INDICE_PRESSIONI)
	{
		$.pressioni.doAggiungiPressioni();
	}
	else if (activeIdx==INDICE_GLICEMIE)
	{
		$.glicemia.doAggiungiGlicemia();
	}
}

function doReport()
{
	var TabGroupUtils = require("TabGroupUtils");
	var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);

	if (activeIdx==INDICE_PRESSIONI)
	{
		$.pressioni.doReport();
	}
	else if (activeIdx==INDICE_GLICEMIE)
	{
		$.glicemia.doReport();
	}
}

function doReportHTML()
{
	var TabGroupUtils = require("TabGroupUtils");
	var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);

	if (activeIdx==INDICE_PRESSIONI)
	{
		$.pressioni.doReportHTML();
	}
	else if (activeIdx==INDICE_GLICEMIE)
	{
		$.glicemia.doReportHTML();
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
