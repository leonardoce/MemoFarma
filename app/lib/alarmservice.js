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
	contenutoNotifica = terapieNonPrese[0].nome + " (" + terapieNonPrese[0].dose + ")";
    }
    else
    {
	contenutoNotifica = "Ci sono " + terapieNonPrese.length + " terapie da prendere";
    }	

    // Intent object to launch the application 
    var intent = Ti.Android.createIntent({
	className : 'it.interfree.leonardoce.memofarma.MemofarmaActivity',
    });
    intent.flags |= Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP;
    intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
    intent.putExtra("tipologia", "terapie_non_somministrate");

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
	ledOffMS: 2000,
	defaults: Ti.Android.DEFAULT_ALL,
	icon: '/images/terapia_bianca.png'
    });

    // Send the notification.
    Titanium.Android.NotificationManager.notify(1, notification);
}
else
{
    // La notifica adesso non serve piu'
    Titanium.Android.NotificationManager.cancelAll();
}
