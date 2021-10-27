<script lang="ts">
  export let title: string;
  export let subTitle: string;
</script>

<div>
  {#if title}
    <p>{title}</p>
  {/if}
  {#if subTitle}
    <span>{subTitle}</span>
  {/if}
  <slot />
</div>

<style scoped lang="scss">
  span {
    opacity: 0.8;
  }
</style>
