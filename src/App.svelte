<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Asap" rel="stylesheet">
</svelte:head>

<script>
	import Counter from "./Counter.svelte";
	import { onMount } from "svelte";
	import test from "./test3.js";
	import { shuffleArray } from "./utils.js";

	let answerInput;
	const wordsLength = 10;
	shuffleArray(test);

	let words = test.slice(0, wordsLength);
	let index = 0;
	let answer = "";
	let score = 0;
	let showCorrectAnswer = false;
	let readonly = "";

	const retry = () => {
		shuffleArray(test);
		words = test.slice(0, wordsLength);
		index = 0;
		answer = "";
		score = 0;

		setTimeout(() => {
			answerInput.focus();
		}, 1);
		
	}
	

	const submitAnswer = () => {
		if (showCorrectAnswer == true) {
			showCorrectAnswer = false;
			answer = "";
			index++;
			answerInput.focus();
			readonly = "";
			return;
		}

		words[index].answer = answer;
		const correctAnswer = words[index].en;
		let correct = false;

		if (Array.isArray(correctAnswer)) {
			if (correctAnswer.includes(answer)) {
				correct = true;
			}
		} else if (answer.toLowerCase() === correctAnswer.toLowerCase()){
			correct = true;
		}

		if (correct) {
			score++;
			words[index].points = 1;	
		} else {
			showCorrectAnswer = true;
			readonly = "readonly"
			return;
		}

		answer = "";
		index++;
		answerInput.focus();
	}

	const getWordDescription = (word) => {
		if (Array.isArray(word)) {
			return word[0];
		} else {
			return word;
		}
	}

	onMount(() => {
		answerInput.focus();
	})
</script>
<Counter current={index + 1} max={wordsLength} />
<main>
	{#if index < wordsLength}
<div class="word">
	{getWordDescription(words[index].pl)}
	{#if showCorrectAnswer}
		- <span class="hint">{words[index].en}</span>				
	{/if}
</div>
<form on:submit|preventDefault={submitAnswer} spellcheck="false">
			
			<input type="text" class="{readonly}" bind:value={answer} bind:this={answerInput} {readonly}>
			<input type="submit" value="Dalej">
		</form>
	{:else}
	<div class="summary">
		<div class="score">{Math.round(score / wordsLength * 10000) / 100} % ({score}/{wordsLength})</div>
		<ol>
			{#each words as word}
				{#if word.points > 0}
					<li class="correct-answer">{getWordDescription(word.pl)} : {word.en} ({word.answer})</li>
				{:else}
					<li class="wrong-answer">{getWordDescription(word.pl)} : {word.en} ({word.answer})</li>
				{/if}

				
			{/each}
		</ol>
		<button on:click={retry}>Powtórz</button>
	</div>
	{/if}
</main>

<style>
	main {
		padding: 1em;
		margin: 1em 0;
	}

	.word, .score {
		font-size: 3em;
		font-weight: 400;
		margin: 0.5em auto 1em auto;
		font-weight: 600;
		text-align: center;
	}

	.hint {
		color: #d44242;
	}

	li {
		text-align: left;
	}
	input, button {
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

	input.readonly {
		opacity: 0.5;
	}

	input[type=text] {
		background-color: white;
		border: 2px solid #333;
		box-sizing: border-box;
	}

	input[type=text]:focus {
		outline: none;
		box-shadow: 0 0 0 1px #333;
	}

	input[type=submit], button {
		background-color: #11698e;
		color: white;	
	}

	input[type=submit]:hover, input[type=submit]:active, button:hover, button:active {
		background-color: #19456b;
		cursor: pointer;
	}

	input:focus {
		outline: none;
		box-shadow: none;
	}

	form, .summary {
		max-width: 600px;
		margin: 0 auto;
	}

	.summary {
		padding: 2em 2em;
		background-color: white;
	}

	.correct-answer {
		color: #25985b;
	}
	.wrong-answer {
		color: #d44242;
	}
</style>