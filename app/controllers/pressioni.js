var args = arguments[0] || {};

function doChiusiDettagli(e) 
{
	e.source.removeEventListener("close", doChiusiDettagli);
	Alloy.Collections.pressioni.fetch();
}

function doAggiungiPressioni()
{
	var wnd = Alloy
		.createController("dettagli_pressioni", {modello: Alloy.createModel("pressioni")})
		.getView();
	wnd.addEventListener("close", onChiusiDettagli);
	wnd.open();
}

function doTransform(model)
{
	var o = model.toJSON();
	o.testo_pressione = o.massima + " / " + o.minima;
	if (o.automisurazione)
	{
		o.tipo = "Automisurazione";
	}
	else
	{
		o.tipo = "Rilevata da altri";
	}
	return o;
}

function doRefresh()
{
	Alloy.collections.pressioni.fetch();
}

doRefresh()
