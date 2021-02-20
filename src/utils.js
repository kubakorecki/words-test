export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getWordDescription = (word) => {
  if (Array.isArray(word)) {
    return word[0];
  } else {
    return word;
  }
}