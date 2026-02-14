
const fs = require('fs');
const path = require('path');

async function listModels() {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);

        if (!match) {
            console.log("No GEMINI_API_KEY found in .env");
            return;
        }

        const apiKey = match[1].trim();
        console.log("Found API Key:", apiKey.substring(0, 5) + "...");

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Gemini Models:");
            const models = data.models.filter(m => m.name.includes('gemini'));
            models.forEach(m => {
                console.log(`- ${m.name}`);
            });

            // Recommend the best match
            const bestModel = models.find(m => m.name.includes('flash'))?.name || models[0].name;
            console.log("RECOMMENDED_MODEL:", bestModel.replace('models/', ''));
        } else {
            console.error("Error listing models:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error("Script error:", e);
    }
}

listModels();
