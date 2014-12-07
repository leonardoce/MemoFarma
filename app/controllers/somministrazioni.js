var args = arguments[0] || {};
var StringUtils = require("StringUtils");
var GestoreReport = require("GestoreReport");
var EmailUtils = require("EmailUtils");
var moment = require("moment-with-locales");

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

function caricaMese(data)
{
    Alloy.Collections.somministrazione.fetch({
	query: {
	    statement: 'select * from somministrazione where quando like ? order by quando',
	    params: [
		StringUtils.timestampToSql(data).substring(0, 6) + "%"
	    ]
	}
    });

    Ti.API.info(data);
    $.somministrazioni.title = "Somministrazioni: " + moment(data).format("MMMM YYYY");
}

function caricaGiorno(data)
{
    Alloy.Collections.somministrazione.fetch({
	query: {
	    statement: 'select * from somministrazione where quando like ? order by quando',
	    params: [
		StringUtils.timestampToSql(data).substring(0, 8) + "%"
	    ]
	}
    });

    $.somministrazioni.title = "Somministrazioni: " + moment(data).format("LL");
}

$.doReport = doReport;
$.doReportHTML = doReportHTML;
$.caricaTutte = caricaTutte;
$.caricaMese = caricaMese;
$.caricaGiorno = caricaGiorno;
