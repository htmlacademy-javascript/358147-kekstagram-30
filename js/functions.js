function checksLength(string, number) {
  return string.length <= number;
}

function checksPalindrome(string) {
  const normalizeString = string.replaceAll(' ', '').toLowerCase();
  let palindromeString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    palindromeString += normalizeString.at(i);
  }

  if (normalizeString === palindromeString) {
    return true;
  }

  return false;
}
