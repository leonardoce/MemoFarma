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

var moment = require(WPATH("moment-with-locales"));
moment.locale(Ti.Locale.currentLanguage.toUpperCase());

var annoCorrente = moment().year();
var meseCorrente = moment().month();

function doPostlayout()
{
    var larghezza = $.barra_mese.size.width;
    larghezza = larghezza - $.btPrima.size.width;
    larghezza = larghezza - $.btDopo.size.width;

    $.txtDescrizioneMese.width = larghezza;
}

function doPrima()
{
    var cambio = moment([annoCorrente, meseCorrente-1, 1]);
    annoCorrente = cambio.year();
    meseCorrente = cambio.month();
    impostaLabel();
    lanciaEvento();
}

function doDopo()
{
    var cambio = moment([annoCorrente, meseCorrente+1, 1]);
    annoCorrente = cambio.year();
    meseCorrente = cambio.month();
    impostaLabel();
    lanciaEvento();
}

function doClickMese()
{
    Ti.API.info("qua arrivo");
    $.barra_mese.fireEvent('click_mese', {year: annoCorrente, month: meseCorrente});
}

function lanciaEvento()
{
    $.barra_mese.fireEvent('mese_cambiato', {year: annoCorrente, month: meseCorrente});
}

function impostaLabel()
{
    $.txtDescrizioneMese.text = moment.months()[meseCorrente] + " " +
	annoCorrente;
}

function year()
{
    return annoCorrente;
}

function month()
{
    return meseCorrente;
}

$.btPrima.image=WPATH("images/back.png");
$.btDopo.image=WPATH("images/next.png");
impostaLabel();
$.year = year;
$.month = month;
$.previousMonth = doPrima;
$.nextMonth = doDopo;
