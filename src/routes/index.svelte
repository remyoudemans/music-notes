<script>
  import { onMount } from 'svelte';
  import { fabric } from 'fabric';

  import InputBar from '../components/InputBar.svelte'
  import Staff, { noteNames } from '../Staff';

  let pressedKey;

  const extendedCommandKeys = ['[', ']'];

  onMount(() => {
    const canvas = new fabric.Canvas('canvas');

    const staff = new Staff(canvas, 0, 10);
    staff.drawLines();
    staff.drawClef();

    document.addEventListener('keydown', e => {
      if (extendedCommandKeys.includes(pressedKey)) {
        pressedKey += e.key;
      } else {
        pressedKey = e.key;
      }

      if (e.key === 'n') {
        staff.upOctave();
      } else if (e.key === 'p') {
        staff.downOctave();
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
        staff.drawNote(uppercaseKey, accidental);
      }
    });

    document.addEventListener('keyup', e => {
      if (e.key === 'n') {
        staff.downOctave();
      } else if (e.key === 'p') {
        staff.upOctave();
      }
    })
  });

</script>

<canvas id="canvas" height="300" width="1000" />
<InputBar command={pressedKey}/>
