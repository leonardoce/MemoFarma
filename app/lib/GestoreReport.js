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
 * Genera il report delle pressioni (json) in una stringa HTML
 */
function generaReportPressioniHTML(pressioni)
{
    var result = "";

    result += "<html><body><h1>Report pressioni</h1>";
    result += "<table>";
    result += "<tr>";
    result += "<th>Data</th>";
    result += "<th>Massima</th>";
    result += "<th>Minima</th>";
    result += "<th>Frequenza</th>";
    result += "<th>Automisurazione</th>";
    result += "<th>Note</th>";
    result += "</tr>";

    for (var i=0; i<pressioni.length; i++)
    {
	var record = pressioni[i];

	result += "<tr>";
	result += "<td>";
	result += StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(record.rilevazione));
	result += "</td>";
	result += "<td>";
	result += record.massima;
	result += "</td>";
	result += "<td>";
	result += record.minima;
	result += "</td>";
	result += "<td>";
	result += record.frequenza;
	result += "</td>";
	result += "<td>";
	result += (record.automisurazione?"s":"n");
	result += "</td>";
	result += "<td>";
	result += togliVirgole(record.nota);
	result += "</td>";
	result += "</tr>";
    }

    result += "</table>";
    result += "</body></html>";

    return result;
}

/**
 * Report glicemia CSV
 */
function generaReportGlicemiaCSV(glicemia)
{
    var result = "";

    result += "DATA,GLICEMIA,NOTE\n";

    for (var i=0; i<glicemia.length; i++)
    {
	var record = glicemia[i];
	result += StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(record.rilevazione)) + ",";
	result += record.glicemia + ",";
	result += togliVirgole(record.nota) + "\n";
    }

    return result;
}

/**
 * Report glicemia HTML
 */
function generaReportGlicemiaHTML(glicemia)
{
    var result = "";

    result += "<html><body><h1>Report pressioni</h1>";
    result += "<table>";
    result += "<tr>";
    result += "<th>Data</th>";
    result += "<th>Glicemia</th>";
    result += "<th>Note</th>";
    result += "</tr>";

    for (var i=0; i<glicemia.length; i++)
    {
	var record = glicemia[i];

	result += "<tr>";
	result += "<td>";
	result += StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(record.rilevazione)) + ",";
	result += "</td>";
	result += "<td>";
	result += record.glicemia + ",";
	result += "</td>";
	result += "<td>";
	result += togliVirgole(record.nota) + "\n";
	result += "</td>";
	result += "</tr>";
    }

    result += "</table>";
    result += "</body></html>";

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

/**
 * Report somministrazioni CSV
 */
function generaReportSomministrazioniCSV(somministrazioni)
{
    var report = "";

    report += "DATA,NOME,DOSE,ORA,PRESA\n";
    for (var i=0; i<somministrazioni.length; i++)
    {
	report += StringUtils.formattaDataOra(
	    StringUtils.sqlToTimestamp(somministrazioni[i].quando)) + ",";
	report += togliVirgole(somministrazioni[i].nome) + ",";
	report += togliVirgole(somministrazioni[i].dose) + ",";
	report += somministrazioni[i].stato + "\n";
    }

    return report;
}

/**
 * Report somministrazioni HTML
 */
function generaReportSomministrazioniHTML(somministrazioni)
{
    var result = "";

    result += "<html><body><h1>Report somministrazioni</h1>";
    result += "<table>";
    result += "<tr>";
    result += "<th>Data</th>";
    result += "<th>Nome e dose farmaco</th>";
    result += "<th>Dose</th>";
    result += "<th>Preso correttamente</th>";
    result += "</tr>";

    for (var i=0; i<somministrazioni.length; i++)
    {
	var record = somministrazioni[i];

	result += "<tr>";
	result += "<td>";
	result += StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(record.quando)) + ",";
	result += "</td>";
	result += "<td>";
	result += record.nome + ",";
	result += record.dose;
	result += "</td>";
	result += "<td>";
	result += record.dose;
	result += "</td>";
	result += "<td>";
	result += StringUtils.string2logic(record.stato)?"ok": "KO";
	result += "</td>";
	result += "</tr>";
    }

    result += "</table>";
    result += "</body></html>";

    return result;
}

exports.generaReportPressioniCSV = generaReportPressioniCSV;
exports.generaReportGlicemiaCSV = generaReportGlicemiaCSV;
exports.generaReportSomministrazioniCSV = generaReportSomministrazioniCSV;
exports.generaReportPressioniHTML = generaReportPressioniHTML;
exports.generaReportGlicemiaHTML = generaReportGlicemiaHTML;
exports.generaReportSomministrazioniHTML = generaReportSomministrazioniHTML;
