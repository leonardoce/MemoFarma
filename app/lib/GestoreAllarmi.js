var StringUtils = require("StringUtils");
var moment = require("moment-with-locales");

var MINUTES = 60*1000;
var ID_ALLARME = 1223;
var INTERVALLO_MINUTI = 1;

var serviceIntent = null;

/**
 * Viene attivato un allarme eseguito ogni 5 minuti ed alla
 * ricezione l'applicazione controlla se ci sono delle terapie che dovono
 * essere ancora prese. Se ci sono allora viene messa una notifica in modo
 * che l'utente se ne accorga.
 */

/**
 * Attiva la gestione degli allarmi
 */
function attivaGestioneAllarmi()
{
    if (serviceIntent==null)
    {
	Ti.API.info("Attivo la gestione degli allarmi");

	serviceIntent = Titanium.Android.createServiceIntent({
	    url: 'alarmservice.js'
	});
	serviceIntent.putExtra('interval', INTERVALLO_MINUTI*MINUTES);
    }
    else
    {
	Ti.API.info("La gestione degli allarmi e' gia' attivata");
    }

    Ti.Android.stopService(serviceIntent);
    Ti.Android.startService(serviceIntent);
}

/**
 * Controlla se oggi ci sono delle terapie che
 * non sono state prese
 */
function controllaTerapieDiOggi()
{
    var somministrazioni = Alloy.createCollection("somministrazione");
    var terapie = Alloy.createCollection("terapie");

    var dataOggi = StringUtils.timestampToSql(new Date());
    var dataIeri = StringUtils.timestampToSql(moment().subtract(1, 'day').toDate());
    var oraCorrente = StringUtils.dateToOra(new Date());

    somministrazioni.fetch({
        query: {
            statement: "select * from somministrazione where quando like ? order by quando",
            params: [
                dataOggi.substring(0, 8) + '%'
            ]
        }
    });
    terapie.fetch();

    terapie = terapie.toJSON();
    somministrazioni = somministrazioni.toJSON();

    var terapieNonPrese = [];
    for(var i=0; i<terapie.length; i++)
    {
	/*
	  Ti.API.info(terapie[i].ora);
	  Ti.API.info(terapie[i].data_inizio);
	  Ti.API.info(terapie[i].data_fine);
	*/

	if (terapie[i].ora>oraCorrente)
	{
	    // nop()
	}
	else if(moment(StringUtils.sqlToTimestamp(terapie[i].data_inizio)).hours(0).minutes(0).isAfter(dataOggi))
	{
	    // nop()
	}
	else if(moment(StringUtils.sqlToTimestamp(terapie[i].data_fine)).hours(23).minutes(59).isBefore(dataOggi))
	{
	    // nop()
	}
	else if (!controllaSeSomministrata(terapie[i], somministrazioni))
        {
            terapieNonPrese.push(terapie[i]);
        }
    }

    Ti.API.info("Ci sono " + terapieNonPrese.length + " terapie non prese");

    return terapieNonPrese;
}

/**
 * Controlla se e' stata presa una certa terapia
 */
function controllaSeSomministrata(terapia, somministrazioni)
{
    for (var i=0; i<somministrazioni.length; i++)
    {
        if (somministrazioni[i].ora_richiesta==terapia.ora)
        {
            return true;
        }
    }

    return false;
}

exports.attivaGestioneAllarmi = attivaGestioneAllarmi;
exports.controllaTerapieDiOggi = controllaTerapieDiOggi;
