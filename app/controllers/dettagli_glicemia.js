var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function doSalva()
{
	var glicemia = $.tf_glicemia.value.trim();
	var rilevazione_data = $.pk_rilevazione_data.value;
	var rilevazione_ora = $.pk_rilevazione_ora.value;

	var rilevazione = new Date(rilevazione_data);
	rilevazione.setHours(rilevazione.getHours());
	rilevazione.setMinutes(rilevazione.getMinutes());

	if (!StringUtils.stringIsInteger(glicemia))
	{
		alert("Inserire correttamente la rilevazione glicemica");
		return;
	}

	if (args.modello)
	{
		args.modello.set({
			glicemia: glicemia,
			rilevazione: StringUtils.timestampToSql(rilevazione),
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

function doOpen()
{
	if (args.modello)
	{
		$.tf_glicemia.value = args.modello.get("glicemia");
		$.ta_nota.value = args.modello.get("nota");

		if (args.modello.get("rilevazione"))
		{
			$.pk_rilevazione_data = StringUtils.sqlToTimestamp(args.modello.get("rilevazione"));
			$.pk_rilevazione_ora = StringUtils.sqlToTimestamp(args.modello.get("rilevazione"));
		}
	}
}
