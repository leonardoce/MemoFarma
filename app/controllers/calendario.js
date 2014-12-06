var StringUtils = require("StringUtils");
var moment = require("moment-with-locales");
var args = arguments[0] || {};
var ROSSO = "#ffc2c2";
var VERDE = "#79e579";

function doRefresh()
{
    var somministrazione = Alloy.createCollection("somministrazione");
    somministrazione.fetch({query:"select * from somministrazione order by stato desc"});
    somministrazione = somministrazione.toJSON();

    var sfondoPerData = {};

    for(var i=0; i<somministrazione.length; i++)
    {
	var quando = StringUtils.sqlToTimestamp(somministrazione[i].quando);

	if(StringUtils.string2logic(somministrazione[i].stato))
	{
	    sfondoPerData[moment(quando).format("YYYY-MM-DD")] = VERDE;
	}
	else
	{
	    sfondoPerData[moment(quando).format("YYYY-MM-DD")] = ROSSO;
	}
    }

    $.cal.setSfondoPerData(sfondoPerData);
}
