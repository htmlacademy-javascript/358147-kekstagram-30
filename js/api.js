const LOAD_URL = 'https://30.javascript.pages.academy/kekstagram/data';
const SEND_URL = 'https://30.javascript.pages.academy/kekstagram/';

async function request (url, method, body = null) {
  const response = await fetch(url, {method, body});
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
}

async function loadPicrure () {
  return request(LOAD_URL, 'GET');
}

async function sendPicrure (data) {
  return request(SEND_URL, 'POST', data);
}


export { loadPicrure, sendPicrure };
