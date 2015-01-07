var args = arguments[0] || {};
var INDICE_CALENDARIO = 0;
var INDICE_TERAPIE = 1;
var INDICE_PRESSIONI = 2;
var INDICE_GLICEMIE = 3;
var StringUtils = require("StringUtils");
var GestoreAllarmi = require("GestoreAllarmi");
var moment = require("moment-with-locales");

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
        doInserisciSomministrazione();
    }
}

function doInserisciSomministrazione() {
    var dialog = Ti.UI.createAlertDialog({
        cancel: 0,
        buttonNames: [L("bt_annulla"), L("bt_imprevista"), L("bt_programmata")],
        message: L("msg_programmata"),
        title: L("title_inserimento")
    });
    dialog.addEventListener('click', function(e){
        if (e.index === e.source.cancel) {
            // nop()
        } else if (e.index === 1) {
            var nuovoModello = Alloy.createModel("somministrazione");
            nuovoModello.set({
                quando : StringUtils.timestampToSql(new Date()),
            });
            Alloy.createController("dettagli_somministrazione", {modello: nuovoModello}).getView().open();
        } else if (e.index === 2) {
            doInserisciSomministrazioneProgrammata();
        }
    });
    dialog.show();
}

function doInserisciSomministrazioneProgrammata() {
    // Trovo tutte le terapie che devo prendere nella giornata di oggi, escludendo
    // quelle per cui ho uno stato inserito.
    var mmt = moment().hour(23).minute(59).toDate();
    var listaTerapie = GestoreAllarmi.controllaTerapieDiOggiPerOra(mmt);

    if (listaTerapie.length===0) {
        alert(L("msg_no_terapie_da_prendere"));
        return;
    } 

    var column1 = Ti.UI.createPickerColumn();
    for(var i=0, ilen=listaTerapie.length; i<ilen; i++){
        var row = Ti.UI.createPickerRow({
            title: listaTerapie[i].nome + " " + listaTerapie[i].dose + " (" + listaTerapie[i].ora + ")",
            dato: listaTerapie[i]
        });
        column1.addRow(row);
    }

    var picker = Ti.UI.createPicker({
        columns: [column1],
        selectionIndicator: true,
        top:50
    });

    var dialog = Ti.UI.createAlertDialog({
        cancel: 0,
        buttonNames: [L("bt_annulla"), L("bt_inserisci")],
        message: L("msg_seleziona_terapia_da_prendere"),
        title: L("title_inserimento"),
        androidView: picker
    });

    dialog.addEventListener('click', function(e){
        if (e.index === e.source.cancel) {
        } else if (e.index === 1) {
            var daInserire = picker.getSelectedRow(0).dato;

            var nuovoModello = Alloy.createModel("somministrazione");
            nuovoModello.set({
                quando : StringUtils.timestampToSql(new Date()),
                nome: daInserire.nome,
                dose: daInserire.dose,
                ora_richiesta: daInserire.ora,
                stato: StringUtils.logic2string(true)
            });
            nuovoModello.save();
            $.calendario.doRefresh();
        }
    });

    dialog.show();
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

function doOpen() 
{
    $.tabprincipale.activity.invalidateOptionsMenu();
}