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

var args = arguments[0] || {};
var StringUtils = require("StringUtils");

function salva(stato)
{
	if (!args.terapia)
	{
		return;
	}

    Ti.API.info(stato);

	Alloy.createModel("somministrazione", {
		quando: StringUtils.timestampToSql(new Date()),
		nome: args.terapia.nome,
		dose: args.terapia.dose,
		ora_richiesta: args.terapia.ora,
		stato: StringUtils.logic2string(stato)
	}).save();
}

function doPresa()
{
	salva(true);
	if (args.close)
	{
		args.close();
	}
}

function doNonLaPrendo()
{
	salva(false);
	if (args.close)
	{
		args.close();
	}
}

function doPostLayout()
{
    var larghezza = $.contenitore.size.width;
    larghezza = larghezza - $.lb_presa.size.width;
    larghezza = larghezza - $.lb_non_presa.size.width;

    $.spaziatore.width = larghezza;
}

if (args.terapia)
{
	$.ora.text = args.terapia.ora;
	$.farmaco.text = args.terapia.nome + " (" + args.terapia.dose + ")";
}
