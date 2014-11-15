// Questo widget implementa un semplice calendario
// che puo' disegnare una casella per giorno

var DateUtils = require(WPATH("DateUtils"));

var NOMIGIORNI = ["D", "L", "M", "M", "G", "V", "S"];
var casellePerGiorni = [];
var casellePerNomiDeiGiorni = [];

// Questo tiene traccia del mese corrente
var annoCorrente = 0;
var meseCorrente = 0;

// Questo serve per non rifare il layout tutte le volte
var previousWidth = 0;
var previousHeight = 0;

function resetLayout()
{
	// Se il layout e' gia' stato calcolato non fare nulla {{{
	var larghezza = $.container.size.width;
	var lunghezza = $.container.size.height;

	if (larghezza==previousWidth && lunghezza==previousHeight)
	{
		return;
	}
	else
	{
		previousWidth=larghezza;
		previousHeight=lunghezza;
	}
	// }}}

	var i,j;

	// Un mese puo' stare a cavallo fra 6 settimane (vedi 11/2014)
	// ed una riga mi serve per indicare i nomi dei giorni; per questa
	// ragione mi servono 7 righe.
	// Le settimane, per fortuna, sono sempre di 7 giorni
	var larghezzaCelle = larghezza / 7;
	var lunghezzaCelle = lunghezza / 7;

	for (j=0; j<7; j++)
	{
		casellePerNomiDeiGiorni[j].applyProperties({
			width: larghezzaCelle,
			height: lunghezzaCelle,
			top: 0,
			left: j*larghezzaCelle
		});
	}

	for (i=0; i<6; i++)
	{
		for (j=0; j<7; j++)
		{
			casellePerGiorni[i][j].applyProperties({
				width: larghezzaCelle,
				height: lunghezzaCelle,
				top: (i+1)*lunghezzaCelle,
				left: j*larghezzaCelle
			});
		}
	}
}

/**
 * Crea le caselle per i nomi dei giorni
 */
function creaCasellePerNomiDeiGiorni()
{
	var spessore, coloreBordo, dataDellaCella;

	casellePerNomiDeiGiorni = [];

	for (var j=0; j<7; j++)
	{
		spessore = 1;
		coloreBordo = "#000000";

		var cella = Ti.UI.createLabel({
			color: (j===0?"#ff0000": "#000000"),
			borderColor: coloreBordo,
			borderWidth: spessore,
			text: NOMIGIORNI[j],
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		});

		$.container.add(cella);
		casellePerNomiDeiGiorni.push(cella);
	}
}

/**
 * Crea le caselle per i giorni
 */
function creaCasellePerGiorni()
{
	casellePerGiorni = [];
	for (var i=0; i<6; i++)
	{
		var settimana = [];

		for (var j=0; j<7; j++)
		{
			var coloreTesto;

			coloreTesto = "#000000";

			if (j===0)
			{
				// Domenica
				coloreTesto = "#ff0000";
			}

			var cella = Ti.UI.createLabel({
				color: coloreTesto,
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
			});

			$.container.add(cella);
			settimana.push(cella);
		}

		casellePerGiorni.push(settimana);
	}
}

function configuraCellePerMeseCorrente()
{
	var primoGiorno = DateUtils.primoGiornoDelMese(annoCorrente, meseCorrente);
	var giorniInQuestoMese = DateUtils.quantiGiorniHaQuestoMese(annoCorrente, meseCorrente);
	var dataDiOggi = new Date();
	var giorniContati = 0;

	for (i=0; i<6; i++)
	{
		for (j=0; j<7; j++)
		{
			var spessore, coloreBordo, dataDellaCella;

			spessore = 1;
			coloreBordo = "#000000";
			dataDellaCella = null;

			if (i===0 && j<primoGiorno)
			{
				// Siamo prima del mese corrente
				coloreBordo = "#aaaaaa";
			}
			else if (giorniContati>=giorniInQuestoMese)
			{
				// Siamo dopo il mese corrente
				coloreBordo = "#aaaaaa";
			}
			else
			{

				dataDellaCella = new Date();
				dataDellaCella.setFullYear(annoCorrente);
				dataDellaCella.setMonth(meseCorrente);
				dataDellaCella.setDate(giorniContati+1);

				if (DateUtils.confrontaData(dataDiOggi, dataDellaCella))
				{
					spessore = 3;
				}

				// Giorno del mese giusto
				giorniContati++;
			}

			casellePerGiorni[i][j].applyProperties({
				borderColor: coloreBordo,
				borderWidth: spessore,
				text: (dataDellaCella===null?"":""+dataDellaCella.getDate()),
				dataDiQuestaCella: dataDellaCella,
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
			});
		}
	}
}

function init()
{
	var d = new Date();
	meseCorrente = d.getMonth();
	annoCorrente = d.getFullYear();

	creaCasellePerNomiDeiGiorni();
	creaCasellePerGiorni();
	configuraCellePerMeseCorrente();
}

function doPostlayout()
{
	resetLayout();
}

init();
