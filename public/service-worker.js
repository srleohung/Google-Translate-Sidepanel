function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'google-translate-sidepanel',
    title: 'Google Translate Sidepanel',
    contexts: ['selection']
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
  // Make sure the side panel is open.
  chrome.sidePanel.open({ tabId: tab.id });

  // Store the last word in chrome.storage.session.
  chrome.storage.session.set({ lastWord: data.selectionText });
});
