<script>
  import { onMount } from 'svelte';
  import { fabric } from 'fabric';

  import InputBar from '../components/InputBar.svelte'
  import Staff, { noteNames } from '../Staff';

  let pressedKey;
  let octave = 5;
  let playingBack = false;

  const extendedCommandKeys = ['[', ']'];

  onMount(() => {
    const canvas = new fabric.Canvas('canvas');

    const staff = new Staff(canvas, 0, 10, octave);
    staff.drawLines();
    staff.drawClef();


    document.addEventListener('keydown', e => {
      if (e.key === 'Backspace') {
        staff.deleteNote();
        return;
      }

      if (e.key === ' ') {
        staff.soundPlayer.playback();
        playingBack = !playingBack;
        return;
      }

      if (extendedCommandKeys.includes(pressedKey)) {
        pressedKey += e.key;
      } else {
        pressedKey = e.key;
      }

      if (e.key === 'n' && octave < 8) {
        octave = Math.min(8, octave + 1);
        staff.setOctave(octave);
      } else if (e.key === 'p' && octave > 2) {
        octave = Math.max(2, octave - 1);
        staff.setOctave(octave);
      } else if (e.key === 'h') {
        staff.moveCursorBack();
      } else if (e.key === 'l') {
        staff.moveCursorForward();
      }

      const uppercaseKey = e.key.toUpperCase();

      if (noteNames.includes(uppercaseKey)) {
        const accidental = (() => {
          if (pressedKey.startsWith('[')) {
            return 'b';
          }

          if (pressedKey.startsWith(']')) {
            return '#';
          }

          return undefined;
        })()

        const isChordNote = uppercaseKey === e.key;
        staff.drawNote(uppercaseKey, accidental, isChordNote);
      }
    });
  });

</script>

<canvas id="canvas" height="300" width="1000" />
<InputBar command={pressedKey}/>
<p class='octave-indicator'>Octave: {octave}</p>
<p>{playingBack ? '▶' : '⏸'}</p>

<style>
 .octave-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 5rem;
 }
</style>
