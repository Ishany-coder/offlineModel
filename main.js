const readline = require('readline');
const AIModel = require('./callAi.js');

const ai = new AIModel('llama3.2');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askUser() {
    rl.question('You: ', async (input) => {
        if (input.toLowerCase() === 'bye') {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        try {
            const response = await ai.callAI(input);
            console.log('AI:', response.trim());  // <-- Trim again here
        } catch (error) {
            console.error('Error calling AI:', error);
        }

        askUser(); // Loop again
    });
}

askUser();