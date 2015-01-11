// This file is part of MemoFarma.
//
// MemoFarma is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// MemoFarma is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with MemoFarma.  If not, see <http://www.gnu.org/licenses/>.

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
