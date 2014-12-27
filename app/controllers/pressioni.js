var args = arguments[0] || {};
var StringUtils = require("StringUtils");
var GestoreReport = require("GestoreReport");
var EmailUtils = require("EmailUtils");

function doChiudiDettagli(e) 
{
	e.source.removeEventListener("close", doChiudiDettagli);
	doRefresh();
}

function doAggiungiPressioni()
{
	var wnd = Alloy
		.createController("dettagli_pressioni", {modello: Alloy.createModel("pressione", {rilevazione:StringUtils.timestampToSql(new Date())})})
		.getView();
	wnd.addEventListener("close", doChiudiDettagli);
	wnd.open();
}

function doReport()
{
	var dati = Alloy.Collections.pressione.toJSON();
	
	if (dati.length===0)
	{
		alert("Il report e' vuoto");
	}
	else
	{
		var testo = GestoreReport.generaReportPressioniCSV(dati);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_pressione.csv');
		Ti.API.info(testo);
		f.write(testo);
	
		EmailUtils.inviaMail("Report pressioni, formato CSV", "Allego quanto in oggetto", f);
	}
}

function doReportHTML()
{
	var dati = Alloy.Collections.pressione.toJSON();
	
	if (dati.length===0)
	{
		alert("Il report e' vuoto");
	}
	else
	{
		var testo = GestoreReport.generaReportPressioniHTML(dati);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_pressione.html');
		Ti.API.info(testo);
		f.write(testo);
	
		EmailUtils.inviaMail("Report pressioni, formato HTML", "Allego quanto in oggetto", f);
	}
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

doRefresh();
$.doAggiungiPressioni = doAggiungiPressioni;
$.doReport = doReport;
$.doReportHTML = doReportHTML;
