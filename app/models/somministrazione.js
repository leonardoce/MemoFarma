exports.definition = {
	config: {
		columns: {
		    "quando": "timestamp",
		    "nome": "text",
		    "dose": "text",
		    "stato": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "somministrazione"
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