<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Asap" rel="stylesheet">
</svelte:head>

<script>
	import Button from "./components/Button.svelte";
	import MainContainer from "./components/MainContainer.svelte";
	import Quiz from "./components/Quiz.svelte";
	import TextInput from "./components/TextInput.svelte";
	import chapter1 from "./words/chapter1.js";
	import chapter2 from "./words/chapter2.js";
	import chapter3 from "./words/chapter3.js";
	
	let selectedQuiz = null;
	let wordsLength = 10;
	let quizes = {
		chapter1,
		chapter2,
		chapter3
	}

	const openQuiz = (name) => {
		selectedQuiz = quizes[name];
	}
</script>

{#if selectedQuiz}
	<Quiz words={selectedQuiz} wordsLength={wordsLength}></Quiz>

	{:else}
	<MainContainer>
	<TextInput bind:value={wordsLength} label="Ilość słówek"/>
		<Button click={() => { openQuiz("chapter1"); }}>Chapter 1</Button>
		<Button click={() => { openQuiz("chapter2"); }}>Chapter 2</Button>
		<Button click={() => { openQuiz("chapter3"); }}>Chapter 3</Button>
	</MainContainer>
{/if}
