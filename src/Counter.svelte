<script>
  export let current = 1;
  export let max = 3;
</script>
<div class="parent">
{#if current > max}
  <div class="fill" style="width: 100%">PODSUMOWANIE</div>
{:else}
  <div class="fill" style="width: {current / max * 100}%">{current}/{max}</div>
{/if}
</div>

<style>
  .parent {
    width: 100%;
    color: white;
    font-size: 1em;
    font-weight: 700;
    box-sizing: border-box;
  }

  .fill {
    padding: 1em;
    background-color: #16c79a;
    box-sizing: border-box;
  }

</style>