export async function playBeats(params) {
  const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay));

  const delay = 1000;
  for (let i = 0; i < params.numBeats; i++) {
    window.beatAudio.play();
    await wait(delay);
  }
}