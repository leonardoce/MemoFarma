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

function doSalva()
{
	var massima = $.tf_massima.value.trim();
	var minima = $.tf_minima.value.trim();
	var frequenza = $.tf_frequenza.value.trim();
	var automisurazione = $.cb_automisurazione.value;

	if (!StringUtils.stringIsInteger(massima))
	{
		alert(L("alert_pressione_massima"));
		return;
	}

	if (!StringUtils.stringIsInteger(minima))
	{
		alert(L("alert_pressione_minima"));
		return;
	}

	if (!StringUtils.stringIsInteger(frequenza))
	{
		frequenza = 0; // non rilevata
	}

	if (args.modello)
	{
		args.modello.set({
			massima: massima,
			minima: minima,
			frequenza: frequenza,
			automisurazione: StringUtils.logic2string(automisurazione),
			nota: $.ta_nota.value
		});

		args.modello.save();
	}

	$.dettagli_pressioni.close();
}

function doCancella()
{
	if (args.modello)
	{
		args.modello.destroy();
	}

	$.dettagli_pressioni.close();
}

function doRefreshData()
{
	var data = StringUtils.sqlToTimestamp(args.modello.get("rilevazione"));
	$.lb_rilevazione.text = StringUtils.formattaDataOra(data);
}

function doScegliOra()
{
	var data;

	data = StringUtils.sqlToTimestamp(args.modello.get("rilevazione"));

	var picker = Ti.UI.createPicker({
  		value:data
	});

	picker.showTimePickerDialog({
		value: data,
		callback: function(e) {
			if (e.cancel) return;
			data.setHours(e.value.getHours());
			data.setMinutes(e.value.getMinutes());
			args.modello.set({rilevazione: StringUtils.timestampToSql(data)});
			doRefreshData();
		}
	});
}

function doScegliData()
{
	var data = StringUtils.sqlToTimestamp(args.modello.get("rilevazione"));

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
			args.modello.set({rilevazione: StringUtils.timestampToSql(data)});
			doRefreshData();
		}
	});
}

function doOpen()
{
	if (args.modello)
	{
		$.tf_massima.value = args.modello.get("massima");
		$.tf_minima.value = args.modello.get("minima");
		$.tf_frequenza.value = args.modello.get("frequenza");
		$.cb_automisurazione.value = StringUtils.string2logic(args.modello.get("automisurazione"));
		$.ta_nota.value = args.modello.get("nota");

		if (!args.modello.get("pressione_id")) {
			$.dettagli_pressioni.activity.actionBar.title = L("lb_nuova_pressione");
		} else {
			$.dettagli_pressioni.activity.actionBar.title = L("lb_dettagli_pressione");
		}

		doRefreshData();
	}
	$.dettagli_pressioni.activity.invalidateOptionsMenu();
}
