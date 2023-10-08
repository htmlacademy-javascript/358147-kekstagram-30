// checksLength

function checksLength (string, number) {
  return string.length <= number;
}

console.log(checksLength ('проверяемая строка', 20));
console.log(checksLength ('проверяемая строка', 18));
console.log(checksLength ('проверяемая строка', 10));
