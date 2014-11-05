function getActiveTabIndex(tabgroup)
{
	var activeIdx = -1;

	for (i=0; i<tabgroup.tabs.length; i++)
	{
		if (tabgroup.tabs[i] == tabgroup.activeTab)
		{
			activeIdx = i;
		}
	}

	return activeIdx;
}

function setActiveTabIndex(tabgroup, idx)
{
		tabgroup.setActiveTab(tabgroup.tabs[idx]);
}

exports.getActiveTabIndex = getActiveTabIndex;
exports.setActiveTabIndex = setActiveTabIndex;
