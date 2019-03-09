if(!window.isLoaded) {
  browser.runtime.onMessage.addListener(play);
  window.beatAudio = new Audio(browser.runtime.getURL('sounds/beat.ogg'));
  window.isLoaded = true;
}

// /**
//  * Enables "Repeat Song"
//  */
// function enableRepeat() {
//   // Repeat is not active
//   let repeatButton = document.querySelector('.player-options [class="svg-icon svg-icon-repeat"]');
//   if(repeatButton){
//     repeatButton.parentElement.click();
//     repeatButton.parentElement.click();
//     return;
//   }
//
//   // Repeat all is active
//   repeatButton = document.querySelector('.player-options [class="svg-icon svg-icon-repeat is-active"]');
//   if(repeatButton){
//     repeatButton.parentElement.click();
//   }
// }

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

async function playBeats(params) {
  const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay));

  const delay = 1000;
  for(let i = 0; i < params.numBeats; i++) {
    window.beatAudio.play();
    await wait(delay);
  }
}

async function play(params) {
  pauseSong();
  goToBeginningOfSong();
  await playBeats(params);
  playSong();
}