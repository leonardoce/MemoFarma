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
else
{
    // Sono stato avviato dal launcher e quindi mi apro
    // normalmente
    Alloy.createController("tabprincipale").getView().open();
	GestoreAllarmi.attivaGestioneAllarmi();
}
