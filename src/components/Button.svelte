<script>
  export let click = () => {};
</script>

<button on:click={click}>
  <slot></slot>
</button>

<style>
button {
  font-size: 2em;
  width: 100%;
  padding: 0.5em 1em;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  margin-top: 1em;
  border-radius: 2em;
  font-weight: 600
}

button {
  background-color: #11698e;
  color: white;	
}

button:hover, button:active {
  background-color: #19456b;
  cursor: pointer;
}

button:focus {
		outline: none;
		box-shadow: none;
	}

</style>