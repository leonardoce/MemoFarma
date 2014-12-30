// Nota bene:
// Qua dobbiamo suonare l'allarme in continuo, cosi' l'utente si sveglia
// e prende la pasticca.

/**
 * Crea la notifica che permette di aprire MemoFarma
 */
function aggiungiNotifica() {
    var contenutoNotifica = "";
    contenutoNotifica = "Ci sono delle terapie da prendere";

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
        defaults: Ti.Android.DEFAULT_LIGHTS | Ti.Android.DEFAULT_VIBRATE,
        icon: '/images/terapia_bianca.png'
    });

    // Send the notification.
    Titanium.Android.NotificationManager.notify(1, notification);
}

/**
 * Suona il file finche' il servizio non viene terminato
 */
function suonaFortePerSempre() {
    Ti.API.info("Via all'audio");
    
    var audioPlayer = Ti.Media.createAudioPlayer({ 
        url: Ti.Filesystem.getResRawDirectory() + "notifica.mp3",
        allowBackground: true,
        volume: 1
    });           
    
    audioPlayer.addEventListener('complete', function(e) {
        audioPlayer.release();
        audioPlayer.start();
    });
    
    audioPlayer.start();
}

function main() {
    // Intanto mando la notifica
    aggiungiNotifica();
    
    // Adesso suono a tutta canna!
    suonaFortePerSempre();
}

Ti.API.info("Il servizio inizia la sua esecuzione");
main();

// Questo codice dovrebbe essere eseguito direttamente
// dall'allarme che viene generato dall'inserimento delle terapie
/*var GestoreAllarmi = require("GestoreAllarmi");
var moment = require("moment-with-locales");
var ID_NOTIFICATION = 1335;

// Qua dobbiamo assicurarci che alloy sia
// correttamente caricato.
if (typeof Alloy == 'undefined')
{
    var Alloy = require("alloy");
    Ti.API.info("Devo caricare Alloy");
}
else
{
    Ti.API.info("Alloy risulta caricato correttamente");
}

Ti.API.info("controllo se ci sono farmaci da prendere (" + moment().format() + ")" );

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
        defaults: Ti.Android.DEFAULT_LIGHTS | Ti.Android.DEFAULT_VIBRATE,
        icon: '/images/terapia_bianca.png',
        sound: Ti.Filesystem.getResRawDirectory() + "notifica.mp3"
    });

    // Send the notification.
    Titanium.Android.NotificationManager.notify(1, notification);
}
else
{
    // La notifica adesso non serve piu'
    Titanium.Android.NotificationManager.cancelAll();
}
*/