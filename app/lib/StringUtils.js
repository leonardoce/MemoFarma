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
 * Trasforma un booleano nella rappresentazione stringa
 */
function logic2string(v)
{
	if (v)
	{
		return "1";
	}
	else
	{
		return "0";
	}
}

/**
 * Controlla se una stringa rappresenta un intero
 */
function stringIsInteger(s)
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

/**
 * Formatta un oggetto data in modo da renderlo proponibile per le interfacce
 */
function formattaDataOra(d)
{
	d = new Date(d);
	return d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear() +
		" - " + d.getHours() + ":" + d.getMinutes();
}

/**
 * Formatta il timestamp in un formato memorizzabile su database
 */
function timestampToSql(d)
{
	var result = "";
	result += formatNumber(d.getFullYear(), 4);
	result += formatNumber(d.getMonth()+1, 2);
	result += formatNumber(d.getDate(), 2);
	result += formatNumber(d.getHours(), 2);
	result += formatNumber(d.getMinutes(), 2);
	return result;
}

/**
 * Prende un timestamp in formato SQL e lo porta in oggetto data
 */
function sqlToTimestamp(s)
{
	if (s.length!=12)
	{
		return null;
	}

	var result = new Date();
	result.setFullYear(stringToNumber(s.substring(0, 4)));
	result.setMonth(stringToNumber(s.substring(4, 6))-1);
	result.setDate(stringToNumber(s.substring(6, 8)));
	result.setHours(stringToNumber(s.substring(8, 10)));
	result.setMinutes(stringToNumber(s.substring(10, 12)));
	return result;
}

exports.dateToOra = dateToOra;
exports.oraToDate = oraToDate;
exports.oraToList = oraToList;
exports.formatNumber = formatNumber;
exports.box = box;
exports.stosingle = stosingle;
exports.stringToNumber = stringToNumber;
exports.string2logic = string2logic;
exports.logic2string = logic2string;
exports.stringIsInteger = stringIsInteger;
exports.formattaDataOra = formattaDataOra;
exports.timestampToSql = timestampToSql;
exports.sqlToTimestamp = sqlToTimestamp;
