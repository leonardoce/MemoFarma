var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function onSalva() {
	/*if (args.modello) {
		args.modello.set({
			nome : $.tf_nome.value,
			dose : $.tf_dose.value,
			ora : StringUtils.dateToOra($.pk_ora.value)
		});

		args.modello.save();
	}*/
	
	Alloy.createModel("somministrazione", {
		quando: StringUtils.timestampToSql($.pk_ora.value),
		nome: $.tf_nome.value,
		dose: $.tf_dose.value,
		ora_richiesta: "",
		stato: "true"
	}).save();

	$.dettagli_somministrazione.close();
}

function onCancella() {
	$.dettagli_somministrazione.close();
}


function onOpen() {
	if (args.modello) {
		$.tf_nome.value = args.modello.get("nome") || "";
		$.tf_dose.value = args.modello.get("dose") || "";
		if (args.modello.get("ora")) {
			$.pk_ora.value = StringUtils.oraToDate(args.modello.get("ora"));
		}
		
		if (!args.modello.get("somministrazione_id")) {
			$.dettagli_somministrazione.activity.actionBar.title = L("lb_nuovo_farmaco");
		} else {
			$.dettagli_somministrazione.activity.actionBar.title = L("lb_dettagli_farmaco");
		}
	}	
	$.dettagli_somministrazione.activity.invalidateOptionsMenu();
}

$.dettagli_somministrazione.addEventListener("open", onOpen);
