function dateToOra(d)
{
	return d.getHours() + ":" + d.getMinutes();
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

exports.dateToOra = dateToOra;
exports.oraToDate = oraToDate;

