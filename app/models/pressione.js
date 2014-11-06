exports.definition = {
	config: {
		columns: {
		    "massima": "integer",
		    "minima": "integer",
		    "frequenza": "integer",
		    "automisurazione": "text",
		    "rilevazione": "text",
		    "nota": "text",
			"pressione_id": "integer primary key autoincrement"
		},
		defaults: {
			"automisurazione": "1",
			"nota": ""
		},
		adapter: {
			type: "sql",
			collection_name: "pressione",
			idAttribute: "pressione_id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
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
