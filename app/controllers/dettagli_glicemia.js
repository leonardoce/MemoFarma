var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function doSalva()
{
	var glicemia = $.tf_glicemia.value.trim();

	if (!StringUtils.stringIsInteger(glicemia))
	{
		alert("Inserire correttamente la rilevazione glicemica");
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

		doRefreshData();
	}
}
