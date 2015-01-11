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

var StringUtils = require("StringUtils");
var moment = require("moment-with-locales");
var args = arguments[0] || {};
var GestoreAllarmi = require("GestoreAllarmi");

function doTransform(model) {
	var o = model.toJSON();
	o.nome = o.nome.toUpperCase() + " (" + o.ora + ")";
	o.inizio = StringUtils.formattaData(StringUtils.sqlToTimestamp(o.data_inizio));

	if (o.considera_data_fine !== 0) {
		o.fine = StringUtils.formattaData(StringUtils.sqlToTimestamp(o.data_fine));
		o.visualizza_fine = true;
	} else {
		o.fine = L("lb_N_A");
		o.visualizza_fine = false;
	}
	return o;
}

function onChiusiDettagli(e) {
	e.source.removeEventListener("close", onChiusiDettagli);
	GestoreAllarmi.attivaGestioneAllarmi();
	refresh();
}

function onAggiungiTerapia() {
	var nuovoModello = Alloy.createModel("terapie");
	var oggi = new Date();
	var fraUnAnno = moment().add(1, 'year').toDate();

	nuovoModello.set({
		data_inizio : StringUtils.timestampToSql(new Date()),
		data_fine : StringUtils.timestampToSql(fraUnAnno)
	});
	var wnd = Alloy.createController("dettagli_terapia", {
		modello : nuovoModello
	}).getView();
	wnd.addEventListener("close", onChiusiDettagli);
	wnd.open();
}

function onItemClick(e) {
	var terapia_id = $.list.getSections()[e.sectionIndex].items[e.itemIndex].properties.terapia_id;
	var item = Alloy.Collections.terapie.get(terapia_id);
	var wnd = Alloy.createController("dettagli_terapia", {
		modello : item
	}).getView();
	wnd.addEventListener("close", onChiusiDettagli);
	wnd.open();
}

function refresh() {
	Alloy.Collections.terapie.fetch({
		query : "SELECT * FROM terapie ORDER BY ora"
	});
}

refresh();

$.onAggiungiTerapia = onAggiungiTerapia;
