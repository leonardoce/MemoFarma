exports.definition = {
	config: {
		columns: {
		    "nome": "text",
		    "ora": "text",
		    "dose": "text",
			"terapia_id": "integer primary key autoincrement"
		},
		adapter: {
			type: "sql",
			collection_name: "terapie",
			idAttribute: "terapia_id"
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
