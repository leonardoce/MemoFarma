var alarmModule = require('bencoding.alarmmanager');
var alarmManager = alarmModule.createAlarmManager();

/**
 * Rimuove l'allarme corrispondente ad una certa terapia
 * @param id {Number} il numero identificativo della terapia
 */
function rimuoviAllarme(id)
{
	var StringUtils = require("StringUtils");

	Ti.API.info("Rimuovo la notifica con id " + 
		StringUtils.box(id));

	alarmManager.cancelAlarmNotification(id);
}

/**
 * Aggiunge un allarme per i dati richiesti
 * @param id {Number} L'id dell'allarme da pianificare
 * @param farmaco {String} Il nome del farmaco
 * @param dose {String} La dose del farmaco da assumere
 * @param orologio {String} L'ora alla quale assumere il farmaco
 *   nel formato "HH:MM"
 */
function aggiungiAllarme(id, farmaco, dose, orologio)
{
	var StringUtils = require("StringUtils");
	var l = StringUtils.oraToList(orologio);
	var ora = parseInt(l[0]);
	var minuti = parseInt(l[1]);
	var now = new Date();

	Ti.API.info("Schedulo notifica " + StringUtils.box(id) + " alle: " + 
		StringUtils.box(ora + ":" + minuti) + " per " + 
		StringUtils.box(farmaco) + " con dose " +
		StringUtils.box(dose));

	alarmManager.addAlarmNotification({
		requestCode: id,
		year: now.getFullYear(),
		month: now.getMonth(),
		day: now.getDate(),
		hour: ora,
		minute: minuti,
		contentTitle: farmaco,
		contentText: dose,
		icon: Ti.App.Android.R.drawable.appicon,
		playSound:true,
		vibrate:true,
		showLights: true,
		repeat: 'daily'
	});
}

/**
 * Data la lista delle terapie da assumere
 * pianifica gli allarmi.
 * @param {[Terapie]} La lista delle terapie (modelli Backbone JS)
 */
function programmaAllarmi(terapie)
{
	for (var i=0; i<terapie.length; i++)
	{
		var record = terapie.at(i);

		Ti.API.info(record);

		aggiungiAllarme(
			record.get("terapia_id"),
			record.get("nome"),
			record.get("dose"),
			record.get("ora")
		);
	}
}

exports.rimuoviAllarme = rimuoviAllarme;
exports.programmaAllarmi = programmaAllarmi;
