var alarmModule = require('bencoding.alarmmanager');
var alarmManager = alarmModule.createAlarmManager();

var StringUtils = require("StringUtils");

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
    Ti.API.info("Gestione degli allarmi attivata");

	var now = new Date();

    var MINUTES = 1000 * 60;
    alarmManager.addAlarmService({
        requestCode: ID_ALLARME,
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: 0,
        service: 'it.interfree.leonardoce.memofarma.AlarmserviceService',
        repeat: INTERVALLO_MINUTI * MINUTES
    });
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
        if (!controllaSeSomministrata(terapie[i], somministrazioni))
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
