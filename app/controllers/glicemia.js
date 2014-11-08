var args = arguments[0] || {};
var StringUtils = require("StringUtils");
var GestoreReport = require("GestoreReport");

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
	var testo = GestoreReport.generaReportGlicemiaCSV(Alloy.Collections.glicemia.toJSON());
	var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_glicemia.csv')
	Ti.API.info(testo);
	f.write(testo);

	var dialog = Ti.UI.createEmailDialog();
	if (!dialog.isSupported())
	{
		alert("Il tuo telefono non ha un indirizzo di mail collegato. Non posso inviare il report.");
		return;
	}

	dialog.setSubject("Report glicemia, formato CSV");
	dialog.setHtml(false);
	dialog.setMessageBody("Allego quanto in oggetto");
	dialog.addAttachment(f);
	dialog.open();
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
$.doReport = doReport;
