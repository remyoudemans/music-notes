import * as Tone from 'tone';


export const startPlayback = (notes) => {
  const synth = new Tone.PolySynth(Tone.Synth, {oscillator: { type: 'sine'}}).toDestination()
  let time = 0;
  const notesWithTimes = notes.map(({ note, isChordNote }) => {
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
    synth.triggerAttackRelease(value.note, "8n", time);
  }, notesWithTimes);

  Tone.Transport.scheduleOnce(() => part.start())
  Tone.Transport.start();
}
