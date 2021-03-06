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

function onHomeIcon(e) {
	$.donazione.close();
}

function doAndroidBack() {
	if ($.paginaweb.canGoBack()) {
		$.paginaweb.goBack();
	} else {
		$.donazione.close();
	}
}

var currentLocale = Titanium.Locale.currentLanguage;
if(currentLocale!=="it" && currentLocale!=="en")
{
	currentLocale = "en";
}
$.paginaweb.url = "/donazioni/donazione-" + currentLocale + ".html";
$.donazione.open();
