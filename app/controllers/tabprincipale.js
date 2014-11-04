var args = arguments[0] || {};

function onTerapie()
{
	Alloy.createController("terapie").getView().open();
}

function onAiuto()
{
	Alloy.createController("tutorial").getView().open();
}

$.tabprincipale.open();
