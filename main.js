const AIModel = require('./AIModel');

const ai = new AIModel('llama3.2');

ai.callAI('What is the capital of France?')
    .then(response => {
        console.log('AI Response:', response);
    })
    .catch(err => {
        console.error('Error:', err);
    });