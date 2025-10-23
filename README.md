AI Image Generator

A simple, modern web application that uses Google's Gemini AI to generate images from text descriptions. This single-file web app features a responsive, interactive UI built with Tailwind CSS.

🌟 Features

Modern Interface: A clean, responsive, and visually appealing UI built with Tailwind CSS, featuring a soft gradient background and interactive elements.

Text-to-Image Generation: Connects directly to the gemini-2.5-flash-image-preview API to turn text prompts into images.

Prompt Suggestions: Includes clickable "bubbles" with example prompts to help inspire users.

Dynamic Loading States: The "Generate" button and the image container show loading spinners to provide clear visual feedback during API calls.

Dedicated Alerts: A dedicated message area shows clear success or error messages (e.g., "Please enter a description," "API error").

Download Functionality: Once an image is generated, a "Download Image" button appears, allowing the user to save the image to their device with a filename based on their prompt.

Single File Application: All HTML, CSS (via Tailwind CDN), and JavaScript are contained within a single AI_Image_Generator_App.html file for ultimate portability.

🛠️ Tech Stack

HTML5

Tailwind CSS (loaded via CDN)

JavaScript (ES6+) (using async/await for fetch)

Google Gemini API (specifically the gemini-2.5-flash-image-preview model)

🚀 How to Use

This project is a single, self-contained HTML file.

Get your API Key:

Go to Google AI Studio.

Create a new API key.

Add the API Key to the File:

Open AI_Image_Generator_App.html in any text editor.

Scroll down to the bottom to find the main <script> tag (it starts around line 170).

Find this line:

const apiKey = "YOUR_API_KEY_HERE"; 


Replace "YOUR_API_KEY_HERE" with your actual API key (keep the quotation marks).

Run the Application:

Save the file.

Double-click the AI_Image_Generator_App.html file to open it in your web browser.

You can now enter a prompt and start generating images!
