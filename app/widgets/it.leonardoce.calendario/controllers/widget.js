// Questo widget implementa un semplice calendario
// che puo' disegnare una casella per giorno

var DateUtils = require(WPATH("DateUtils"));

var NOMIGIORNI = ["D", "L", "M", "M", "G", "V", "S"];
var casellePerGiorni = [];

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

	var primoGiorno = DateUtils.primoGiornoDelMese(annoCorrente, meseCorrente);
	var giorniInQuestoMese = DateUtils.quantiGiorniHaQuestoMese(annoCorrente, meseCorrente);
	var dataDiOggi = new Date();

	$.container.removeAllChildren();
	casellePerGiorni = [];

	// Un mese puo' stare a cavallo fra 6 settimane (vedi 11/2014)
	// ed una riga mi serve per indicare i nomi dei giorni; per questa
	// ragione mi servono 7 righe.
	// Le settimane, per fortuna, sono sempre di 7 giorni
	var larghezzaCelle = larghezza / 7;
	var lunghezzaCelle = lunghezza / 7;

	// Adesso disegno i nomi dei giorni {{{
	for (var j=0; j<7; j++)
	{
		var spessore, coloreBordo, dataDellaCella;

		spessore = 1;
		coloreBordo = "#000000";

		var cella = Ti.UI.createLabel({
			color: (j==0?"#ff0000": "#000000"),
			borderColor: coloreBordo,
			borderWidth: spessore,
			width: larghezzaCelle,
			height: lunghezzaCelle,
			top: 0,
			left: j*larghezzaCelle,
			text: NOMIGIORNI[j],
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		});

		$.container.add(cella);
	}
	// }}}

	// Adesso disegno il calendario {{{
	var giorniContati = 0;

	for (var i=0; i<6; i++)
	{
		for (var j=0; j<7; j++)
		{
			var spessore, coloreBordo, dataDellaCella, coloreTesto;

			spessore = 1;
			coloreBordo = "#000000";
			coloreTesto = "#000000";
			dataDellaCella = null;

			if (j==0)
			{
				// Domenica
				coloreTesto = "#ff0000";
			}

			if (i==0 && j<primoGiorno)
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
				dataDellaCella.setDate(giorniContati+1);

				if (DateUtils.confrontaData(dataDiOggi, dataDellaCella))
				{
					spessore = 3;
				}

				// Giorno del mese giusto
				giorniContati++;
			}

			var cella = Ti.UI.createLabel({
				color: coloreTesto,
				borderColor: coloreBordo,
				borderWidth: spessore,
				width: larghezzaCelle,
				height: lunghezzaCelle,
				top: (i+1)*lunghezzaCelle,
				left: j*larghezzaCelle,
				text: (dataDellaCella==null?"":""+dataDellaCella.getDate()),
				dataDiQuestaCella: dataDellaCella,
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
			});

			$.container.add(cella);
		}
	}

	// }}}
}

function init()
{
	var d = new Date();
	meseCorrente = d.getMonth();
	annoCorrente = d.getFullYear();
}

function doPostlayout()
{
	resetLayout();
}

init();
