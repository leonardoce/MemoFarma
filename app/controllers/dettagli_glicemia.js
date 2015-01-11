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
	var glicemia = $.tf_glicemia.value.trim();

	if (!StringUtils.stringIsInteger(glicemia))
	{
		alert(L("alert_glicemia"));
		return;
	}

	if (args.modello)
	{
		args.modello.set({
			glicemia: glicemia,
			nota: $.ta_nota.value
		});

		args.modello.save();
	}

	$.dettagli_glicemia.close();
}

function doCancella()
{
	if (args.modello)
	{
		args.modello.destroy();
	}

	$.dettagli_glicemia.close();
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
		$.tf_glicemia.value = args.modello.get("glicemia");
		$.ta_nota.value = args.modello.get("nota");

		if (!args.modello.get("glicemia_id")) {
			$.dettagli_glicemia.activity.actionBar.title = L("lb_nuova_glicemia");
		} else {
			$.dettagli_glicemia.activity.actionBar.title = L("lb_dettagli_glicemia");
		}

		doRefreshData();
	}
	$.dettagli_glicemia.activity.invalidateOptionsMenu();
}
