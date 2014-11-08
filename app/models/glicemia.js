exports.definition = {
	config: {
		columns: {
		    "rilevazione": "text",
		    "nota": "text",
			"glicemia_id": "integer primary key autoincrement"
		},
		defaults: {
			"rilevazione": "",
			"nota": ""
		}
		adapter: {
			type: "sql",
			collection_name: "glicemia",
			idAttribute: "glicemia_id"
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
