// This file is part of MemoFarma.
//
// MemoFarma is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// MemoFarma is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with MemoFarma.  If not, see <http://www.gnu.org/licenses/>.

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
