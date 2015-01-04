var args = arguments[0] || {};
var StringUtils = require("StringUtils");
var GestoreReport = require("GestoreReport");
var EmailUtils = require("EmailUtils");
var moment = require("moment-with-locales");
var carica = "";
var caricaData = null;

function doTransform(model)
{
    var o = model.toJSON();
    if (StringUtils.string2logic(o.stato))
    {
	o.stato = "/images/ok.png";
    }
    else
    {
	o.stato = "/images/ko.png";
    }

    o.testo_data = StringUtils.formattaDataOra(StringUtils.sqlToTimestamp(o.quando));
    return o;
}

function doHomeClick()
{
    $.somministrazioni.close();
}

function onItemClick(e) {
	var somministrazione_id = $.list.getSections()[e.sectionIndex].items[e.itemIndex].properties.somministrazione_id;
	var item = Alloy.Collections.somministrazione.get(somministrazione_id);
	var wnd = Alloy.createController("dettagli_somministrazione", {
		modello : item
	}).getView();
	wnd.addEventListener("close", onChiusiDettagli);
	wnd.open();
}

function onChiusiDettagli(e) {
	e.source.removeEventListener("close", onChiusiDettagli);
	
	if(carica === "caticaTutte"){
		caricaTutte();
	}
	else if(carica === "caricaMese"){
		if(caricaData != null){
			caricaMese(caricaData);
		}
	}
	else if(carica === "caricaGiorno"){
		if(caricaData != null){
			caricaGiorno(caricaData);
		}
	}
}

function caricaTutte()
{
    Alloy.Collections.somministrazione.fetch({
	query: 'select * from somministrazione order by quando desc'
    });
    
    carica = "caricaTutte";
    caricaData = null;
}

function caricaMese(data)
{
    Alloy.Collections.somministrazione.fetch({
	query: {
	    statement: 'select * from somministrazione where quando like ? order by quando',
	    params: [
		StringUtils.timestampToSql(data).substring(0, 6) + "%"
	    ]
	}
    });

    Ti.API.info(data);
    $.somministrazioni.title = L("lb_somministrazioni") + moment(data).format("MMMM YYYY");
    
    carica = "caricaMese";
    caricaData = data;
}

function caricaGiorno(data)
{
    Alloy.Collections.somministrazione.fetch({
	query: {
	    statement: 'select * from somministrazione where quando like ? order by quando',
	    params: [
		StringUtils.timestampToSql(data).substring(0, 8) + "%"
	    ]
	}
    });

    $.somministrazioni.title = L("lb_somministrazioni") + moment(data).format("LL");
    carica = "caricaGiorno";
    caricaData = data;
}

$.caricaTutte = caricaTutte;
$.caricaMese = caricaMese;
$.caricaGiorno = caricaGiorno;
