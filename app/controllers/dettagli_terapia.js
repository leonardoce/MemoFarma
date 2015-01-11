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
var GestoreAllarmi = require("GestoreAllarmi");

function onSalva() {
	if ($.tf_nome.value.length == 0) {
		alert(L("alert_dettagli_nome_farmaco"));
		return;
	}

	if ($.tf_dose.value.length == 0) {
		alert(L("alert_dettagli_dose_farmaco"));
		return;
	}

	Ti.API.info("Quando salvo: " + args.modello.get("considera_data_fine"));

	if (args.modello) {
		args.modello.set({
			nome : $.tf_nome.value,
			dose : $.tf_dose.value,
			ora : StringUtils.dateToOra($.pk_ora.value)
		});

		GestoreAllarmi.attivaGestioneAllarmi();

		args.modello.save();
	}

	$.dettagli_terapia.close();
}

function onCancella() {
	if (args.modello) {
		GestoreAllarmi.cancellaAllarmePerTerapia(args.modello);
		args.modello.destroy();
	}

	$.dettagli_terapia.close();
}

function doRefreshDataInizio() {
	var data = StringUtils.sqlToTimestamp(args.modello.get("data_inizio"));
	$.lb_data_inizio.text = StringUtils.formattaData(data);
}

function doRefreshDataFine() {
	Ti.API.info("data fine: " + args.modello.get("considera_data_fine"));
	$.sw_considera_data_fine.value = args.modello.get("considera_data_fine") !== 0;

	if ($.sw_considera_data_fine.value) {
		var data = StringUtils.sqlToTimestamp(args.modello.get("data_fine"));
		$.lb_data_fine.text = StringUtils.formattaData(data);
		$.bt_scegli_data_fine.show();
	} else {
		$.lb_data_fine.text = "N.A.";
		$.bt_scegli_data_fine.hide();
	}
}

function doClickConsideraDataFine() {
	args.modello.set({
		considera_data_fine : $.sw_considera_data_fine.value ? 1 : 0
	});
	doRefreshDataFine();
}

function doScegliDataInizio() {
	var data = StringUtils.sqlToTimestamp(args.modello.get("data_inizio"));

	var picker = Ti.UI.createPicker({
		value : data
	});

	picker.showDatePickerDialog({
		value : data,
		callback : function(e) {
			if (e.cancel)
				return;
			data.setFullYear(e.value.getFullYear());
			data.setMonth(e.value.getMonth());
			data.setDate(e.value.getDate());
			args.modello.set({
				data_inizio : StringUtils.timestampToSql(data)
			});
			doRefreshDataInizio();
		}
	});
}

function doScegliDataFine() {
	var data = StringUtils.sqlToTimestamp(args.modello.get("data_fine"));

	var picker = Ti.UI.createPicker({
		value : data
	});

	picker.showDatePickerDialog({
		value : data,
		callback : function(e) {
			if (e.cancel)
				return;
			data.setFullYear(e.value.getFullYear());
			data.setMonth(e.value.getMonth());
			data.setDate(e.value.getDate());
			args.modello.set({
				data_fine : StringUtils.timestampToSql(data)
			});
			doRefreshDataFine();
		}
	});
}

function onOpen() {
	if (args.modello) {
		$.tf_nome.value = args.modello.get("nome") || "";
		$.tf_dose.value = args.modello.get("dose") || "";
		if (args.modello.get("ora")) {
			$.pk_ora.value = StringUtils.oraToDate(args.modello.get("ora"));
		}

		if (!args.modello.get("terapia_id")) {
			$.dettagli_terapia.activity.actionBar.title = L("lb_nuovo_farmaco");
		} else {
			$.dettagli_terapia.activity.actionBar.title = L("lb_dettagli_farmaco");
		}

		doRefreshDataInizio();
		doRefreshDataFine();
	}
	$.dettagli_terapia.activity.invalidateOptionsMenu();
}

$.dettagli_terapia.addEventListener("open", onOpen);
