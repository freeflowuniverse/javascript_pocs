<script>
  let count = 0;
</script>

<div>
  <button on:click={() => count--}>-</button>
  <span> {count} </span>
  <button on:click={() => count++}>+</button>
</div>
