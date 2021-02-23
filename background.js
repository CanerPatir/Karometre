chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ active: true }, function () {
    console.log("disabled");
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.sahibinden.com' },
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});