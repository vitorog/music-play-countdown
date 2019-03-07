async function startCountdown() {
  const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay));

  const player = document.getElementById("page_player");
  if(!player){
    //TODO: handle error
    return;
  }

  const nextBackDelay = 250; //ms

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

  const beatAudio = new Audio(browser.runtime.getURL('sounds/beat.ogg'));
  const numSeconds = 3;

  for(let i = 0; i < numSeconds; i++) {
    beatAudio.play();
    if(i === numSeconds -1){
      await wait(1000 - nextBackDelay);
    }else{
      await wait(1000);
    }
  }
  await restartSong();
}

startCountdown();