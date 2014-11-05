exports.getActiveTabIndex = function(tabgroup)
{
	var activeIdx = -1;

	for (i=0; i<$.tabprincipale.tabs.length; i++)
	{
		if ($.tabprincipale.tabs[i] == $.tabprincipale.activeTab)
		{
			activeIdx = i;
		}
	}

	return activeIdx;
}

exports.setActiveTabIndex = function(tabgroup, idx)
{
		tabgroup.setActiveTab(tabgroup.tabs[idx]);
}
