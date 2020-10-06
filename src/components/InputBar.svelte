<script>
  export let command;
</script>

<style>
  p {
    position: absolute;
    bottom: 0;
    left: 1rem;
    margin-block-start: 0;
    margin-block-end: 0;
  }
</style>

<p>{command || ''}</p>

