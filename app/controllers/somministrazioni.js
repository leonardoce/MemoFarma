var args = arguments[0] || {};
var StringUtils = require("StringUtils");
var GestoreReport = require("GestoreReport");
var EmailUtils = require("EmailUtils");

function doReport()
{
    var testo = GestoreReport.generaReportPressioniCSV(Alloy.Collections.pressione.toJSON());
    var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_pressione.csv');
    Ti.API.info(testo);
    f.write(testo);

    EmailUtils.inviaMail("Report pressioni, formato CSV", "Allego quanto in oggetto", f);
}

function doReportHTML()
{
    var testo = GestoreReport.generaReportPressioniHTML(Alloy.Collections.pressione.toJSON());
    var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_pressione.html');
    Ti.API.info(testo);
    f.write(testo);

    EmailUtils.inviaMail("Report pressioni, formato HTML", "Allego quanto in oggetto", f);
}

function doTransform(model)
{
    var o = model.toJSON();
    if (StringUtils.string2logic(o.stato))
    {
	o.stato = "/images/bt_ok.png";
    }
    else
    {
	o.stato = "/images/bt_cancel.png";
    }

    o.testo_data = StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(o.quando));
    return o;
}

function doHomeClick()
{
    $.somministrazioni.close();
}

function caricaTutte()
{
    Alloy.Collections.somministrazione.fetch({
	query: 'select * from somministrazione order by quando desc'
    });
}

$.doReport = doReport;
$.doReportHTML = doReportHTML;
$.caricaTutte = caricaTutte;
