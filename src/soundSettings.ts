export const sound = {
  soundis1: <HTMLAudioElement>document.getElementById("sound1"),
  soundis2: <HTMLAudioElement>document.getElementById("sound2"),
  soundis3: <HTMLAudioElement>document.getElementById("sound3"),
  soundis4: <HTMLAudioElement>document.getElementById("sound4"),
  soundis5: <HTMLAudioElement>document.getElementById("sound5"),
  soundis6: <HTMLAudioElement>document.getElementById("sound6"),
  soundis7: <HTMLAudioElement>document.getElementById("sound7"),
  soundis8: <HTMLAudioElement>document.getElementById("sound8"),
};

export function muteSE() {
  sound.soundis2.volume = 0;
  sound.soundis4.volume = 0;
  sound.soundis6.volume = 0;
  sound.soundis7.volume = 0;
}

export function muteBGM() {
  sound.soundis1.volume = 0;
  sound.soundis3.volume = 0;
  sound.soundis5.volume = 0;
  sound.soundis8.volume = 0;
}

function stopAll() {
  sound.soundis1.pause();
  sound.soundis2.pause();
  sound.soundis3.pause();
  sound.soundis4.pause();
  sound.soundis5.pause();
  sound.soundis6.pause();
  sound.soundis7.pause();
  sound.soundis8.pause();
}

export function play(target: HTMLAudioElement) {
  stopAll();
  // eslint-disable-next-line no-param-reassign
  target.currentTime = 0;
  target.play();
}
