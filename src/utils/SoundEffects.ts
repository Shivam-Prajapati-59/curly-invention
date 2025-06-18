const keyboardSounds = [
  new Audio("/audio/bb.mp3"),
  new Audio("/sounds/key2.mp3"),
  new Audio("/sounds/key3.mp3"),
  new Audio("/sounds/key4.mp3"),
];

const beepSounds = [
  new Audio("/audio/soundBeep1.mp3"),
  new Audio("/sounds/beep2.mp3"),
  new Audio("/sounds/error-beep.mp3"),
  new Audio("/sounds/success-beep.mp3"),
];

let lastPlayedTime = 0;
const minDelayBetweenSounds = 50; // milliseconds

export const playRandomKeySound = (volume = 0.3) => {
  const now = Date.now();

  // Don't play sounds too rapidly
  if (now - lastPlayedTime < minDelayBetweenSounds) return;

  const randomSound =
    keyboardSounds[Math.floor(Math.random() * keyboardSounds.length)];

  // Clone the audio to allow overlapping sounds
  const soundClone = randomSound.cloneNode() as HTMLAudioElement;
  soundClone.volume = volume;
  soundClone.play().catch((error) => {
    // Silently handle autoplay restrictions
    console.debug("Audio play error:", error);
  });

  lastPlayedTime = now;
};

export const playBeepSound = (
  type: "random" | "error" | "success" | "command" = "random",
  volume = 0.4
) => {
  if (!isTypingSoundEnabled()) return;

  let sound: HTMLAudioElement;

  switch (type) {
    case "error":
      sound = beepSounds[2]; // error-beep.mp3
      break;
    case "success":
      sound = beepSounds[3]; // success-beep.mp3
      break;
    case "command":
      sound = beepSounds[1]; // beep2.mp3
      break;
    default:
      sound = beepSounds[Math.floor(Math.random() * 2)]; // beep1 or beep2
  }

  const soundClone = sound.cloneNode() as HTMLAudioElement;
  soundClone.volume = volume;
  soundClone.play().catch((error) => {
    console.debug("Beep sound play error:", error);
  });
};

export const toggleTypingSounds = () => {
  const currentSetting = localStorage.getItem("typingSounds") || "enabled";
  const newSetting = currentSetting === "enabled" ? "disabled" : "enabled";
  localStorage.setItem("typingSounds", newSetting);
  return newSetting;
};

export const isTypingSoundEnabled = () => {
  return localStorage.getItem("typingSounds") !== "disabled";
};
