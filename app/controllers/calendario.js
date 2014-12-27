var StringUtils = require("StringUtils");
var GestoreReport = require("GestoreReport");
var EmailUtils = require("EmailUtils");
var moment = require("moment-with-locales");
var args = arguments[0] || {};
var ROSSO = "#ffc2c2";
var VERDE = "#79e579";

function doClickSuGiorno(evt)
{
    Ti.API.info(evt.data);

    var somministrazioni = Alloy.createController("somministrazioni");
    somministrazioni.caricaGiorno(evt.data);

    if (Alloy.Collections.somministrazione.length===0)
    {
	alert("Nessuna somministrazione presente");
    }
    else
    {
	somministrazioni.getView().open();
    }
}

function doClickSuMese(evt)
{
    Ti.API.info(evt.data);

    var somministrazioni = Alloy.createController("somministrazioni");
    somministrazioni.caricaMese(evt.data);

    if (Alloy.Collections.somministrazione.length===0)
    {
	alert("Nessuna somministrazione presente");
    }
    else
    {
	somministrazioni.getView().open();
    }

    somministrazioni.getView().open();
}

function doRefresh()
{
    var somministrazione = Alloy.createCollection("somministrazione");
    somministrazione.fetch({query:"select * from somministrazione order by stato desc"});
    somministrazione = somministrazione.toJSON();

    var sfondoPerData = {};

    for(var i=0; i<somministrazione.length; i++)
    {
	var quando = StringUtils.sqlToTimestamp(somministrazione[i].quando);

	if(StringUtils.string2logic(somministrazione[i].stato))
	{
	    sfondoPerData[moment(quando).format("YYYY-MM-DD")] = VERDE;
	}
	else
	{
	    sfondoPerData[moment(quando).format("YYYY-MM-DD")] = ROSSO;
	}
    }

    $.cal.setSfondoPerData(sfondoPerData);
}

function doReport()
{
    var anno = $.cal.getAnnoCorrente();
    var mese = $.cal.getMeseCorrente();

    var somministrazione = Alloy.createCollection("somministrazione");
    somministrazione.fetch({
	query: {
	    statement: 'select * from somministrazione where quando like ? order by quando',
	    params: [
		StringUtils.timestampToSql(moment([anno, mese, 1]).toDate()).substring(0, 6) + "%"
	    ]
	}
    });
    somministrazione = somministrazione.toJSON();

	if (somministrazione.length===0) 
	{
		alert("Il report e' vuoto");
	} 
	else
	{
	    var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_somministrazione.csv');
	    f.write(GestoreReport.generaReportSomministrazioniCSV(somministrazione));
	
	    EmailUtils.inviaMail("Report somministrazioni, formato CSV", "Allego quanto in oggetto", f);
	}
}

function doReportHTML()
{
    var anno = $.cal.getAnnoCorrente();
    var mese = $.cal.getMeseCorrente();

    var somministrazione = Alloy.createCollection("somministrazione");
    somministrazione.fetch({
	query: {
	    statement: 'select * from somministrazione where quando like ? order by quando',
	    params: [
		StringUtils.timestampToSql(moment([anno, mese, 1]).toDate()).substring(0, 6) + "%"
	    ]
	}
    });
    somministrazione = somministrazione.toJSON();

	if(somministrazione.length===0)
	{
		alert("Il report e' vuoto");
	}
	else
	{
	    var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'report_somministrazione.html');
	    f.write(GestoreReport.generaReportSomministrazioniHTML(somministrazione));
	
	    EmailUtils.inviaMail("Report somministrazioni, formato HTML", "Allego quanto in oggetto", f);
	}
}

$.cal.getView().addEventListener("clickGiorno", doClickSuGiorno);
$.cal.getView().addEventListener("clickMese", doClickSuMese);
$.doReport = doReport;
$.doReportHTML = doReportHTML;
