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
    leoModule.ripetiAllarmeFraMinuti(RIPETIZIONE_ALLARME_MINUTI);
    $.lb_promemoria_terapie.close();
}

function doClose(e)
{
    clear();
    leoModule.interrompiSuoneria();
}
