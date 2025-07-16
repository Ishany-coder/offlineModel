const { spawn } = require('child_process');

class AIModel {
    constructor(modelName) {
        this.modelName = modelName;
    }

        callAI(prompt) {
    return new Promise((resolve, reject) => {
        const process = spawn('ollama', ['run', this.modelName]);

        let output = '';
        let errorOutput = '';

        process.stdout.on('data', (data) => {
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        process.on('error', (err) => {
            reject(err);
        });

        process.on('close', (code) => {
            const fullOutput = (output + '\n' + errorOutput)
                // Remove spinner characters
                .replace(/[\u2800-\u28FF]/g, '')
                // Collapse multiple blank lines into one
                .replace(/\n\s*\n/g, '\n')
                // Trim leading/trailing whitespace
                .trim();

            resolve(fullOutput);
        });

        process.stdin.write(prompt + '\n');
        process.stdin.end();
    });
}
}

module.exports = AIModel;