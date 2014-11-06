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
		result = "0" + result;
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
		result.setHours(stringToNumber(sp[0]));
		result.setMinutes(stringToNumber(sp[1]));

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

/**
 * Trasforma una stringa in un numero
 */
function stringToNumber(s)
{
	return parseInt(s, 10);
}

/**
 * Trasforma una stringa in un valore booleano
 */
function string2logic(s)
{
	if (!s)
	{
		return false;
	}
	else if (s.toLowerCase().indexOf("s")!=(-1))
	{
		return true;
	}
	else if (s.toLowerCase().indexOf("y")!=(-1))
	{
		return true;
	}
	else if (s.toLowerCase().indexOf("1")!=(-1))
	{
		return true;
	}
	else if (s.toLowerCase().indexOf("t")!=(-1))
	{
		return true;
	}
	else
	{
		return false;
	}
}

/**
 * Controlla se una stringa rappresenta un intero
 */
function stringIsNumber(s)
{
	if (!s)
	{
		return false;
	}

	s = s.trim().toLowerCase();
	if (s=="0")
	{
		return true;
	}
	else
	{
		return stringToNumber(s)!=0;
	}
}

exports.dateToOra = dateToOra;
exports.oraToDate = oraToDate;
exports.oraToList = oraToList;
exports.formatNumber = formatNumber;
exports.box = box;
exports.stosingle = stosingle;
exports.stringToNumber = stringToNumber;
exports.string2logic = string2logic;
exports.stringIsNumber = stringIsNumber;
