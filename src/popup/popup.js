function listenForClicks() {
  document.addEventListener("click", (e) => {

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not execute: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "play-countdown"
     */
    browser.tabs.query({active: true, currentWindow: true})
      .then(() => {
        browser.tabs.executeScript(null, {
          file: '../play-countdown.js'
        });
        window.close();
      }).catch(reportError);
  });
}

listenForClicks();

