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


function getNumber(string) {
  const normalizeString = string.toString();
  let number = '';

  for (let i = 0; i <= normalizeString.length; i++) {

    if (!Number.isNaN(parseInt(normalizeString.at(i), 10))) {
      number += normalizeString.at(i);
    }
  }

  return parseInt(number, 10);
}


function calcWorkTime(start, end, startMeet, durationMeet) {

  function calсMinutes(string) {
    const minutArrey = string.split(':');
    const result = parseInt(minutArrey[0], 10) * 60 + parseInt(minutArrey[1], 10);
    return result;
  }

  const startMinutes = calсMinutes(start);
  const endMinutes = calсMinutes(end);
  const startMeetMinutes = calсMinutes(startMeet);

  if (startMinutes <= startMeetMinutes && endMinutes >= startMeetMinutes + durationMeet) {
    return true;
  }

  return false;
}
