var args = arguments[0] || {};
var INDICE_CALENDARIO = 0;
var INDICE_TERAPIE = 1;
var INDICE_PRESSIONI = 2;
var INDICE_GLICEMIE = 3;
var StringUtils = require("StringUtils");

function doAggiungi()
{
    var TabGroupUtils = require("TabGroupUtils");
    var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);

    if (activeIdx==INDICE_TERAPIE)
    {
	$.terapie.onAggiungiTerapia();		
    } 
    else if (activeIdx==INDICE_PRESSIONI)
    {
	$.pressioni.doAggiungiPressioni();
    }
    else if (activeIdx==INDICE_GLICEMIE)
    {
	$.glicemia.doAggiungiGlicemia();
    }
    else if (activeIdx==INDICE_CALENDARIO)
    {
    	var nuovoModello = Alloy.createModel("somministrazione");
    	nuovoModello.set({
			quando : StringUtils.timestampToSql(new Date()),
		});
    	Alloy.createController("dettagli_somministrazione", {modello: nuovoModello}).getView().open();
    }
}

function doReport()
{
    var TabGroupUtils = require("TabGroupUtils");
    var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);

    if (activeIdx==INDICE_PRESSIONI)
    {
	$.pressioni.doReport();
    }
    else if (activeIdx==INDICE_GLICEMIE)
    {
	$.glicemia.doReport();
    }
    else if (activeIdx===INDICE_CALENDARIO)
    {
	$.calendario.doReport();
    }
}

function doReportHTML()
{
    var TabGroupUtils = require("TabGroupUtils");
    var activeIdx = TabGroupUtils.getActiveTabIndex($.tabprincipale);

    if (activeIdx==INDICE_PRESSIONI)
    {
	$.pressioni.doReportHTML();
    }
    else if (activeIdx==INDICE_GLICEMIE)
    {
	$.glicemia.doReportHTML();
    }
    else if (activeIdx===INDICE_CALENDARIO)
    {
	$.calendario.doReportHTML();
    }
}

function doAiuto()
{
    Alloy.createController("tutorial").getView().open();
}

function doFocus(e)
{
    if (!e.tab)
    {
	return;
    }

    var titolo = e.tab.titoloPrincipale;
    $.tabprincipale.title = titolo;
}

function doDonazione(e) 
{
    Alloy.createController("donazione").getView().open();
}

function doContattaci(e) 
{
    var datiTecnici = "--\n";
    datiTecnici += "Dati per supporto tecnico:";
    datiTecnici += "\n";
    datiTecnici += "MemoFarma\n";
    datiTecnici += "Versione: " + Ti.App.version + "\n";
    datiTecnici += "Produttore: " + Ti.Platform.manufacturer + "\n";
    datiTecnici += "Modello: " + Ti.Platform.model + "\n";
    datiTecnici += "Sistema operativo: " + Ti.Platform.osname + " " + Ti.Platform.ostype + " " + Ti.Platform.version + "\n";
    datiTecnici += "Processori: " + Ti.Platform.processorCount + "\n";
    datiTecnici += "JS Runtime: " + Ti.Platform.runtime + "\n";
    datiTecnici += "--\n\n";

    var EmailUtils = require("EmailUtils");
    EmailUtils.inviaMailConDestinatario("MemoFarma", "graphmouse@gmail.com", datiTecnici);
}