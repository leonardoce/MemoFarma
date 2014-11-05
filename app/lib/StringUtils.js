/**
 * Formatta un numero intero, eventualmente aggiungendo
 * cifre "0" in testa, finche' non ha la lunghezza specificata
 * @param number {Number} il numero da formattare
 * @param length {Number} la lunghezza che si vuole ottenere
 * @return {String} Il numero intero formattato
 */
function formatNumber(number, length)
{
	var result = ""+number;
	while (result.length<length)
	{
		result = result + "0";
	}
	return result;
}

function dateToOra(d)
{
	return formatNumber(d.getHours(), 2) + ":" + formatNumber(d.getMinutes(), 2);
}

function oraToList(s)
{
	var sp = s.split(":");
	return sp;
}

function oraToDate(s)
{
	var result = new Date();
	var sp = s.split(":");

	if (sp.length==2)
	{
		result.setHours(parseInt(sp[0]));
		result.setMinutes(parseInt(sp[1]));

		Ti.API.info(s);
		Ti.API.info(result);
	}

	return result;
}

/**
 * Racchiude una stringa fra parentesi quadre
 */
function box(s)
{
	return "[" + s + "]";
}

/**
 * Trasforma una stringa in attributo XML
 */
function stosingle(s)
{
	var result = "\"";
	
	for (var i=0; i<s.length; i++)
	{
		if (s[i]=="\"")
		{
			result += "&quot;";
		}
		else
		{
			result += s[i];
		}
	}

	result += "\"";

	return result;
}

exports.dateToOra = dateToOra;
exports.oraToDate = oraToDate;
exports.oraToList = oraToList;
exports.formatNumber = formatNumber;
exports.box = box;
exports.stosingle = stosingle;
