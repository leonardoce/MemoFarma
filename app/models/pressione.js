exports.definition = {
	config: {
		columns: {
		    "massima": "integer",
		    "minima": "integer",
		    "frequenza": "integer",
		    "automisurazione": "bool",
		    "rilevazione": "timestamp",
			"pressione_id": "integer primary key autoincrement"
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
