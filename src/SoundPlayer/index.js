import * as Tone from 'tone';

export default class SoundPlayer {
  constructor(notes) {
    this.synth = new Tone.PolySynth(Tone.Synth, {oscillator: { type: 'sine'}}).toDestination();
    this.playingBack = false;
    this.notes = notes;
  }

  playback() {
    if (!this.notes.length) {
      return;
    }

    if (this.playingBack) {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      this.playingBack = false;
      return;
    }

    this.playingBack = true;

    let time = 0;
    const notesWithTimes = this.notes.map(({ note, isChordNote }) => {
      const info = {
        time: `0:${time - (isChordNote ? 1 : 0)}`,
        note
      };

      if (!isChordNote) {
        time += 1;
      }

      return info;
    })
    

    const part = new Tone.Part((time, value) => {
      this.synth.triggerAttackRelease(value.note, "8n", time);
    }, notesWithTimes);

    Tone.Transport.scheduleOnce(() => part.start())
    Tone.Transport.start();
  }

  playNotes(notes) {
    this.synth.triggerAttackRelease(notes, '8n');
  }
}
