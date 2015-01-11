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
		alert(L("alert_report_vuoto"));
	}
	else
	{
		var testo = GestoreReport.generaReportPressioniCSV(dati);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_pressione.csv');
		Ti.API.info(testo);
		f.write(testo);

		EmailUtils.inviaMail(L("lb_report_pressione_csv"), L("lb_allego_quanto_in_oggetto"), f);
	}
}

function doReportHTML()
{
	var dati = Alloy.Collections.pressione.toJSON();

	if (dati.length===0)
	{
		alert(L("alert_report_vuoto"));
	}
	else
	{
		var testo = GestoreReport.generaReportPressioniHTML(dati);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_pressione.html');
		Ti.API.info(testo);
		f.write(testo);

		EmailUtils.inviaMail(L("lb_report_pressione_html"), L("lb_allego_quanto_in_oggetto"), f);
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
		o.tipo = L("cb_automisurazione");
	}
	else
	{
		o.tipo = L("lb_rilevata_altri");
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
		query: {
			statement:'select * from pressione where rilevazione>=? order by rilevazione desc',
			params:[StringUtils.timestampToSql(moment().subtract(2,'month').toDate())]
		}
	});
}

doRefresh();
$.doAggiungiPressioni = doAggiungiPressioni;
$.doReport = doReport;
$.doReportHTML = doReportHTML;
