// Questo widget implementa un semplice calendario
// che puo' disegnare una casella per giorno

var casellePerGiorni = [];

// Questo tiene traccia del mese corrente
var annoCorrente = 0;
var meseCorrente = 0;

// Questo serve per non rifare il layout tutte le volte
var previousWidth = 0;
var previousHeight = 0;

/**
 * Primo giorno (0<x<7) del mese
 */
function primoGiornoDelMese()
{
	var d = new Date();
	d.setMonth(meseCorrente);
	d.setDate(1);
	d.setFullYear(annoCorrente);
	return d.getDay();
}

/**
 * Quanti giorni ha questo mese?
 */
function quantiGiorniHaQuestoMese()
{
	if (meseCorrente==0)
	{
		return 31;
	}
	else if (meseCorrente==11)
	{
		return 31;
	}
	else 
	{
		var d = new Date();
		d.setDate(1);
		d.setMonth(meseCorrente+1);
		d.setTime(d.getTime()- (24*60*60*1000));
		return d.getDate();
	}
}

/**
 * Confronta due oggetti Date del javascript escludendo
 * dal confronto le ore ed i minuti
 */
function confrontaData(d1, d2)
{
	return (d1.getDate()==d2.getDate()) &&
		(d1.getMonth()==d2.getMonth()) &&
		(d1.getFullYear()==d2.getFullYear());
}

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

	var primoGiorno = primoGiornoDelMese();
	var giorniInQuestoMese = quantiGiorniHaQuestoMese();
	var dataDiOggi = new Date();

	$.container.removeAllChildren();
	casellePerGiorni = [];

	var larghezzaCelle = larghezza / 7;
	var lunghezzaCelle = lunghezza / 6;
	var giorniContati = 0;

	for (var i=0; i<6; i++)
	{
		for (var j=0; j<7; j++)
		{
			if (i==0 && j<primoGiorno)
			{
				// Siamo prima del mese corrente
			}
			else if (giorniContati>=giorniInQuestoMese)
			{
				// Siamo dopo il mese corrente
			}	
			else
			{
				var spessore, coloreBordo;

				var dataDellaCella = new Date();
				dataDiOggi.setDate(giorniContati+1);

				spessore = 1;
				coloreBordo = "#000000";

				if (confrontaData(dataDiOggi, dataDellaCella))
				{
					spessore = 3;
					coloreBordo = "#000000";
				}

				var cella = Ti.UI.createLabel({
					borderColor: coloreBordo,
					borderWidth: spessore,
					width: larghezzaCelle,
					height: lunghezzaCelle,
					top: i*lunghezzaCelle,
					left: j*larghezzaCelle,
					text: ""+dataDellaCella.getDate(),
					dataDiQuestaCella: dataDellaCella,
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
				});

				giorniContati++;
				$.container.add(cella);
			}
		}
	}
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
