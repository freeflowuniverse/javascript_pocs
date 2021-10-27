<svelte:options tag="md-counter" />

<script lang="ts">
  let count: number = 0;
</script>

<div class="counter">
  <button class="counter__increment" on:click={() => count++}>+</button>
  <span class="counter__value">{count}</span>
  <button class="counter__decrement" on:click={() => count--}>-</button>
</div>

<style lang="scss" scoped>
  .counter {
    &__value {
      display: inline-block;
      margin: 0 10px;
    }
  }
</style>
