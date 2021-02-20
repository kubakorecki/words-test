<script>
	import Counter from "../components/Counter.svelte";
	import Summary from "../components/Summary.svelte";
	import { onMount } from "svelte";
	import { shuffleArray, getWordDescription } from "../utils.js";
	import MainContainer from "./MainContainer.svelte";
	import TextInput from "./TextInput.svelte";

	export let words;
	export let wordsLength = 10;

	if (wordsLength > words.length) {
		wordsLength = words.length;
	}

	let answerInput;
	shuffleArray(words);

	let selectedWords = words.slice(0, wordsLength);
	let index = 0;
	let answer = "";
	let score = 0;
	let showCorrectAnswer = false;
	let readOnly = false;

	const retry = () => {
		shuffleArray(words);
		selectedWords = words.slice(0, wordsLength);
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
			readOnly = false;
			return;
		}

		selectedWords[index].answer = answer;
		const correctAnswer = selectedWords[index].en;
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
			selectedWords[index].points = 1;	
		} else {
			showCorrectAnswer = true;
			readOnly = true;
			return;
		}

		answer = "";
		index++;
		answerInput.focus();
	}

	onMount(() => {
		answerInput.focus();
	})
</script>

<Counter current={index + 1} max={wordsLength} />

	<MainContainer>
		{#if index < wordsLength}
			<div class="word">
				{getWordDescription(selectedWords[index].pl)}
				{#if showCorrectAnswer}
					- <span class="hint">{selectedWords[index].en}</span>				
				{/if}
			</div>

			<form on:submit|preventDefault={submitAnswer} spellcheck="false">
				<TextInput bind:value={answer} bind:ref={answerInput} readOnly={readOnly} />
				<input type="submit" value="Dalej">
			</form>
		{:else}
		<Summary selectedWords={selectedWords} wordsLength={wordsLength} score={score} retry={retry}/>
		{/if}
	</MainContainer>

<style>
	.word {
		font-size: 3em;
		font-weight: 400;
		margin: 1em auto 1em auto;
		font-weight: 600;
		text-align: center;
	}

	.hint {
		color: #d44242;
	}

	input {
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

	input[type=submit] {
		background-color: #11698e;
		color: white;	
	}

	input[type=submit]:hover, input[type=submit]:active {
		background-color: #19456b;
		cursor: pointer;
	}

	input:focus {
		outline: none;
		box-shadow: none;
	}
</style>