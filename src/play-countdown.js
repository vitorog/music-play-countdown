// Prevents intermittent errors caused by the audio playing before the file was properly loaded
if(!window.loadedAudio) {
  window.beatAudio = new Audio(browser.runtime.getURL('sounds/beat.ogg'));
  window.loadedAudio = true;
}

async function startCountdown() {
  const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay));

  const player = document.getElementById("page_player");
  if(!player){
    //TODO: handle error
    return;
  }

  const nextBackDelay = 150; //ms

  /**
   * Deezer's 'back' button is disabled if the song is the first in the playlist,
   * this is why we have to click "next" and then "back" again to restart a song.
   */
  const restartSong = async () => {
    const nextButton = player.querySelector('[aria-label="Next"]');
    const backButton = player.querySelector('[aria-label="Back"]');

    nextButton.click();
    // TODO: this delay may not be accurate. Switching songs may vary depending on network conditions ? Improve this...
    await wait(nextBackDelay);
    backButton.click();
  };

  const pauseButton = player.querySelector('[aria-label="Pause"]');
  if(pauseButton){
    pauseButton.click();
  }

  // Deezer usually takes 0.5 a second to start playing a song. Will this vary depending on machine and network?
  const deezerDelay = 500; // ms

  const numBeats = 3;
  for(let i = 0; i < numBeats; i++) {
    window.beatAudio.play();
    if(i === (numBeats - 1)) {
      // This calculated delay makes the song start in the next beat +/-...
      await wait(1000 - nextBackDelay - deezerDelay);
    }else{
      await wait(1000);
    }
  }
  await restartSong();
}

startCountdown();