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

function onSalva() {
	if ($.tf_nome.value.length == 0) {
		alert(L("alert_dettagli_nome_farmaco"));
		return;
	}

	if ($.tf_dose.value.length == 0) {
		alert(L("alert_dettagli_dose_farmaco"));
		return;
	}

	if (args.modello) {
		args.modello.set({
			nome: $.tf_nome.value,
			dose: $.tf_dose.value,
			stato: "true"
		});

		args.modello.save();
	}
	$.dettagli_somministrazione.close();
}

function onCancella() {
	if (args.modello) {
		args.modello.destroy();
	}
	$.dettagli_somministrazione.close();
}

function doRefreshData()
{
	var data = StringUtils.sqlToTimestamp(args.modello.get("quando"));
	$.lb_rilevazione.text = StringUtils.formattaDataOra(data);
}

function doScegliOra()
{
	var data;

	data = StringUtils.sqlToTimestamp(args.modello.get("quando"));

	Ti.API.info("Quando sceglie ora: " + args.modello.get("quando"));

	var picker = Ti.UI.createPicker({
  		value:data
	});

	picker.showTimePickerDialog({
		value: data,
		callback: function(e) {
			if (e.cancel) return;
			data.setHours(e.value.getHours());
			data.setMinutes(e.value.getMinutes());
			args.modello.set({quando: StringUtils.timestampToSql(data)});
			doRefreshData();
		}
	});
}

function doScegliData()
{
	var data = StringUtils.sqlToTimestamp(args.modello.get("quando"));

	Ti.API.info("Quando sceglie data: " + args.modello.get("quando"));

	var picker = Ti.UI.createPicker({
  		value:data
	});

	picker.showDatePickerDialog({
		value: data,
		callback: function(e) {
			if (e.cancel) return;
			data.setFullYear(e.value.getFullYear());
			data.setMonth(e.value.getMonth());
			data.setDate(e.value.getDate());
			args.modello.set({quando: StringUtils.timestampToSql(data)});
			doRefreshData();
		}
	});
}


function onOpen() {
	if (args.modello) {
		$.tf_nome.value = args.modello.get("nome") || "";
		$.tf_dose.value = args.modello.get("dose") || "";

		if (!args.modello.get("somministrazione_id")) {
			$.dettagli_somministrazione.activity.actionBar.title = L("lb_nuova_somministrazione");
		} else {
			$.dettagli_somministrazione.activity.actionBar.title = L("lb_dettagli_somministrazione");
		}

		doRefreshData();
	}
	$.dettagli_somministrazione.activity.invalidateOptionsMenu();
}

$.dettagli_somministrazione.addEventListener("open", onOpen);
