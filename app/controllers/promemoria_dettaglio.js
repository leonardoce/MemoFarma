var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function salva(stato)
{
	if (!args.terapia)
	{
		return;
	}

    Ti.API.info(stato);

	Alloy.createModel("somministrazione", {
		quando: StringUtils.timestampToSql(new Date()),
		nome: args.terapia.nome,
		dose: args.terapia.dose,
		ora_richiesta: args.terapia.ora,
		stato: StringUtils.logic2string(stato)
	}).save();
}

function doPresa()
{
	salva(true);
	if (args.close)
	{
		args.close();
	}
}

function doNonLaPrendo()
{
	salva(false);
	if (args.close)
	{
		args.close();
	}
}

function doPostLayout()
{
    var larghezza = $.contenitore.size.width;
    larghezza = larghezza - $.lb_presa.size.width;
    larghezza = larghezza - $.lb_non_presa.size.width;

    $.spaziatore.width = larghezza;
}

if (args.terapia)
{
	$.ora.text = args.terapia.ora;
	$.farmaco.text = args.terapia.nome + " (" + args.terapia.dose + ")";
}
