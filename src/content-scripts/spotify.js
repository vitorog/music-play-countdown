import { playBeats } from './metronome';

if(!window.isLoaded) {
  browser.runtime.onMessage.addListener(play);
  window.beatAudio = new Audio(browser.runtime.getURL('sounds/beat.ogg'));
  window.isLoaded = true;
}

function goToBeginningOfSong() {
  const backButton = document.querySelector('.player-controls [class="control-button spoticon-skip-back-16"]');
  if(backButton) {
    backButton.click();
  }
}

function playSong() {
  const playButton = document.querySelector('.player-controls [class="control-button spoticon-play-16 control-button--circled"');
  if(playButton){
    playButton.click();
  }
}

function pauseSong() {
  const pauseButton = document.querySelector('.player-controls [class="control-button spoticon-pause-16 control-button--circled"');
  if(pauseButton){
    pauseButton.click();
  }
}

async function play(params) {
  pauseSong();
  goToBeginningOfSong();
  await playBeats(params);
  playSong();
}