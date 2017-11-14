const fs = require('fs');
const source = require('./source.json');
const translate = require('google-translate-api');

const translationsPromises = () => {
  console.log('loading strings...');

  return Object
          .keys(source)
          .map(key => translate(source[key], {from: 'en', to: 'fr'}))
}

const createOutput = (data) => {
  let output = {};

  console.log('generating output...')

  Object.keys(source).forEach((key, index) => {
    output[key] = {
      "message": data[index]
    }
  })

  return output;
}

const writeDataToFile = (output) => {
  console.log('writing to file');

  fs.writeFile('results.txt', JSON.stringify(output), (err) => {
    if (err) { throw err }
    console.log('done!')
  });
}

const init = () => {
  console.log('translating...');

  Promise
    .all(translationsPromises())
    .then(response => {
      const translatedStrings = response.map(t => t.text);

      console.log('fetched translations...')

      writeDataToFile(createOutput(translatedStrings));
    });
}

init();




