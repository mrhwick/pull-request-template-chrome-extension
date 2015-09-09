var key = "pr_template_body";

function change_url(e) {
  var obj = {};
  obj[key] = e.target.value || ""; 
  chrome.storage.sync.set(obj);
}

function restore_options() {
  chrome.storage.sync.get(key, function (obj) {
    if (obj[key] == null) {
      load_default_from_url();
    }
    else {
      document.getElementById("template_body").value = obj[key];
    }
  });
}

function load_default_from_url() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var el = document.getElementById('template_body');
      if (el !== null) {
        el.value = xhr.responseText;
      }
    }
  };
  xhr.open("GET",
    "https://raw.github.com/bellhops/pull-request-template-chrome-extension/master/default_template.md",
    true);
  xhr.send();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#template_body').addEventListener('change', change_url);
document.querySelector('#reset').addEventListener('click', function() {
  load_default_from_url();
});
document.querySelector('#save').addEventListener('click', function () {
  window.close();
});
