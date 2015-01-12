// This file is part of MemoFarma.
//
// MemoFarma is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// MemoFarma is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with MemoFarma.  If not, see <http://www.gnu.org/licenses/>.

var StringUtils = require("StringUtils");
var moment = require("moment-with-locales");
var Handlebars = require("handlebars");

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
    result += "<th>Nome</th>";
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
	result += record.nome;
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

function notSameDay(m1, m2)
{
    if(m1.date()!=m2.date()) {
        return true;
    }

    if(m1.month()!=m2.month()) {
        return true;
    }

    if(m1.year()!=m2.year()) {
        return true;
    }

    return false;
}

function createCompleteReport()
{
    // Now we load the data
    var pressioni = Alloy.createCollection("pressione");
    var glicemia = Alloy.createCollection("glicemia");
    var somministrazione = Alloy.createCollection("somministrazione");

    pressioni.fetch({
	query: {
	    statement:'select * from pressione where rilevazione>=?',
	    params:[StringUtils.timestampToSql(moment().subtract(3,'month').toDate())]
	}
    });
    
    glicemia.fetch({
	query: {
	    statement:'select * from glicemia where rilevazione>=?',
	    params:[StringUtils.timestampToSql(moment().subtract(3,'month').toDate())]
	}
    });

    somministrazione.fetch({
	query: {
	    statement: 'select * from somministrazione where quando>=?',
	    params: [
		StringUtils.timestampToSql(moment().subtract(3,'month').toDate())
	    ]
	}
    });

    pressioni = pressioni.toJSON();
    glicemia = glicemia.toJSON();
    somministrazione = somministrazione.toJSON();

    for(var i=0; i<somministrazione.length; i++)
    {
        somministrazione[i].rilevazione = somministrazione[i].quando;
    }

    var allData = pressioni.concat(glicemia,somministrazione);
    allData = allData.sort(function(a,b) {
        if(a.rilevazione<b.rilevazione) {
            return -1;
        } else if(a.rilevazione==b.rilevazione) {
            return 0;
        } else {
            return 1;
        }
    });

    // These are the report sections
    var report = Handlebars.compile("<html><body><h1>Complete Report</h1>{{{body}}}</body></html>");
    var reportNewDay = Handlebars.compile("<h2>{{day}}</h2>");
    var pressure = Handlebars.compile("<b>{{time}}</b>: max {{max}} min {{min}} rate {{rate}}<br>");
    var sugar = Handlebars.compile("<b>{{time}}</b>: blood sugar {{sugar}}<br>");
    var pills = Handlebars.compile("<b>{{time}}</b>: pill {{name}}</br>");

    // Write the report
    var currentDay = null;
    var body = "";

    while (allData.length>0) {
        var record = allData.shift();
        var currentTs = moment(StringUtils.sqlToTimestamp(record.rilevazione));

        if(currentDay==null || notSameDay(currentDay, currentTs)) {
            currentDay = moment(currentTs).hour(0).minutes(0);
            body += reportNewDay({day: currentDay.format("LL")});
        }

        if(record.massima) {
            body += pressure({time: currentTs.format("LT"),
                              max: record.massima,
                              min: record.minima,
                              rate: record.frequenza});
        }

        if(record.dose) {
            body += pills({time: currentTs.format("LT"),
                           name: record.nome + " " + record.dose});
        }

        if(record.glicemia) {
            body += sugar({nome: currentTs.format("LT"),
                           sugar: record.glicemia,
                           time: currentTs.format("LT")});
        }
    }

    var result = report({body: body});
    return result;
}

exports.generaReportPressioniCSV = generaReportPressioniCSV;
exports.generaReportGlicemiaCSV = generaReportGlicemiaCSV;
exports.generaReportSomministrazioniCSV = generaReportSomministrazioniCSV;
exports.generaReportPressioniHTML = generaReportPressioniHTML;
exports.generaReportGlicemiaHTML = generaReportGlicemiaHTML;
exports.generaReportSomministrazioniHTML = generaReportSomministrazioniHTML;
exports.createCompleteReport = createCompleteReport;
