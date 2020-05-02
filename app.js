const main = document.querySelector('main');
const buttonInsertText = document.querySelector('.btn-toggle');
const divTextBox = document.querySelector('.text-box');
const buttonCloseTextBox = document.querySelector('.close');
const selectLanguagesElement = document.querySelector('select');
const buttonReadText = document.querySelector('#read');
const textArea = document.querySelector('textarea');

const humanExpressions = [
  { img: './img/drink.jpg', text: 'Estou com sede' },
  { img: './img/angry.jpg', text: 'Estou bravo' },
  { img: './img/food.jpg', text: 'Estou com fome' },
  { img: './img/grandma.jpg', text: 'Quero ver a vovó' },
  { img: './img/happy.jpg', text: 'Estou feliz' },
  { img: './img/home.jpg', text: 'Quero ir pra casa' },
  { img: './img/hurt.jpg', text: 'Estou machucado' },
  { img: './img/outside.jpg', text: 'Quero ir lá fora' },
  { img: './img/sad.jpg', text: 'Estou triste' },
  { img: './img/scared.jpg', text: 'Estou com medo' },
  { img: './img/school.jpg', text: 'Quero ir para escola' },
  { img: './img/tired.jpg', text: 'Estou cansado' },
];

const utterance = new SpeechSynthesisUtterance;

const setTextMessage = text => {
  utterance.text = text
}

const speakText = () => {
  speechSynthesis.speak(utterance);
}

const setVoice = event => {
  const selectedVoice = voicesArray.find(voice => voice.name === event.target.value);
  utterance.voice = selectedVoice;
}

const addExpressionBoxesIntoDom = () => {
  main.innerHTML = humanExpressions.map(({ img, text }) => `
    <div class="expression-box" data-js="${text}">
      <img src="${img}" alt="${text}" data-js="${text}">
      <p class="info" data-js="${text}">${text}</p>
    </div>
  `).join('');
}

addExpressionBoxesIntoDom();

const setStyleOfClckedDiv = dataValue => {
  const div = document.querySelector(`[data-js="${dataValue}"]`);

  div.classList.add('active');
  setTimeout(() => {
    div.classList.remove('active');
  }, 1000);
}

main.addEventListener('click', event => {
  const clickedElement = event.target;
  const clickedElementText = clickedElement.dataset.js;
  const elementsArray = ['img', 'p'];
  const clickedElementMustBeSpoken = elementsArray.some(elementName => 
    clickedElement.tagName.toLowerCase() === elementName.toLowerCase()
  );

  if(clickedElementMustBeSpoken){
    setTextMessage(clickedElementText);
    speakText();
    setStyleOfClckedDiv(clickedElementText);
  }
});

setUtteranceVoice = voice => {
  utterance.voice = voice;
  const voiceOptionElement = selectLanguagesElement
    .querySelector(`[value="${voice.name}"]`);
  voiceOptionElement.selected = true;
}

const setPTBRVoices = voices => {
  const googleVoice = voicesArray.find(voice => voice.name === 'Google português do Brasil');
  const microsoftVoice = voicesArray.find(voice => voice.name === 'Microsoft Maria Desktop - Portuguese(Brazil)');
  
  if(googleVoice){
    setUtteranceVoice(googleVoice);
  }else if(microsoftVoice){
    setUtteranceVoice(microsoftVoice);
  }
}

let voicesArray = [];

const insertOptionElementsIntoDOM = voices => {
  selectLanguagesElement.innerHTML = voicesArray.reduce((accumulator, { name, lang }) => {
    accumulator += `<option value="${name}">${name} | ${lang}</option>`;
    return accumulator;
  }, '');
}  

speechSynthesis.addEventListener('voiceschanged', () => {
  voicesArray = speechSynthesis.getVoices();

  insertOptionElementsIntoDOM(voicesArray);
  setPTBRVoices(voicesArray);
  
})

buttonInsertText.addEventListener('click', () => {
  divTextBox.classList.add('show'); 
});

buttonCloseTextBox.addEventListener('click', () => {
  divTextBox.classList.remove('show');
});

selectLanguagesElement.addEventListener('change', setVoice);

buttonReadText.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
})



