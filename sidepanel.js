const audio = new Audio;

chrome.storage.session.get('lastWord', ({ lastWord }) => {
  updateDefinition(lastWord);
});

chrome.storage.session.onChanged.addListener((changes) => {
  const lastWordChange = changes['lastWord'];

  if (!lastWordChange) {
    return;
  }

  updateDefinition(lastWordChange.newValue);
});

async function updateDefinition(word) {
  // If the side panel was opened manually, rather than using the context menu,
  // we might not have a word to show the definition for.
  if (!word) return;

  sourceLanguage = "en"
  targetLanguage = "zh-TW"
  text = word

  // Hide instructions.
  document.body.querySelector('#select-a-word').style.display = 'none';

  // Show word and definition.
  document.body.querySelector('#definition-word').innerText = word;
  try {
    const { result, additional, detectedLanguage } = await translate(text, sourceLanguage, targetLanguage)
    document.body.querySelector('#definition-text').innerText = result
    document.body.querySelector('#definition-additional').innerHTML = additional
    document.body.querySelector('#definition-detectedLanguage').innerText = detectedLanguage
    voice(text, sourceLanguage)
  } catch (e) {
    document.body.querySelector('#definition-text').innerText = e
    document.body.querySelector('#definition-additional').innerHTML = ''
    document.body.querySelector('#definition-detectedLanguage').innerText = ''
  }
}

function escapeHTMLEntities(s) {
  const tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };

  return s.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag);
}

async function translate(text, sourceLanguage, targetLanguage) {
  const url =
    'https://translate.googleapis.com/translate_a/single' +
    '?client=gtx' +
    '&dt=t' +
    '&dt=bd' +
    '&sl=' + encodeURIComponent(sourceLanguage) +
    '&tl=' + encodeURIComponent(targetLanguage) +
    '&q=' + encodeURIComponent(text);

  return fetch(url)
    .then(response => response.json())
    .then(response => {
      let result = response[0].map(value => value[0]).join('');

      let additional = '';
      if (response[1]) {
        response[1].forEach(value => {
          additional += '<h3>' + escapeHTMLEntities(value[0]) + '</h3>';
          additional += '<ol>' + value[1].map(value => '<li>' + escapeHTMLEntities(value) + '</li>').join('') + '</ol>';
        });
      }

      const detectedLanguage = response[2];

      return { result, additional, detectedLanguage };
    });
}

function voice(text, language) {
  const url =
    'https://translate.google.com/translate_tts' +
    '?client=gtx' +
    '&ie=UTF-8' +
    '&tl=' + encodeURIComponent(language) +
    '&q=' + encodeURIComponent(text);

  audio.src = url;

  return audio.play();
}