// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// On every start up ...
chrome.runtime.onStartup.addListener(function() {

  // Load the default template whenever chrome starts after that and we're not using a custom template.

  chrome.storage.sync.get('pr_template_body', function (obj) {
    if (obj['pr_template_body'] == null || obj['changed_template'] == null) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var obj = {};
          obj["pr_template_body"] = xhr.responseText || ""; 
          chrome.storage.sync.set(obj);
        }
      };
      xhr.open("GET",
        "https://raw.github.com/bellhops/pull-request-template-chrome-extension/master/default_template.md",
        true);
      xhr.send();
    }
  });
});

// When the first window is created ...

chrome.windows.onCreated.addListener(function() {
    chrome.windows.getAll(function(windows) {
        if (windows.length == 1) {

          // Load the default template whenever chrome starts after that and we're not using a custom template.

          chrome.storage.sync.get('pr_template_body', function (obj) {
            if (obj['pr_template_body'] == null || obj['changed_template'] == null) {
              var xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                  var obj = {};
                  obj["pr_template_body"] = xhr.responseText || ""; 
                  chrome.storage.sync.set(obj);
                }
              };
              xhr.open("GET",
                "https://raw.github.com/bellhops/pull-request-template-chrome-extension/master/default_template.md",
                true);
              xhr.send();
            }
          });
        }
    });
});


// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostSuffix: 'github.com',
              urlContains: '/compare/'
            },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });

  // Load the default template the first time we install.

  chrome.storage.sync.get('pr_template_body', function (obj) {
    if (obj['pr_template_body'] == null || obj['changed_template'] == null) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var obj = {};
          obj["pr_template_body"] = xhr.responseText || ""; 
          chrome.storage.sync.set(obj);
        }
      };
      xhr.open("GET",
        "https://raw.github.com/bellhops/pull-request-template-chrome-extension/master/default_template.md",
        true);
      xhr.send();
    }
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: "loadPullRequestTemplate()"
  });
});
