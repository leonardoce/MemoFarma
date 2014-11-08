var StringUtils = require("StringUtils");

/**
 * Genera il report delle pressioni (json) in una stringa CSV
 */
function generaReportPressioniCSV(pressioni)
{
	var result = "";

	result += "DATA,MASSIMA,MINIMA,FREQUENZA,AUTOMISURAZIONE,NOTE\n";

	for (var i=0; i<pressioni.length; i++)
	{
		var record = pressioni[i];
		result += StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(record.rilevazione)) + ",";
		result += record.massima + ",";
		result += record.minima + ",";
		result += record.frequenza + ",";
		result += (record.automisurazione?"s":"n") + ",";
		result += togliVirgole(record.nota) + "\n";
	}

	return result;
}

/**
 * Toglie tutte le virgole da una stringa (romperebbero il CSV)
 */
function togliVirgole(stringa)
{
	var r = stringa + "";
	r.replace(/,/g, '');
	return r;
}

exports.generaReportPressioniCSV = generaReportPressioniCSV;
