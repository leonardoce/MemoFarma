exports.definition = {
	config: {
		columns: {
		    "nome": "text",
		    "ora": "text",
		    "dose": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "terapie"
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