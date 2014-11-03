var datiTerapie = Alloy.Collections.terapie;
var args = arguments[0] || {};

function doTransform(model) 
{
	var o = model.toJSON();
	o.nome = o.nome + " (" + o.ora + ")";
	return o;
}

function onChiusiDettagli(e) 
{
	e.source.removeEventListener("close", onChiusiDettagli);
	Alloy.Collections.terapie.fetch();
}

function onAggiungiTerapia() {
	var wnd = Alloy
		.createController("dettagli_terapia", {modello: Alloy.createModel("terapie")})
		.getView();
	wnd.addEventListener("close", onChiusiDettagli);
	wnd.open();
}

function onItemClick(e) 
{
	var terapia_id = $.list.getSections()[e.sectionIndex].items[e.itemIndex].properties.terapia_id;
	var item = datiTerapie.get(terapia_id);
	var wnd = Alloy
		.createController("dettagli_terapia", {modello: item})
		.getView();
	wnd.addEventListener("close", onChiusiDettagli);
	wnd.open();
}

function refresh()
{
	datiTerapie.fetch();
}

$.terapie.open();
refresh();
