migration.up = function(migrator) {
    var db = migrator.db;
    
    migrator.createTable({
	columns: {
	    "nome": "text",
	    "ora": "text",
	    "dose": "text",
	    "terapia_id": "integer primary key autoincrement",
	    "data_inizio": "text",
	    "data_fine": "text"
	}
    });

    db.execute("alter table " + migrator.table + " add column considera_data_fine integer;");
    db.execute("update " + migrator.table + " set considera_data_fine=0");
};

migration.down = function(migrator) {

};
