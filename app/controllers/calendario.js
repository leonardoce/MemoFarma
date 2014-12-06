var StringUtils = require("StringUtils");
var moment = require("moment-with-locales");
var args = arguments[0] || {};
var ROSSO = "#ffc2c2";
var VERDE = "#79e579";

function doRefresh()
{
    var somministrazione = Alloy.createCollection("somministrazione");
    somministrazione.fetch();
    somministrazione = somministrazione.toJSON();

    var sfondoPerData = {};

    // Supponiamo che fino ad oggi sia andato tutto bene
    // e poi mettiamo gli errori
    var giorno = moment().date(1);
    while(!giorno.isAfter(moment()))
    {
	sfondoPerData[giorno.format("YYYY-MM-DD")] = VERDE;
	giorno = giorno.add(1, 'day');
    }
    
    for(var i=0; i<somministrazione.length; i++)
    {
	var quando = StringUtils.sqlToTimestamp(somministrazione[i].quando);
	Ti.API.info("passo");
	Ti.API.info(somministrazione[i].stato);
	sfondoPerData[moment(quando).format("YYYY-MM-DD")] = ROSSO;
    }

    $.cal.setSfondoPerData(sfondoPerData);
}

doRefresh();

$.doRefresh = doRefresh;
