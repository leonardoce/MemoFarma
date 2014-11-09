var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function onSalva()
{
	if ($.tf_nome.value.length==0) 
	{
		alert("Inserisci il nome della farmaco");
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
			ora: StringUtils.dateToOra($.pk_ora.value)
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
			$.pk_ora.value = StringUtils.oraToDate(args.modello.get("ora"));
		}

		if (!args.modello.get("terapia_id"))
		{
			$.dettagli_terapia.activity.actionBar.title = "Nuovo farmaco";
		}
		else
		{
			$.dettagli_terapia.activity.actionBar.title = "Dettagli farmaco";
		}
	}
}

$.dettagli_terapia.addEventListener("open", onOpen);
