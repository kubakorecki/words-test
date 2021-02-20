<script>
  import Button from "./Button.svelte";
  import { getWordDescription } from "../utils.js";

  export let selectedWords = [];
  export let score = 1;
  export let wordsLength = 1;
  export let retry = () => {};
</script>

<div class="summary">
  <div class="score">{Math.round(score / wordsLength * 10000) / 100} % ({score}/{wordsLength})</div>
  <ol>
    {#each selectedWords as word}
      {#if word.points > 0}
        <li class="correct-answer">{getWordDescription(word.pl)} : {word.en} ({word.answer})</li>
      {:else}
        <li class="wrong-answer">{getWordDescription(word.pl)} : {word.en} ({word.answer})</li>
      {/if}

      
    {/each}
  </ol>
  <Button click={retry}>Powtórz</Button>
</div>

<style>
  .score {
		font-size: 3em;
		font-weight: 400;
		margin: 0.5em auto 1em auto;
		font-weight: 600;
		text-align: center;
	}
  li {
		text-align: left;
	}
  .correct-answer {
		color: #25985b;
	}
	.wrong-answer {
		color: #d44242;
  }

  .summary {
		padding: 2em 2em;
		background-color: white;
	}
</style>