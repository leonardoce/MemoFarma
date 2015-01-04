// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Collections.terapie = Alloy.createCollection("terapie");
Alloy.Collections.pressione = Alloy.createCollection("pressione");
Alloy.Collections.glicemia = Alloy.createCollection("glicemia");
Alloy.Collections.somministrazione = Alloy.createCollection("somministrazione");

// Queste sono le due schermate principali possibili
var GestoreAllarmi = require("GestoreAllarmi");

Ti.API.info("Ti.Locale.currentLanguage = " + Ti.Locale.currentLanguage);

// Adesso vediamo se siamo stati attivati da una
// notifica
var currActivity = Ti.Android.currentActivity;
var tipologia = currActivity.getIntent().getStringExtra("tipologia");
Ti.API.info("Tipo: " + tipologia);

if (tipologia=="terapie_non_somministrate")
{
    // Sono stato avviato da una notifica e quindi devo mostrare
    // la pagina delle notifiche
    Alloy.createController("promemoria_terapie").getView().open();
}
else if(tipologia=="controllo_al_boot")
{
	// Questo e' il controllo al boot.
	// Devo vedere se ci sono terapie da prendere e, se ce ne sono, attivo
	// un allarme che fra 5 minuti suonera'!
	Ti.API.info("Controllo al boot in corso...");
	var da_prendere = GestoreAllarmi.controllaTerapieDiOggi();
	if (da_prendere.length>0) {
		Ti.API.info("Fra 2 minuti suonera'...");
		var leoModule = require("it.interfree.leonardoce.bootreceiver");
	    leoModule.ripetiAllarmeFraMinuti(2);
	}

	// Oltre a questo alcuni telefoni (vedi Samsung Galaxy Grand) perdono
	// tutti gli allarmi al boot. Son misteri.
	GestoreAllarmi.attivaGestioneAllarmi();	

	// Ho finito i miei controlli
	var activity = Titanium.Android.currentActivity;
	activity.finish();
}
else if (!Ti.App.Properties.getBool("non_responsabilita_aperto", false))
{
	GestoreAllarmi.attivaGestioneAllarmi();
    Alloy.createController("non_responsabilita").getView().open();
}
else
{
    // Sono stato avviato dal launcher e quindi mi apro
    // normalmente
	GestoreAllarmi.attivaGestioneAllarmi();
    Alloy.createController("tabprincipale").getView().open();
}
