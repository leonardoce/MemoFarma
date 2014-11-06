var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function doSalva()
{
	var massima = $.tf_massima.value.trim();
	var minima = $.tf_minima.value.trim();
	var frequenza = $.tf_frequenza.value.trim();
	var automisurazione = $.cb_automisurazione.value;
	var rilevazione_data = $.pk_rilevazione_data.value;
	var rilevazione_ora = $.pk_rilevazione_ora.value;

	var rilevazione = new Date(rilevazione_data);
	rilevazione.setHours(rilevazione.getHours());
	rilevazione.setMinutes(rilevazione.getMinutes());

	if (!StringUtils.stringIsInteger(massima))
	{
		alert("Inserire correttamente la pressione massima");
	}

	if (!StringUtils.stringIsInteger(minima))
	{
		alert("Inserire correttamente la pressione minima");
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
			rilevazione: rilevazione.toISOString()
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

function doOpen()
{
	if (args.modello)
	{
		$.tf_massima.value = args.modello.get("massima");
		$.tf_minima.value = args.modello.get("minima");
		$.tf_frequenza.value = args.modello.get("frequenza");
		$.cb_automisurazione.value = StringUtils.string2logic(args.modello.get("automisurazione"));

		if (args.modello.get("rilevazione"))
		{
			$.pk_rilevazione_data = new Date(args.modello.get("rilevazione"));
			$.pk_rilevazione_ora = new Date(args.modello.get("rilevazione"));
		}
	}
}

