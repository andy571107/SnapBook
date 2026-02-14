
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');

// Load env from .env
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("No GEMINI_API_KEY found.");
    process.exit(1);
}

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
        } else {
            console.log("Available Models:");
            if (data.models) {
                data.models.forEach(m => {
                    console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
                });
            } else {
                console.log("No models field in response:", data);
            }
        }
    } catch (e) {
        console.error("Fetch error:", e);
    }
}

listModels();
