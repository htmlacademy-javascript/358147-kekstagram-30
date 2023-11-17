async function request (url, method, body = null) {
  const response = await fetch(url, {method, body});
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
}

async function loadPicrure () {
  return request('https://30.javascript.pages.academy/kekstagram/data', 'GET');
}

async function sendPicrure (data) {
  return request('https://30.javascript.pages.academy/kekstagram/', 'POST', data);
}


export { loadPicrure, sendPicrure };
