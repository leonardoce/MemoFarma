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

function inviaMail(soggetto, contenuto, allegato)
{
	var dialog = Ti.UI.createEmailDialog();
	if (!dialog.isSupported())
	{
		alert("Non ci sono applicazioni per inviare le mail e quindi non posso inviare il report");
		return;
	}

	dialog.setSubject(soggetto);
	dialog.setHtml(false);
	dialog.setMessageBody(contenuto);

	if (allegato)
	{
		dialog.addAttachment(allegato);
	}

	dialog.open();
}

function inviaMailConDestinatario(soggetto, destinatario, contenuto, allegato)
{
	var dialog = Ti.UI.createEmailDialog();
	if (!dialog.isSupported())
	{
		alert("Non ci sono applicazioni per inviare le mail e quindi non posso inviare il report");
		return;
	}

	dialog.setSubject(soggetto);
	dialog.setHtml(false);
	dialog.setMessageBody(contenuto);
	dialog.setToRecipients([destinatario]);

	if (allegato)
	{
		dialog.addAttachment(allegato);
	}

	dialog.open();
}

exports.inviaMail = inviaMail;
exports.inviaMailConDestinatario = inviaMailConDestinatario;
