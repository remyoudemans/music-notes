<script>
  import { onMount } from 'svelte';
  import { fabric } from 'fabric';

  import InputBar from '../components/InputBar.svelte'
  import Staff from '../Staff';

  let pressedKey;

  onMount(() => {
    const canvas = new fabric.Canvas('canvas');

    const staff = new Staff(canvas, 0, 10);
    staff.drawLines();
    staff.drawClef();
    document.addEventListener('keydown', e => {
      pressedKey = e.key;
      switch (e.code) {
        case 'KeyD':
          staff.re();
          break;
        case 'KeyE':
          staff.mi();
          break;
        case 'KeyF':
          staff.fa();
          break;
        case 'KeyG':
          staff.sol();
          break;
        case 'KeyA':
          staff.la();
          break;
        case 'KeyB':
          staff.si();
          break;
        case 'KeyC':
          staff.do();
          break;
      }
    });
  });
</script>

<canvas id="canvas" height="300" width="1000" />
<InputBar command={pressedKey}/>
