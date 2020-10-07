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
    })
  });

</script>

<canvas id="canvas" height="300" width="1000" />
<InputBar command={pressedKey}/>
