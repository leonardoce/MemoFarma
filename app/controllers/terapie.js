var datiTerapie = Alloy.Collections.terapie;
var args = arguments[0] || {};

function onAggiungiTerapia() {
	alert("Ciao");
}

$.terapie.open();

datiTerapie.fetch();
if (datiTerapie.length>0) 
{
	$.nessuna_presente.visible = false;
}
