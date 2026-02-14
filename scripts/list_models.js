
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.log("No API Key found in .env.local");
        return;
    }
    console.log("Using API Key:", apiKey.substring(0, 5) + "...");

    // Using fetch directly to list models as SDK generic methods might vary
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.filter(m => m.name.includes('gemini')).forEach(m => {
                console.log(`- ${m.name} (${m.supportedGenerationMethods})`);
            });
        } else {
            console.error("Error listing models:", data);
        }
    } catch (e) {
        console.error("Fetch error:", e);
    }
}

listModels();
