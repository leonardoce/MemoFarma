var moment = require(WPATH("moment-with-locales"));
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

impostaLabel();
$.year = year;
$.month = month;
$.previousMonth = doPrima;
$.nextMonth = doDopo;
