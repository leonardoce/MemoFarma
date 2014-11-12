var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function salva(stato)
{
	if (!args.terapia)
	{
		return;
	}

	Alloy.createModel("somministrazione", {
		quando: StringUtils.timestampToSql(new Date()),
		nome: args.terapia.nome,
		dose: args.terapia.dose,
		ora_richiesta: args.terapia.ora,
		stato: StringUtils.logic2string(true)
	}).save();
}

function doPresa()
{
	salva(false);
	if (args.close)
	{
		args.close();
	}
}

function doNonLaPrendo()
{
	salva(true);
	if (args.close)
	{
		args.close();
	}
}

if (args.terapia)
{
	$.ora.text = args.terapia.ora;
	$.farmaco.text = args.terapia.nome + " (" + args.terapia.dose + ")";
}
