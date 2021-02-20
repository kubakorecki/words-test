<script>
  export let value = "";
  export let readOnly = false;
  export let ref = null;
  export let label = "";

  let readonly = "";

  if (readOnly)
    readonly = "readonly";
</script>

{#if label}
<label for="{label}">{label}</label>
{/if}
<input name="{label}" type="text" class="{readonly}" bind:this={ref} bind:value={value} {readonly}>

<style>
  input {
		font-size: 2em;
		width: 100%;
		padding: 0.5em 1em;
		box-sizing: border-box;
		border: 2px solid #333;
		background-color: white;
		margin-top: 0.5em;
		border-radius: 2em;
    font-weight: 600;
    box-sizing: border-box;
  }
  
  label {
    font-size: 1.5em;
    margin-left: 1em;
    width:100%;
    font-weight: 600;
  }

	input.readonly {
		opacity: 0.5;
	}

	input:focus {
		outline: none;
		box-shadow: 0 0 0 1px #333;
	}

	input:focus {
		outline: none;
		box-shadow: none;
	}
</style>