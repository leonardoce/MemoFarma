exports.definition = {
	config: {
		columns: {
		    "quando": "text",
		    "nome": "text",
		    "dose": "text",
		    "ora_richiesta": "text",
		    "stato": "text",
		    "somministrazione_id": "integer primary key autoincrement"
		},
		adapter: {
		    type: "sql",
		    collection_name: "somministrazione",
		    idAttribute: "somministrazione_id"
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
