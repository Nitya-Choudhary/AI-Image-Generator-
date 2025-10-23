// --- No API Key change needed ---
const apiKey = "AIzaSyB9x2WBqbdFPkI8YqqxODFD0MvlnYYV8xo"; 

// Get all the new elements
const promptInput = document.getElementById('promptInput');
const generateButton = document.getElementById('generateButton');
const buttonIcon = document.getElementById('buttonIcon');
const buttonLoader = document.getElementById('buttonLoader');
const buttonText = document.getElementById('buttonText');

const imageLoader = document.getElementById('imageLoader');
const generatedImage = document.getElementById('generatedImage');
const placeholderMessage = document.getElementById('placeholderMessage');

const messageArea = document.getElementById('messageArea');
const messageText = document.getElementById('messageText');

const downloadContainer = document.getElementById('downloadContainer');
const downloadButton = document.getElementById('downloadButton');


generateButton.addEventListener('click', generateImage);

async function generateImage() {
    const prompt = promptInput.value.trim();

    if (!prompt) {
        showMessage("Please enter a description for the image.", true);
        return;
    }

    if (apiKey === "YOUR_API_KEY_HERE" || !apiKey) {
        showMessage("Please replace 'YOUR_API_KEY_HERE' in script.js with your actual Google AI Studio API Key.", true);
        return;
    }

    // --- 1. Set Loading State ---
    setLoading(true);
    showMessage("", false, true); // Hide message box
    placeholderMessage.classList.add('hidden');
    generatedImage.classList.add('hidden');
    downloadContainer.classList.add('hidden');
    imageLoader.classList.remove('hidden');

    // --- FIX 1: Changed endpoint from :generateContent to :predict ---
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

    // --- FIX 2: Updated payload structure for the :predict method ---
    const payload = {
        instances: {
            prompt: prompt
        },
        parameters: {
            "sampleCount": 1
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            showMessage(`Error: ${errorData.error?.message || response.statusText}`, true);
            placeholderMessage.classList.remove('hidden'); // Show placeholder again
            return;
        }

        const data = await response.json();
        
        // --- FIX 3: Updated response parsing for the :predict method ---
        const imageData = data.predictions?.[0]?.bytesBase64Encoded;

        if (imageData) {
            const imageUrl = `data:image/jpeg;base64,${imageData}`;
            
            // --- 2. Set Success State ---
            generatedImage.src = imageUrl;
            generatedImage.classList.remove('hidden'); // Show image
            
            // Set up download link
            downloadButton.href = imageUrl;
            // Create a dynamic filename based on the prompt
            const safePrompt = prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
            downloadButton.download = `ai_${safePrompt || 'image'}.jpg`;
            downloadContainer.classList.remove('hidden'); // Show download button
            
            showMessage("Image generated successfully!", false);

        } else {
            showMessage("No image data received. Try a different prompt.", true);
            placeholderMessage.classList.remove('hidden'); // Show placeholder again
        }

    } catch (error) {
        console.error('Network or fetch error:', error);
        showMessage(`Network error: ${error.message}`, true);
        placeholderMessage.classList.remove('hidden'); // Show placeholder again
    } finally {
        // --- 3. Reset Loading State ---
        setLoading(false);
        imageLoader.classList.add('hidden'); // Hide main loader
    }
}

/**
 * Toggles the loading state of the generate button
 * @param {boolean} isLoading - Whether to show the loading state
 */
function setLoading(isLoading) {
    generateButton.disabled = isLoading;
    if (isLoading) {
        buttonIcon.classList.add('hidden');
        buttonLoader.classList.remove('hidden');
        buttonText.innerText = 'Generating...';
    } else {
        buttonIcon.classList.remove('hidden');
        buttonLoader.classList.add('hidden');
        buttonText.innerText = 'Generate Image';
    }
}

/**
 * Displays a message in the dedicated message area
 * @param {string} text - The message to display
 * @param {boolean} isError - Whether the message is an error
 * @param {boolean} [hide=false] - Optional: force hide the message box
 */
function showMessage(text, isError, hide = false) {
    if (hide) {
        messageArea.classList.add('hidden');
        return;
    }
    
    messageArea.classList.remove('hidden');
    messageText.innerText = text;
    
    // Clear old styles
    messageArea.classList.remove('bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
    
    if (isError) {
        messageArea.classList.add('bg-red-100', 'text-red-700');
    } else {
        messageArea.classList.add('bg-green-100', 'text-green-700');
    }
}

