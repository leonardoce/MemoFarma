var StringUtils = require("StringUtils");
var Alloy = require("alloy");
var moment = require("moment-with-locales");
var alarmModule = require('bencoding.alarmmanager');
var alarmManager = alarmModule.createAlarmManager();

var MINUTES = 60*1000;
var ID_ALLARME = 1223;
var INTERVALLO_MINUTI = 1;

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
    // Schedulo gli allarmi
    Ti.API.info("Gestione degli allarmi in corso...");
    var terapie = Alloy.createCollection("terapie");
    terapie.fetch();
    terapie = terapie.toJSON();
    
    for(var i=0; i<terapie.length; i++)
    {
		var ora = terapie[i].ora.split(":").map(function (x) {return parseInt(x,10);});
		alarmManager.cancelAlarmService(terapie[i].terapia_id);
		alarmManager.addAlarmService({
		    service: "it.interfree.leonardoce.memofarma.AlarmserviceService",
		    requestCode: terapie[i].terapia_id,
		    second: 0,
		    minute: ora[1],
		    hour: ora[0],
		    year: moment().year(),
		    repeat: "daily",
		    interval: INTERVALLO_MINUTI * MINUTES
		});
    	Ti.API.info("Attivo allarme " + terapie[i].terapia_id + " per " + ora[0] + ":" + ora[1]);
    }

    // Avvio il servizio se non e' avviato
    Ti.API.info("Gestione del servizio in cordo...");
    var serviceIntent = Titanium.Android.createServiceIntent({
	url: 'alarmservice.js'
    });
    serviceIntent.putExtra('interval', INTERVALLO_MINUTI*MINUTES);

    Ti.Android.stopService(serviceIntent);
    Ti.Android.startService(serviceIntent);
}

/**
 * Cancella un allarme per una certa terapia
 */
function cancellaAllarmePerTerapia(terapia)
{
    alarmManager.cancelAlarmService(terapia.get('terapia_id'));
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
	if (terapie[i].ora>oraCorrente)
	{
	    // nop()
	}
	else if(moment(StringUtils.sqlToTimestamp(terapie[i].data_inizio)).hours(0).minutes(0).isAfter(dataOggi))
	{
	    // nop()
	}
	else if(terapie[i].considera_data_fine!==0 && moment(StringUtils.sqlToTimestamp(terapie[i].data_fine)).hours(23).minutes(59).isBefore(dataOggi))
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
        if (somministrazioni[i].ora_richiesta==terapia.ora && somministrazioni[i].nome==terapia.nome)
        {
            return true;
        }
    }

    return false;
}

exports.attivaGestioneAllarmi = attivaGestioneAllarmi;
exports.cancellaAllarmePerTerapia = cancellaAllarmePerTerapia;
exports.controllaTerapieDiOggi = controllaTerapieDiOggi;
