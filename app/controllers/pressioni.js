var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function doChiudiDettagli(e) 
{
	e.source.removeEventListener("close", doChiudiDettagli);
	doRefresh();
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
	var item = Alloy.Collections.pressione.get(pressione_id);
	var wnd = Alloy
		.createController("dettagli_pressioni", {modello: item})
		.getView();
	wnd.addEventListener("close", doChiudiDettagli);
	wnd.open();
}

function doTransform(model)
{
	var o = model.toJSON();
	o.testo_pressione = o.massima + " / " + o.minima;
	if (StringUtils.string2logic(o.automisurazione))
	{
		o.tipo = "Automisurazione";
	}
	else
	{
		o.tipo = "Rilevata da altri";
	}

	if (o.nota)
	{
		o.tipo += ". " + o.nota;
	}

	o.testo_data = StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(o.rilevazione));
	return o;
}

function doRefresh()
{
	Alloy.Collections.pressione.fetch({
		query: 'select * from pressione order by rilevazione desc'
	});
}

doRefresh()
$.doAggiungiPressioni = doAggiungiPressioni;
