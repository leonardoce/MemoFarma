var datiTerapie = Alloy.Collections.terapie;
var args = arguments[0] || {};

function onAggiungiTerapia() {
	Alloy.createController("dettagli_terapia", {modello: Alloy.createModel("terapie")}).getView().open();
}

$.terapie.open();

datiTerapie.fetch();
if (datiTerapie.length>0) 
{
	$.nessuna_presente.visible = false;
}
