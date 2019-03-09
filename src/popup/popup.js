document.getElementById("play-button").addEventListener("click", () => {

  /**
   * Just log the error to the console.
   */
  function reportError(error) {
    console.error(`Could not execute: ${error}`);
  }

  browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      const numBeats = document.getElementById("num-beats").value;
      browser.tabs.sendMessage(tabs[0].id, {numBeats: numBeats});
      window.close();
    }).catch(reportError);
});

