const { spawn } = require('child_process');

class AIModel {
    constructor(modelName) {
        this.modelName = modelName;
    }

    callAI(prompt) {
        return new Promise((resolve, reject) => {
            const process = spawn('ollama', ['run', this.modelName]);

            let output = '';
            process.stdout.on('data', (data) => {
                output += data.toString();
            });

            process.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            process.on('error', (err) => {
                reject(err);
            });

            process.on('close', (code) => {
                resolve(output.trim());
            });

            // Send the prompt to the model
            process.stdin.write(prompt + '\n');
            process.stdin.end();
        });
    }
}

module.exports = AIModel;