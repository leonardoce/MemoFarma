var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function doChiudiDettagli(e) 
{
	e.source.removeEventListener("close", doChiudiDettagli);
	doRefresh();
}

function doAggiungiGlicemia()
{
	var wnd = Alloy
		.createController("dettagli_glicemia", {modello: Alloy.createModel("glicemia")})
		.getView();
	wnd.addEventListener("close", doChiudiDettagli);
	wnd.open();
}

function doItemClick(e) 
{
	var glicemia_id = $.list.getSections()[e.sectionIndex].items[e.itemIndex].properties.glicemia_id;
	var item = Alloy.Collections.glicemia.get(glicemia_id);
	var wnd = Alloy
		.createController("dettagli_glicemia", {modello: item})
		.getView();
	wnd.addEventListener("close", doChiudiDettagli);
	wnd.open();
}

function doTransform(model)
{
	var o = model.toJSON();
	o.testo_data = StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(o.rilevazione));
	return o;
}

function doRefresh()
{
	Alloy.Collections.glicemia.fetch({
		query: 'select * from glicemia order by rilevazione desc'
	});
}

doRefresh()
$.doAggiungiGlicemia = doAggiungiGlicemia;
