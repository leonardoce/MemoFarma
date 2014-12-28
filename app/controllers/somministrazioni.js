var args = arguments[0] || {};
var StringUtils = require("StringUtils");
var GestoreReport = require("GestoreReport");
var EmailUtils = require("EmailUtils");
var moment = require("moment-with-locales");


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

function caricaTutte()
{
    Alloy.Collections.somministrazione.fetch({
	query: 'select * from somministrazione order by quando desc'
    });
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
}

$.caricaTutte = caricaTutte;
$.caricaMese = caricaMese;
$.caricaGiorno = caricaGiorno;
