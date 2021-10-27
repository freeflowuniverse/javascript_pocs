<script lang="ts">
  export let start: number = 0;
  $: count = start;
</script>

<div>
  <button on:click={() => count--}>-</button>
  <span> {count} </span>
  <button on:click={() => count++}>+</button>
</div>
