<script>
	import { onMount } from 'svelte';
  import Staff from './Staff'
	
	let name = 'world';
	
	let staff;
	const onClick = () => staff.re();

	onMount(() => {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		staff = new Staff(ctx, 0, 10).draw().re().mi();
		document.addEventListener('keydown', e => {
			switch(e.code) {
				case 'KeyD':
					staff.re();
					break;
				case 'KeyE':
					staff.mi();
					break;
			}
		})
		staff.draw();
		new Staff(ctx, 0, 90).draw().re().mi();
	})
</script>

<canvas id='canvas' height='300' width='1000'/>
<button type='button' on:click={onClick}>Re</button>
<button type='button' on:click={() => staff.mi()}>Mi</button>
