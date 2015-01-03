var args = arguments[0] || {};
var GestoreAllarmi = require("GestoreAllarmi");
var leoModule = require("it.interfree.leonardoce.bootreceiver");

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
    refresh();
}	

function doClose(e)
{
    clear();
    leoModule.interrompiSuoneria();
}
