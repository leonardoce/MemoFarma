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
		alert("Inserire correttamente la pressione massima");
		return;
	}

	if (!StringUtils.stringIsInteger(minima))
	{
		alert("Inserire correttamente la pressione minima");
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

		doRefreshData();
	}
}

