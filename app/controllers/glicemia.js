var args = arguments[0] || {};
var StringUtils = require("StringUtils");
var GestoreReport = require("GestoreReport");
var EmailUtils = require("EmailUtils");
var moment = require("moment-with-locales");

function doChiudiDettagli(e) 
{
	e.source.removeEventListener("close", doChiudiDettagli);
	doRefresh();
}

function doAggiungiGlicemia()
{
	var wnd = Alloy
		.createController("dettagli_glicemia", {modello: Alloy.createModel("glicemia", {rilevazione:StringUtils.timestampToSql(new Date())})})
		.getView();
	wnd.addEventListener("close", doChiudiDettagli);
	wnd.open();
}

function doReport()
{
	var dati = Alloy.Collections.glicemia.toJSON();
	
	if (dati.length===0)
	{
		alert(L("alert_report_vuoto"));
	}
	else
	{	
		var testo = GestoreReport.generaReportGlicemiaCSV(dati);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_glicemia.csv');
		Ti.API.info(testo);
		f.write(testo);
	
		EmailUtils.inviaMail(L("lb_report_glicemia_csv"), L("lb_allego_quanto_in_oggetto"), f);
	}
}

function doReportHTML()
{
	var dati = Alloy.Collections.glicemia.toJSON();
	
	if (dati.length===0)
	{
		alert(L("alert_report_vuoto"));
	}
	else
	{
		var testo = GestoreReport.generaReportGlicemiaCSV(dati);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_glicemia.html');
		Ti.API.info(testo);
		f.write(testo);
	
		EmailUtils.inviaMail(L("lb_report_glicemia_html"), L("lb_allego_quanto_in_oggetto"), f);
	}
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
		query: {
			statement:'select * from glicemia where rilevazione>=? order by rilevazione desc',
			params:[StringUtils.timestampToSql(moment().subtract(2,'month').toDate())]
		}
	});
}

doRefresh();
$.doAggiungiGlicemia = doAggiungiGlicemia;
$.doReport = doReport;
$.doReportHTML = doReportHTML;
