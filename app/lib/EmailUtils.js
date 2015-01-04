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