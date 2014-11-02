var args = arguments[0] || {};

function aggiungiTerapia() {
	alert("Ciao");
}

function setupActionBar() {
	$.terapie.activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuitem;

		menuitem = menu.add({
			title: "Aggiungi",
			showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
		});
		menuitem.addEventListener("click", aggiungiTerapia);
	}

	$.terapie.removeEventListener("open", setupActionBar);
}

$.terapie.addEventListener("open", setupActionBar);
$.terapie.open();
