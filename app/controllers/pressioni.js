var args = arguments[0] || {};

function doChiudiDettagli(e) 
{
	e.source.removeEventListener("close", doChiudiDettagli);
	Alloy.Collections.pressione.fetch();
}

function doAggiungiPressioni()
{
	var wnd = Alloy
		.createController("dettagli_pressioni", {modello: Alloy.createModel("pressione")})
		.getView();
	wnd.addEventListener("close", doChiudiDettagli);
	wnd.open();
}

function doItemClick(e) 
{
	var pressione_id = $.list.getSections()[e.sectionIndex].items[e.itemIndex].properties.pressione_id;
	var item = Alloy.Collections.pressioni.get(pressione_id);
	var wnd = Alloy
		.createController("dettagli_pressione", {modello: item})
		.getView();
	wnd.addEventListener("close", onChiudiDettagli);
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
	Alloy.Collections.pressione.fetch();
}

doRefresh()
$.doAggiungiPressioni = doAggiungiPressioni;
