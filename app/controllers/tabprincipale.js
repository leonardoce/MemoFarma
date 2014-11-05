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
	var activeIdx = -1;
	var i;
	
	for (i=0; i<$.tabprincipale.tabs.length; i++)
	{
		if ($.tabprincipale.tabs[i] == $.tabprincipale.activeTab)
		{
			activeIdx = i;
		}
	}

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
		$.tabprincipale.setActiveTab($.tabprincipale.tabs[activeIdx]);
	}
}

$.tabprincipale.open();
