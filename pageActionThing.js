function loadPullRequestTemplate() {
  chrome.storage.sync.get("pr_template_body", function (obj) {
      var el = document.getElementById('pull_request_body');
      if (el !== null) {
        el.innerText = obj.pr_template_body;
      }
  });
};
