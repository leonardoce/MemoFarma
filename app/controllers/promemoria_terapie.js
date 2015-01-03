var args = arguments[0] || {};
var GestoreAllarmi = require("GestoreAllarmi");
var leoModule = require("it.interfree.leonardoce.bootreceiver");
var RIPETIZIONE_ALLARME_MINUTI = 15;

function clear()
{
    $.scroller.removeAllChildren();
}

function refresh()
{
    var terapieDiOggi = GestoreAllarmi.controllaTerapieDiOggi();
    var i;

    if (terapieDiOggi.length===0)
    {
    	$.lb_promemoria_terapie.close();
    	return;
    }
    
    clear();

    for (i=0; i<terapieDiOggi.length; i++)
    {
	var riga = Alloy.createController("promemoria_dettaglio",
					  { terapia: terapieDiOggi[i], close: refresh });
	$.scroller.add(riga.getView());
    }
}

function doOpen(e)
{
    leoModule.cancellaAllarmePerRipetizione();
    refresh();
}	

function doRipeti() {
    // TODO: Metti un numero con un po' di senso
    leoModule.ripetiAllarmeFraMinuti(2);
    $.lb_promemoria_terapie.close();
}

function doClose(e)
{
    clear();
    leoModule.interrompiSuoneria();
}
