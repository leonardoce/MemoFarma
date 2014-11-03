var args = arguments[0] || {};
var OraUtils = require("OraUtils");

function onSalva()
{
	if ($.tf_nome.value.length==0) 
	{
		alert("Inserisci il nome della terapia");
		return;
	}

	if ($.tf_dose.value.length==0) 
	{
		alert("Inserisci la dose che devi assumere");
		return;
	}

	if (args.modello)
	{
		args.modello.set({ 
			nome: $.tf_nome.value,
			dose: $.tf_dose.value,
			ora: OraUtils.dateToOra($.pk_ora.value)
		});

		args.modello.save();
	}	

	$.dettagli_terapia.close();
}

function onCancella()
{
	if (args.modello)
	{
		args.modello.destroy();
	}

	$.dettagli_terapia.close();
}

function onOpen()
{
	if (args.modello) 
	{
		$.tf_nome.value = args.modello.get("nome") || "";
		$.tf_dose.value = args.modello.get("dose") || "";
		if (args.modello.get("ora"))
		{
			$.pk_ora.value = OraUtils.oraToDate(args.modello.get("ora"));
		}

		if (!args.modello.get("terapia_id"))
		{
			$.dettagli_terapia.activity.actionBar.title = "Nuova terapia";
		}
		else
		{
			$.dettagli_terapia.activity.actionBar.title = "Dettagli terapia";
		}
	}
}

$.dettagli_terapia.addEventListener("open", onOpen);
