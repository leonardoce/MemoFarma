// Questo codice dovrebbe essere eseguito direttamente
// dall'allarme che viene generato dall'inserimento delle terapie
var GestoreAllarmi = require("GestoreAllarmi");
var ID_NOTIFICATION = 1335;

Ti.API.info("controllo se ci sono farmaci da prendere");

var terapieNonPrese = GestoreAllarmi.controllaTerapieDiOggi();
if (terapieNonPrese.length>0)
{
	var contenutoNotifica = "";
	if (terapieNonPrese.length==1)
	{
		contenutoNotifica = terapieNonPrese.nome;
	}
	else
	{
		contenutoNotifica = "Ci sono " + terapieNonPrese.length + " terapie da prendere";
	}	

	// Intent object to launch the application 
	var intent = Ti.Android.createIntent({
		flags : Ti.Android.FLAG_ACTIVITY_CLEAR_TOP | Ti.Android.FLAG_ACTIVITY_NEW_TASK,
		className : 'it.interfree.leonardoce.memofarma.MemofarmaActivity',
	});
	intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);

	// Create a PendingIntent to tie together the Activity and Intent
	var pending = Titanium.Android.createPendingIntent({
		intent: intent,
		flags: Titanium.Android.FLAG_UPDATE_CURRENT
	});

	// Create the notification
	var notification = Titanium.Android.createNotification({
		// icon is passed as an Android resource ID -- see Ti.App.Android.R.
		// icon: Ti.App.Android.R.drawable.app_icon,
		contentTitle: 'MemoFarma',
		contentText : contenutoNotifica,
		contentIntent: pending,
		ledOnMS: 2000,
		ledOffMS: 2000
	});

	// Send the notification.
	Titanium.Android.NotificationManager.notify(1, notification);
}

// Fatto questo il servizio potrebbe tranquillamente salutare
// la curva
var service = Ti.Android.currentService;
Ti.Android.stopService(service);
