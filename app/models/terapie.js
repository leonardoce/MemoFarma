exports.definition = {
    config: {
	columns: {
	    "nome": "text",
	    "ora": "text",
	    "dose": "text",
	    "terapia_id": "integer primary key autoincrement",
	    "data_inizio": "text",
	    "data_fine": "text",
	    "considera_data_fine": "integer"
	},
	defaults: {
	    "considera_data_fine": 0
	},
	adapter: {
	    type: "sql",
	    collection_name: "terapie",
	    idAttribute: "terapia_id"
	}
    },
    extendModel: function(Model) {
	_.extend(Model.prototype, {
	    toString: function()
	    {
		var StringUtils = require("StringUtils");

		return "<Terapie id=" + StringUtils.stosingle(this.get("terapia_id")) + 
		    " nome=" + StringUtils.stosingle(this.get("nome")) + 
		    " ora=" + StringUtils.stosingle(this.get("ora")) + 
		    " dose=" + StringUtils.stosingle(this.get("dose")) + 
		    "/>"
	    }

	    // extended functions and properties go here
	});

	return Model;
    },
    extendCollection: function(Collection) {
	_.extend(Collection.prototype, {
	    // extended functions and properties go here
	});

	return Collection;
    }
};
